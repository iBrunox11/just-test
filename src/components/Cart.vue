<template>
  <div class="cart" style="display: inline-flex;">
    <!-- Simple image to show if is nothing inside the Cart -->
    <md-card v-show="!cart.length">
      <img src="../assets/emptycart.png" />
    </md-card>

    <!-- This block show the list of itens inside the Cart -->
    <md-table v-show="cart.length" md-sort="name">
      <md-table-toolbar>
        <h1 class="md-title">Your Cart</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Image</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>price</md-table-head>
        <md-table-head>quantity</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>
      <md-table-row v-for="(product, index) in cart" v-bind:key="product.id">
        <md-table-cell>
          <img :src="product.picture" :alt="'Image of the product ' + product.id" />
        </md-table-cell>
        <md-table-cell>{{product.title}}</md-table-cell>
        <md-table-cell>R${{product.price.toLocaleString('pt-BR')}}</md-table-cell>
        <md-table-cell>{{product.lockedQuantity}}</md-table-cell>
        <md-table-cell>
          <div>
            <md-button
              v-on:click="updateQuantity(product, 'increase')"
              class="md-icon-button md-accent"
            >
              <md-icon>expand_less</md-icon>
            </md-button>
          </div>
          <div>
            <md-button
              v-on:click="updateQuantity(product, 'decrease')"
              class="md-icon-button md-accent"
            >
              <md-icon>expand_more</md-icon>
            </md-button>
          </div>
          <div>
            <md-button v-on:click="removeItem(index, product)" class="md-icon-button md-accent">
              <md-icon>restore_from_trash</md-icon>
            </md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!-- This block is responsable to show our Checkout -->
    <div v-show="cart.length">
      <md-card class="expandCheckout">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">CHECKOUT</div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <p>Quantity of items: {{cartMetrics.productsLength}}</p>
          <p>Total: R$: {{cartMetrics.totalCart.toLocaleString('pt-BR')}}</p>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-raised md-primary">Pay</md-button>
          <md-button v-on:click="clearCart()" class="md-raised md-accent">Clear cart</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cartMetrics: "getCartMetrics",
      cart: "getCart"
    })
  },
  methods: {
    // simple function to clear the data inside Cart
    clearCart() {
      this.$store.commit("clearCart");
    },
    // check if the product exist inside our Cart, update then with +1/-1 or create one
    updateQuantity(product, action) {
      this.$store.commit("upsertToCart", { product, action: action });
    },
    // simple function to remove an item of our Cart
    removeItem(index, product) {
      this.$store.commit("removeToCart", { product, index });
    }
  }
};
</script>
<style>
.expandCheckout {
  height: 100%;
}
</style>
