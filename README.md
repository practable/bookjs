# bookjs

Webclient for booking experiments hosted using [timdrysdale/relay](https://github.com/timdrysdale/relay)

![screenshot](./img/screenshot-controls3-booked.jpg)

# Releases

The MVP release was used for Semester Two of Academic Year 2020-2021.

## Deployment / Local testing

We use the Vue CLI, and treat the app as static because it can access the API of the backend via normal HTTP verbs. This means we can install it by copying the `dist` directory directly onto the server). 

### Deployment

We use `npm` to build for production:

```
cd <repo-path>/src
npm run build
```

### Testing

Script added to package.json to run build with development mode

```
npm run build-dev
```

However, with we can't just run it locally for testing, because the public path setting would be wrong if we access it from `file://<your-path>` so we can [serve it locally by installing serve](https://cli.vuejs.org/guide/deployment.html) 

```
npm install -g serve
```
Then to serve locally, just run
```
serve -s dist
```

You'll see a terminal message something like this, and the app will be able to access the production booking server for which it is configured.

```
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:5000      │
   │   - On Your Network:  http://192.168.0.46:5000   │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

Note you have to be in `src` or else you get path not found error in the browser.

You will want a book server running on localhost:4000 
You will want to serve tokens on a localhost:4001
You will want to try insecure chrome

These options are all supported in `test/scripts/test_serve.sh`

Note - the suggested order of commands when using the `test_serve` script is

  - `g` - start insecure chrome
  - `u` - upload manifest
  - `t` - start serving the token

If you are using an alternative means of providing the booking server and token, then you can start insecure chrome like this:

```
mkdir -p ~/tmp/chrome-user
google-chrome --disable-web-security --user-data-dir="~/tmp/chrome-user" > chrome.log 2>&1 &	
```

## Dev notes

### Book update to config
`sessions?duration=300`:
```
{
   "description":{
      "further":"https://static.practable.io/info/pvna-real-1.0/index.html",
      "id":"0dbd1ba8-82cd-4d24-a304-2fcc935d058e",
      "image":"https://assets.practable.io/images/booking/activities/pvna-real-1.0/image.png",
      "long":"A pocketVNA Vector Network Analyser that can read two-port S-parameters",
      "name":"PocketVNA",
      "short":"A pocketVNA Vector Network Analyser",
      "thumb":"https://assets.practable.io/images/booking/activities/pvna-real-1.0/thumb.png",
      "type":"pvna-activity-v1.0"
   },
   "exp":1644359390,
   "streams":[
      {
         "for":"data",
         "permission":{
            "audience":"https://relay-access.practable.io",
            "connection_type":"session",
            "scopes":[
               "read",
               "write"
            ],
            "topic":"pvna01-data"
         },
         "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b3BpYyI6InB2bmEwMS1kYXRhIiwicHJlZml4Ijoic2Vzc2lvbiIsInNjb3BlcyI6WyJyZWFkIiwid3JpdGUiXSwiYXVkIjoiaHR0cHM6Ly9yZWxheS1hY2Nlc3MucHJhY3RhYmxlLmlvIiwiZXhwIjoxNjQ0MzU5MzkwLCJpYXQiOjE2NDQzNTkwODksIm5iZiI6MTY0NDM1OTA4OX0.zuopsXnmkjn777KR3kLt0C2cwo2sNJdVZb0kR5A0ot0",
         "url":"https://relay-access.practable.io/session/pvna01-data",
         "verb":"POST"
      }
   ],
   "uis":[
      {
         "description":{
            "further":"https://static.practable.io/info/pvna-basic-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/image.png",
            "long":"Read S-parameters from pocketVNA, and plot them as a function of frequency",
            "name":"PocketVNA (Default)",
            "short":"Read S-parameters from pocketVNA",
            "thumb":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/thumb.png",
            "type":"pvna-default-ui-1.0"
         },
         "streamsRequired":[
            "data"
         ],
         "url":"https://static.practable.io/ui/pvna-1.0/?config={{config}}&streams={{streams}}&exp={{exp}}"
      },
      {
         "description":{
            "further":"https://static.practable.io/info/debug-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/debug-1.0/image.png",
            "long":"See the video, data, and type commands.",
            "name":"Debug",
            "short":"See the video, data, and type commands.",
            "thumb":"https://assets.practable.io/images/booking/ui/debug-1.0/thumb.png",
            "type":"debug-ui-1.0"
         },
         "streamsRequired":[
            "data",
            "video"
         ],
         "url":"https://static.practable.io/ui/debug-1.0/?streams={{streams}}&exp={{exp}}"
      },
      {
         "description":{
            "further":"https://static.practable.io/info/debug-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/debug-1.0/image.png",
            "long":"See the video, data, and type commands.",
            "name":"Debug (Develop)",
            "short":"See the video, data, and type commands.",
            "thumb":"https://assets.practable.io/images/booking/ui/debug-1.0/thumb.png",
            "type":"dev-debug-ui-1.0"
         },
         "streamsRequired":[
            "data",
            "video"
         ],
         "url":"https://dev-static.practable.io/ui/debug-1.0/?streams={{streams}}&exp={{exp}}"
      },
      {
         "description":{
            "further":"https://static.practable.io/info/pvna-basic-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/image.png",
            "long":"Read S-parameters from pocketVNA, and plot them as a function of frequency",
            "name":"PocketVNA (Develop)",
            "short":"Read S-parameters from pocketVNA",
            "thumb":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/thumb.png",
            "type":"dev-pvna-ui-1.0"
         },
         "streamsRequired":[
            "data"
         ],
         "url":"https://dev-static.practable.io/ui/pvna-1.0/?config={{config}}&streams={{streams}}&exp={{exp}}"
      }
   ]
}
```

After the update to include config:

```
{
   "config":{
      "url":""
   },
   "description":{
      "further":"https://static.practable.io/info/pvna-real-1.0/index.html",
      "id":"8276d7aa-4916-4676-80f0-6fa3c7e48e65",
      "image":"https://assets.practable.io/images/booking/activities/pvna-real-1.0/image.png",
      "long":"A pocketVNA Vector Network Analyser that can read two-port S-parameters",
      "name":"PocketVNA",
      "short":"A pocketVNA Vector Network Analyser",
      "thumb":"https://assets.practable.io/images/booking/activities/pvna-real-1.0/thumb.png",
      "type":"pvna-activity-v1.0"
   },
   "exp":1644359606,
   "streams":[
      {
         "for":"data",
         "permission":{
            "audience":"https://relay-access.practable.io",
            "connection_type":"session",
            "scopes":[
               "read",
               "write"
            ],
            "topic":"pvna01-data"
         },
         "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b3BpYyI6InB2bmEwMS1kYXRhIiwicHJlZml4Ijoic2Vzc2lvbiIsInNjb3BlcyI6WyJyZWFkIiwid3JpdGUiXSwiYXVkIjoiaHR0cHM6Ly9yZWxheS1hY2Nlc3MucHJhY3RhYmxlLmlvIiwiZXhwIjoxNjQ0MzU5NjA2LCJpYXQiOjE2NDQzNTkzMDUsIm5iZiI6MTY0NDM1OTMwNX0.diXof26QFBWSUQuyG-vtnGCgTAmN8DzSwzBijuU2PR0",
         "url":"https://relay-access.practable.io/session/pvna01-data",
         "verb":"POST"
      }
   ],
   "uis":[
      {
         "description":{
            "further":"https://static.practable.io/info/pvna-basic-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/image.png",
            "long":"Read S-parameters from pocketVNA, and plot them as a function of frequency",
            "name":"PocketVNA (Default)",
            "short":"Read S-parameters from pocketVNA",
            "thumb":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/thumb.png",
            "type":"pvna-default-ui-1.0"
         },
         "streamsRequired":[
            "data"
         ],
         "url":"https://static.practable.io/ui/pvna-1.0/?config={{config}}&streams={{streams}}&exp={{exp}}"
      },
      {
         "description":{
            "further":"https://static.practable.io/info/debug-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/debug-1.0/image.png",
            "long":"See the video, data, and type commands.",
            "name":"Debug",
            "short":"See the video, data, and type commands.",
            "thumb":"https://assets.practable.io/images/booking/ui/debug-1.0/thumb.png",
            "type":"debug-ui-1.0"
         },
         "streamsRequired":[
            "data",
            "video"
         ],
         "url":"https://static.practable.io/ui/debug-1.0/?streams={{streams}}&exp={{exp}}"
      },
      {
         "description":{
            "further":"https://static.practable.io/info/debug-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/debug-1.0/image.png",
            "long":"See the video, data, and type commands.",
            "name":"Debug (Develop)",
            "short":"See the video, data, and type commands.",
            "thumb":"https://assets.practable.io/images/booking/ui/debug-1.0/thumb.png",
            "type":"dev-debug-ui-1.0"
         },
         "streamsRequired":[
            "data",
            "video"
         ],
         "url":"https://dev-static.practable.io/ui/debug-1.0/?streams={{streams}}&exp={{exp}}"
      },
      {
         "description":{
            "further":"https://static.practable.io/info/pvna-basic-ui-1.0/index.html",
            "image":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/image.png",
            "long":"Read S-parameters from pocketVNA, and plot them as a function of frequency",
            "name":"PocketVNA (Develop)",
            "short":"Read S-parameters from pocketVNA",
            "thumb":"https://assets.practable.io/images/booking/ui/pvna-default-1.0/thumb.png",
            "type":"dev-pvna-ui-1.0"
         },
         "streamsRequired":[
            "data"
         ],
         "url":"https://dev-static.practable.io/ui/pvna-1.0/?config={{config}}&streams={{streams}}&exp={{exp}}"
      }
   ]
}

```

### modal promise pattern

description [here](https://dev.to/danitrap/vue-3-expressive-api-for-confirmation-modals-3757)
Needs type script installing

### CORS localhost
[use cmd line opts to disable CORS](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome)
`google-chrome --disable-web-security --user-data-dir="[some directory here]"`

### Axios

[Use in components](https://codesandbox.io/s/vue-axios-http-get-request-examples-ei7l8?file=/app/GetRequest.vue:0-529)

`npm install axios`


```
<template>
  <div class="card text-center m-3">
    <h5 class="card-header">Simple GET Request</h5>
    <div class="card-body">Total vue packages: {{totalVuePackages}}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "get-request",
  data() {
    return {
      totalVuePackages: null
    };
  },
  created() {
    // Simple GET request using axios
    axios.get("https://api.npms.io/v2/search?q=vue")
      .then(response => this.totalVuePackages = response.data.total);
  }
};
</script>


```

### Scopes

There are four scopes
https://michaelnthiessen.com/levels-of-vue-scope

And the scope of this depends on how the function was invoked
https://www.jackfranklin.co.uk/blog/javascript-variable-scope-this/

### chrome dev tools

you need the [beta version](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en) for vue3 to work in chrome

### configuring

to [get full build in vue-cli](https://github.com/vuejs/vue-cli/issues/1040) you need a [`vue.config.js`](https://www.digitalocean.com/community/tutorials/vuejs-using-new-vue-cli-3#the-vueconfigjs-file)

make new vue.config.js in root

```
module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
};
```

### Use

Plugins are added by 'use' which can be called more than once, but [only installs each plugin once](https://vuejs.org/v2/guide/plugins.html), and must be used in commonJS pattern

### Aggregating exports

[Pattern: use almost-empty parent module to aggregate exports for a single module](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_the_default_export)

```
// In childModule1.js
let myFunction = ...; // assign something useful to myFunction
let myVariable = ...; // assign something useful to myVariable
export {myFunction, myVariable};
```

```
// In childModule2.js
let myClass = ...; // assign something useful to myClass
export myClass;
```

```
// In parentModule.js
// Only aggregating the exports from childModule1 and childModule2
// to re-export them
export { myFunction, myVariable } from 'childModule1.js';
export { myClass } from 'childModule2.js';
```

```
// In top-level module
// We can consume the exports from a single module since parentModule
// "collected"/"bundled" them in a single source
import { myFunction, myVariable, myClass } from 'parentModule.js'
```

### Vuex

Latest version on 4 branch is rc.2

`npm i -S vuex@4.0.0-rc.2 `

### Importing external js for use in multiple components

Importing external js can be done several naiive ways, or [like this](https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/)

```
//entry.js
import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
```

```
// mynewcomponent.vue
export default {
  created() {
    console.log('The time is ' . this.$moment().format("HH:mm"));
  }
}
```

Makes it write only so you can assign somethign else to the property and break thigns

## moving to vite

[migration guide](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)

then 

```
npm install -g vite
```

then `npm run dev`

```
<snip>
import { performance } from 'node:perf_hooks'
       ^

SyntaxError: Unexpected token {
<snip>
```
Looks like this [perf hooks issue]( https://stackoverflow.com/questions/63383304/unable-to-resolve-module-perf-hooks), solution proposed is
```
 npm i --save-dev @types/node

```
and that fixed it.

Except that could not find global css or main.js￼

```
localhost/:8 
 GET http://localhost:3000/global.css net::ERR_ABORTED 404 (Not Found)
localhost/:10 
 GET http://localhost:3000/src/main.js net::ERR_ABORTED 404 (Not Found)
client.ts:16 [vite] connecting...
client.ts:53 [vite] connected.
```

oops ... `main.js` is now `main.ts`!

fix ... but then repeated reloads with errors, similar to [this bad gateway for deps](https://github.com/vitejs/vite/discussions/8749)

```
<snip>
[vite] error while updating dependencies:
Error: ENOTEMPTY: directory not empty, rmdir '/home/tim/sources/bookjs/src/node_modules/.vite/deps'
<snip>
```

asdfasdf


```
rm -r 
```

Also, env vars need changing to prefix `VITE` []()

> To prevent accidentally leaking env variables to the client, only variables prefixed with VITE_ are exposed to your Vite-processed code. e.g. for the following env variables:

```
VITE_SOME_KEY=123
DB_PASSWORD=foobar 

```
> Only `VITE_SOME_KEY` will be exposed as `import.meta.env.VITE_SOME_KEY` to your client source code, but `DB_PASSWORD` will not.

changed all `VUE_APP` to `VITE_APP`, and now running fine locally on `npm run dev` with development env.vars pointing to the existing AWS server instantiation (for convenience in avoiding setting up local services).


Now try production build with base path and host on `dev.practable.io/book` ...

```
npm run build
```

Still got the base_path problem with css and js assets, being looked for at `https://dev.practable.io/css/<name>` and  `https://dev.practable.io/js/<name>` so page is not loading, and can't check whether the routing etc is working yet.


[base path for local dev](https://github.com/vitejs/vite/issues/3107) server origin, base href

added base href, did not fix issue...

[not sure about this router config as seems different, but apparently works](https://github.com/antfu/vitesse/discussions/226)
