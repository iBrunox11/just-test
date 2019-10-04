<template>
  <div id="app" class='container'>
    <nav-options></nav-options>
    <router-view></router-view>
  </div>
</template>
<script>
import NavOptions from './components/NavOptions.vue'
export default {
  name: 'app',
  components: {
    NavOptions
  },
  data () {
    return {}
  }
}
</script>
