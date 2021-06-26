<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">

      <v-card>
        <v-card-title>
          <span class="text-h5">Order A Pizza</span>
        </v-card-title>
        
        <v-card-text>
          <p>
            Choose your toppings
          </p>
          <v-checkbox v-for="topping of Object.keys(toppings)"
                      v-model="toppings[topping]"
                      :key="topping"
                      :label="topping"
                      color="red"
                      :value="toppings[topping]">
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
      toppings: {
        pepperoni: false,
        sausage: false,
        mushrooms: false,
        'extra cheese': false,
        ham:  false,
        brocolli:  false,
        'feta cheese':  false,
        pinapple: false
      }
    }
  },
  props: {

  },
  methods: {
    show() {
      this.dialog = true
    },
    hide() {
      this.dialog = false
    },
    async submit() {
      const accessToken = await this.$auth.getTokenSilently()
      const url = '/api/v1/pizza/orders'
      const headers = {
        Authorization: `Bearer ${accessToken}`
      }
      const body = {
        pizza: this.toppings
      }
      try {
        const { data } = await this.$http.post(url, { headers }, body)
        this.apiMessage = data
      } catch (error) {
        this.apiMessage = `Error: the server responded with '${error.response.status}: ${error.response.statusText}'`
      }
      this.dialog = false
    }
  }
}
</script>