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
          <v-checkbox v-for="topping of toppings" v-model="ex4" :key="topping" :label="topping" color="red" :value="topping" hide-details></v-checkbox>
        </v-card-text>

        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
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
      toppings: [
        'pepperoni', 'sausage', 'mushrooms', 'extra cheese', 'ham', 'brocolli', 'feta cheese', 'pinapple'
      ]
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
    }
  }
}
</script>