<template>
  <div id="app">
    <button @click="getJson">json</button>
    <FormMaker ref="formMaker" :json="initJson"></FormMaker>
  </div>
</template>

<script>
import FormMaker from './lib/form-maker.vue';
export default {
  name: 'App',
  components: { FormMaker },
  data() {
    return {
      initJson:
        '{"id":"d20a0a71-09e8-846a-9cb0-41bc3e50761b","type":"root","children":[{"children":{"fsdf":[{"children":{"fsdf":[],"fdsgvdf":[{"children":[],"type":"checkbox","label":"safds","options":["fsdf","fdsgvdf"],"value":[],"id":"b1de16f2-e130-c7b8-0ff9-129b4423f4c9"}]},"type":"radio","label":"safds","options":["fsdf","fdsgvdf"],"value":"fdsgvdf","id":"eb9f06f6-3958-4a76-bc5b-330d88d5abdf"}],"fdsgvdf":[{"children":[],"type":"text","label":"safds","value":"dsv fdsc","id":"e6da48e0-c388-e465-40d8-8bd1e668c75a"}]},"type":"radio","label":"safds","options":["fsdf","fdsgvdf"],"value":"fsdf","id":"37c8150c-348b-ad92-a02e-7eba6d984db6"}]}',
    };
  },
  methods: {
    getJson() {
      console.log(this.$refs.formMaker.getJson());
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
