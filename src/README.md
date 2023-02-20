# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Vuex and/or Xstate?

Both seems to be a halfway house, with [posters commenting they move onto XState only if they can refactor legacy code from vuex](https://dev.to/felix/replacing-vuex-with-xstate-3097) But don't use the event bus in the example because it is deprecated for vue3


## Front end can be a simple view layer

Logic can rest in the state machines.

The reddit example looks appropriate.

where each subreddit is instead a policy.

## Back button ....

Can the xstate be tied to a top level component, so that its context is available to all components loaded with the router?

At present it reloads every time we return to the Booking component.

As an interim step, if not clear how to put xstate at top level, we could use pinia to store the state from booking, and rehydrate when going back to that page, rather than redoing all the network stuff.
Except .... we can't then send events to the services. So we have to keep them running. Spawn? KeepAlive?

[Provide iwth composition](https://markus.oberlehner.net/blog/context-and-provider-pattern-with-the-vue-3-composition-api/)
[Provide and inject](https://alirezavalizade.medium.com/react-context-in-vue-d40ee145974d)

[Example](https://codesandbox.io/s/7n4fc)


## Bootstrap


https://getbootstrap.com/docs/5.2/getting-started/vite/
npm i --save-dev sass
npm i --save bootstrap @popperjs/core
