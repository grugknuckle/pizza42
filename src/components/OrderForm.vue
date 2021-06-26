<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">

      <v-card>
        <v-card-title>
          <span class="text-h5">Order A Pizza</span>
        </v-card-title>
        
        <v-card-text>
          <p>What size would you like?</p>
          <v-radio-group v-model="size.value" row>
              <v-radio v-for="option in size.options" :key="option.size" :label="option.size" :value="option.size"></v-radio>
          </v-radio-group>

          <p>
            Choose your toppings
          </p>
          <v-checkbox v-for="topping of toppings.options"
                      v-model="toppings.selected"
                      :key="topping"
                      :label="topping"
                      color="red"
                      :value="topping">
          </v-checkbox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" outlined @click="submit()">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'OrderForm',
  data() {
    return {
      dialog: false,
      apiMessage: null,
      size: {
        value: 'Single Slice',
        options: [
          { size: 'Single Slice', price: 2 },
          { size: 'Small', price: 7.5 },
          { size: 'Medium', price: 12 },
          { size: 'Large', price: 17 },
          { size: 'X-Large', price: 22 },
        ]
      },
      toppings: {
        selected: [],
        options: [
          'pepperoni',
          'sausage',
          'mushrooms',
          'extra cheese',
          'ham',
          'brocolli',
          'feta cheese',
          'pinapple'
        ]
      }
    }
  },
  computed: {
    orderDetail() {
      let price = 0
      const size = this.size.options.find(x => x.size === this.size.value)
      price += size.price
      price += this.toppings.selected.length

      const detail = {
        size: this.size.value,
        toppings: this.toppings.selected,
        price
      }
      return detail
    }
  },
  methods: {
    show() {
      this.dialog = true
    },
    hide() {
      this.dialog = false
    },
    async submit() {
      try {
        const response = await this.postOrder()
        const apiMessage = `Success: the server responded with '${response.status}: ${response.statusText}'`
        console.warn(apiMessage, response.data)
      } catch (error) {
        const apiMessage = `Error: the server responded with '${error.response.status}: ${error.response.statusText}'`
        console.error(apiMessage, error)
      } finally {
        this.dialog = false
      }
    },
    async postOrder() {
      const accessToken = await this.$auth.getTokenSilently()
      const url = '/api/v1/pizza/orders'
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
      const body = this.orderDetail
      return await this.$http.post(url, body, { headers })
    }
  }
}
</script>