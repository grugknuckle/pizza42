<template>
<div>
  
  <v-row>
    <!-- Menu Column -->
    <v-col cols="5">
      <v-card elevation="2" outlined shaped class="ma-3 pa-3">        
        <v-card-title>Menu</v-card-title>
        <v-list subheader dense>
          <v-subheader>Sizes</v-subheader>

          <v-list-item v-for="item in menu" :key="item.size" >

            <v-list-item-content>
              <v-list-item-title v-text="item.size"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-chip color="green" outlined pill>
                ${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
              </v-chip>
            </v-list-item-icon>
          </v-list-item>

          <v-subheader>Toppings</v-subheader>

          <v-list-item v-for="topping in toppings" :key="topping.name" >

            <v-list-item-content>
              <v-list-item-title v-text="topping.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-chip color="green" outlined pill>
                {{ topping.price }}
              </v-chip>
            </v-list-item-icon>
          </v-list-item>

        </v-list>
      </v-card>
      
    </v-col>

    <!-- Order Column -->
    <v-col cols="5">
      <v-card elevation="2" outlined shaped class="ma-3 pa-3" v-if="$auth.isAuthenticated">
        <v-card-title v-if="$auth.isAuthenticated">
          Welcome {{ $auth.user.name }} !
        </v-card-title>
        
        <v-divider></v-divider>
        
        <v-list subheader dense v-if="pizza">
          <v-subheader>Your Order:</v-subheader>

          <v-list-item>

            <v-list-item-content>
              <v-list-item-title v-text="pizza.item"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-chip color="green" outlined pill>
                {{ pizza.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
              </v-chip>
            </v-list-item-icon>
          </v-list-item>

        </v-list>  
        
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="red" @click="placeOrder()">
            Select Pizza
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <order-form ref="orderform" v-on:submit-pizza-order="updatePizza"></order-form>
  <v-snackbar
    v-model="snackbar.show"
    :timeout="10000"
    color="secondary"
    outlined
    absolute
    centered
    elevation="5"
    vertical
    center>
      <h3>{{ snackbar.title}}</h3>
      <p>{{ snackbar.text }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false" >
          Close
        </v-btn>
      </template>
  </v-snackbar>

</div>
</template>

<script>
import OrderForm from './../components/OrderForm.vue'

export default {
  name: 'home',
  metaInfo: {
    title: 'Home',
  },
  components: {
    OrderForm
  },
  data() {
    return {
      pizza: null,
      menu: [
        { size: 'Single Slice', price: 2 },
        { size: 'Small', price: 7.5 },
        { size: 'Medium', price: 12 },
        { size: 'Large', price: 17 },
        { size: 'X-Large', price: 22 },
      ],
      toppings: [
        { name: 'pepperoni', price: '+ $1.00' },
        { name: 'sausage', price: '+ $1.00' },
        { name: 'mushrooms', price: '+ $1.00' },
        { name: 'extra cheese', price: '+ $1.00' },
        { name: 'ham', price: '+ $1.00' },
        { name: 'brocolli', price: '+ $1.00' },
        { name: 'feta cheese', price: '+ $1.00' },
        { name: 'pinapple', price: '+ $1.00' },
      ],
      orders: [],
      snackbar: {
        show: false,
        title: 'Snackbar Title',
        text: 'Hey - The snackbar is showing!'
      }
    }
  },
  methods: {
    async placeOrder() {
      if (!this.$auth.isAuthenticated) {
        this.snackbar.title = 'User Not Logged In'
        this.snackbar.text = 'Please Login before placing an order.'
        this.snackbar.show = true
      } else if (!this.$auth.user.email_verified) {
        this.snackbar.title = 'Email Address Not Verified'
        this.snackbar.text = `The account for ${this.$auth.user.email} recieved an email from the identity provider but the address has not yet been verified. Please follow the instructions in that email to verify the email address.`
        this.snackbar.show = true
      } else {
        this.snackbar.show = false
        this.$refs.orderform.show()
      }
    },
    updatePizza(pizza) {
      this.pizza = pizza
    }
  }
}
</script>

