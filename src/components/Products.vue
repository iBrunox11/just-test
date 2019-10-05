<template>
  <div>
    <md-table md-sort="name" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Items</h1>
        <md-chip>R${{cartMetrics.totalCart.toLocaleString('pt-BR')}}</md-chip>
        <md-badge :md-content="cartMetrics.productsLength">
          <md-button class="md-icon-button" to="/cart">
            <md-icon>add_shopping_cart</md-icon>
          </md-button>
        </md-badge>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Image</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>price</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>
      <md-table-row v-for="product in products" v-bind:key="product.id">
        <md-table-cell md-numeric>{{product.id}}</md-table-cell>
        <md-table-cell>
          <img :src="product.picture" :alt="'Image of the product ' + product.id" />
        </md-table-cell>
        <md-table-cell>{{product.title}}</md-table-cell>
        <md-table-cell class="descriptionFlow">{{product.description}}</md-table-cell>
        <md-table-cell>R${{product.price.toLocaleString('pt-BR')}}</md-table-cell>
        <md-table-cell>
          <div>
            <md-button class="md-raised md-primary" v-on:click="addToCart(product)">
              <md-icon>attach_money</md-icon>
            </md-button>
          </div>
          <div>
            <md-button class="md-raised" v-on:click="openDetails(product)">
              <md-icon>remove_red_eye</md-icon>
            </md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!-- Dialog with item detail -->
    <md-dialog :md-active.sync="showDialog" ng-if="selectedProduct" class="dialog">
      <md-dialog-title>#{{selectedProduct.id}} - {{selectedProduct.title}}</md-dialog-title>
      <md-content class="alignImage">
        <img :src="selectedProduct.picture" alt="People" width="50%" height="250px" />
        <div class="md-title">Price</div>
        <div>R${{selectedProduct.price}}</div>
        <div class="md-title">Description</div>
        <div>{{selectedProduct.description}}</div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = !showDialog">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { justService } from "../_services";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "products",
  data() {
    return {
      showDialog: false,
      selectedProduct: {}
    };
  },
  computed: {
    ...mapGetters({
      products: "getAllProducts",
      cartMetrics: "getCartMetrics",
      cart: "getCart"
    })
  },
  methods: {
    // open the current product, inside a Modal Dialog
    openDetails(product) {
      this.selectedProduct = product;
      this.showDialog = !this.showDialog;
    },
    // upInsert an item inside the cart
    addToCart(product) {
      this.$store.commit("upsertToCart", { product, action: "increase" });
    }
  },
  mounted() {
    // get all products inside the Open API of https://www.justonline.com.br
    justService
      .getAllProducts()
      .then(result => {
        if (result.data && result.data.products) {
          result.data.products.forEach(product => {
            this.$store.commit("upsertToProducts", product);
          });
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};
</script>
<style>
.descriptionFlow .md-table-cell-container {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 300px;
}
.leftMove {
  margin-left: 12px !important;
}
.dialog {
  overflow: auto;
}
.alignImage {
  margin: 0 auto;
  text-align: center;
  width: 70%;
}
</style>
