<template>
  <!-- List of tabs that we can switch -->
  <md-tabs md-sync-route>
    <md-tab id="tab-home" md-label="List Products" to="/" exact></md-tab>
    <md-tab id="tab-pages" md-label="shopping" to="/cart"></md-tab>
  </md-tabs>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {}
};
</script>
