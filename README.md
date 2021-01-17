# bookjs

Webclient for booking experiments hosted using [timdrysdale/relay](https://github.com/timdrysdale/relay)

In early stages of development ... 

## Dev notes

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

