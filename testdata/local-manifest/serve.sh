#/bin/bash

# serve.sh is a script to help with testing
# timdrysdale/bookjs. Actions:
#
# - generates 24 hr admin & user login tokens 
#   for use by bookjs during testing
#
# - generated credentials are NOT sensitive
#   in that they are time limited and cannot
#   be used for production servers anyway
#
# - tokens are echoed to console and put in
#     -  BOOKJS_ADMINTOKEN and
#     -  BOOKJS_USERTOKEN
#
# - starts a booking server on port 4000
#   and uploads the manifest.yaml
#
# - starts a static server on port 6000
#   which serves the assets in ./assets
#
# - waits for the script to be cancelled,
#   ending the two server processses
#


# booking server settings
export BOOK_DEVELOPMENT=true
export BOOK_PORT=4000
export BOOK_FQDN=http://[::]:4000
export BOOK_SECRET=somesecret

# asset server settings
export ASSET_PORT=6000

# token common settings
export BOOKTOKEN_SECRET=$BOOK_SECRET
export BOOKTOKEN_AUDIENCE=$BOOK_FQDN
export BOOKTOKEN_LIFETIME=86400
export BOOKTOKEN_GROUPS="everyone controls3"

# generate admin token
export BOOKTOKEN_ADMIN=true
export BOOKJS_ADMINTOKEN=$(book token)
export BOOKUPLOAD_TOKEN=$(book token)
echo "Admin token: ${BOOKJS_ADMINTOKEN}\n"

# generate user token
export BOOKTOKEN_ADMIN=false
export USERTOKEN=$(book token)
export BOOKJS_USERTOKEN=$(book token)
echo "Usern token: ${BOOKJS_USERTOKEN}\n"

# manifest upload settings
export BOOKUPLOAD_SCHEME=http
export BOOKUPLOAD_TOKEN=$(book token)

# start book server
book serve > book.log 2>&1 &
export BOOK_PID=$!

#wait five seconds for server to start
sleep 5

#upload manifest
book upload manifest.yaml


# start asset server
http serve ./assets > asset.log 2>&1 &
export ASSET_PID=$!

echo "book server on port ${BOOK_PORT} logs to ./book.log\n\n"
echo "asset server on port ${ASSET_PORT} logs to ./asset.log\n\n"

echo "commands:\n"
echo "  a: tail of the assert server log\n"
echo "  b: tail of book server log [default]\n"
echo "  done: stop servers\n"


for (( ; ; ))
do
read -p 'What next? [a/b/done]:' command

if ($command == "done")
then
     echo -e "\nShutting down"
	 break
elif (($command == "b") || ($command == ""))
then
	tail book.log
elif ($command == "a")
then
	tail asset.log	
else
     echo -e "\nUnknown command ${command}."
fi
done

kill -15 $BOOK_PID
kill -15 $ASSET_PID
