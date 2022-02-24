<template>
  <div id="app">
    <FormMaker
      ref="formMaker"
      :json="initJson"
      mode="edit"
      :uploadConfig="{
        handleUploadChange: demoFn,
      }"
    ></FormMaker>
  </div>
</template>

<script>
import FormMaker from './lib/form-maker.vue';
export default {
  name: 'App',
  components: { FormMaker },
  data() {
    return {
      demoFn: () => console.log('2222'),
      initJson:
        '{"id":"bfe44b80-d49f-8ca5-1793-82381a4ec1d2","type":"root","children":[{"children":{"A":[{"children":[],"type":"image","url":"https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/newfanyi-da0cea8f7e.png","shapes":["矩形","多边形"],"id":"21613588-3df4-7fe7-8263-80a49e2df831"}],"B":[{"children":{"新加坡":[{"children":[],"type":"text","label":"首都风景","value":"挺好","id":"9ed79fe4-408b-aed0-4a8b-5a5298813484"}],"马德里":[{"children":[],"type":"checkbox","label":"小吃","options":["热干面","羊肉串","肥肠臭豆腐"],"value":[],"id":"dcb2ac95-14ec-5ed9-3a6c-88ee05f08816"}],"新西兰":[{"children":[],"type":"image","url":"https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/newfanyi-da0cea8f7e.png","shapes":["矩形"],"id":"2091d2bf-d1e7-5121-44e9-bdfd54006002"}]},"type":"radio","label":"地点","options":["新加坡","马德里","新西兰"],"value":"新西兰","id":"32b94b80-9c49-e95f-2b62-fd77f52f2a99"}]},"type":"radio","label":"类型","options":["A","B"],"value":"B","id":"d57fcbb2-3d73-c236-de4a-ab04c20de629"}]}',
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
  width: 100vw !important;
  height: 100vh !important;
  padding: 0 !important;
  margin: 0 !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
