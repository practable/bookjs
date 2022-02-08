#!/bin/bash

# serve.sh is a script to help with loading
# and resetting the manifest at
# book.practable.io

export BOOK_PORT=4000
export BOOK_LOGINTIME=3600
export BOOK_FQDN=localhost
export BOOK_SECRET=testing

book serve &
book_pid=$! 

# pad base64URL encoded to base64
# from https://gist.github.com/angelo-v/e0208a18d455e2e6ea3c40ad637aac53
paddit() {
  input=$1
  l=`echo -n $input | wc -c`
  while [ `expr $l % 4` -ne 0 ]
  do
    input="${input}="
    l=`echo -n $input | wc -c`
  done
  echo $input
}

if [ "$BOOK_SECRET" = "" ];
then
	echo 'you must set BOOK_SECRET'
fi

export BOOKTOKEN_SECRET=$BOOK_SECRET
export BOOKTOKEN_AUDIENCE=localhost
export BOOKTOKEN_LIFETIME=86400
export BOOKTOKEN_GROUPS="everyone develop"
export BOOKTOKEN_ADMIN=true
export BOOKUPLOAD_TOKEN=$(book token)
echo "Admin token:"
echo ${BOOKUPLOAD_TOKEN}

# read and split the token and do some base64URL translation
read h p s <<< $(echo $BOOKUPLOAD_ADMINTOKEN | tr [-_] [+/] | sed 's/\./ /g')

h=`paddit $h`
p=`paddit $p`
# assuming we have jq installed
echo $h | base64 -d | jq
echo $p | base64 -d | jq

# generate user token
export BOOKTOKEN_ADMIN=false
export USERTOKEN=$(book token)
export BOOKJS_USERTOKEN=$(book token)
echo "User token:"
echo ${BOOKJS_USERTOKEN}

mkdir -p ../assets/tokens
echo ${BOOKJS_USERTOKEN} > ../assets/tokens/everyone
export  ASSET_PORT=4001
http-server ../assets -p ${ASSET_PORT} &
asset_pid=$!

# read and split the token and do some base64URL translation
read h p s <<< $(echo $BOOKJS_USERTOKEN | tr [-_] [+/] | sed 's/\./ /g')

h=`paddit $h`
p=`paddit $p`
# assuming we have jq installed
echo $h | base64 -d | jq
echo $p | base64 -d | jq

# manifest upload settings
export BOOKUPLOAD_SCHEME=http
export BOOKUPLOAD_HOST=localhost:4000

#poolstore reset settings
export BOOKRESET_HOST=$BOOKUPLOAD_HOST
export BOOKRESET_SCHEME=$BOOKUPLOAD_SCHEME

# storestatus settings
export BOOKSTATUS_HOST=$BOOKUPLOAD_HOST
export BOOKSTATUS_SCHEME=$BOOKUPLOAD_SCHEME
export BOOKSTATUS_TOKEN=$BOOKUPLOAD_TOKEN

set | grep BOOK


echo "book server at localhost:4000 (testing)"

echo "commands:"
echo "  g: start insecure chrome"
echo "  l: Lock bookings"
echo "  n: uNlock bookings"
echo "  r: reset the poolstore (has confirm)"
echo "  s: get the status of the poolstore)"
echo "  u: re-upload manifest"

for (( ; ; ))
do
	read -p 'What next? [l/n/r/s/u]:' command
if [ "$command" = "g" ];
then
	mkdir -p ~/tmp/chrome-user
	google-chrome --disable-web-security --user-data-dir="~/tmp/chrome-user" > chrome.log 2>&1 &	
elif [ "$command" = "l" ];
then
	export BOOKTOKEN_ADMIN=true
    export BOOKSTATUS_TOKEN=$(book token)
	read -p 'Enter lock message:' message
	book setstatus lock "$message"
elif [ "$command" = "n" ];
then
	export BOOKTOKEN_ADMIN=true
    export BOOKSTATUS_TOKEN=$(book token)
	read -p 'Enter unlock message:' message
	book setstatus unlock "$message"
elif [ "$command" = "r" ];
then
	export BOOKTOKEN_ADMIN=true
    export BOOKRESET_TOKEN=$(book token)
    book reset
elif [ "$command" = "s" ];
then
	export BOOKTOKEN_ADMIN=true
    export BOOKSTATUS_TOKEN=$(book token)
	book getstatus
elif [ "$command" = "u" ];
then
	read -p "Definitely upload [y/N]?" confirm
	if ([ "$confirm" == "y" ] || [ "$confirm" == "Y" ]  || [ "$confirm" == "yes"  ] );
	then
		export BOOKTOKEN_ADMIN=true
		export BOOKUPLOAD_TOKEN=$(book token)
		book upload ../manifest/manifest.yaml
	else
		echo "wise choice, aborting"
	fi
else	
     echo -e "\nUnknown command ${command}."
fi
done

kill book_pid
kill asset_pid


