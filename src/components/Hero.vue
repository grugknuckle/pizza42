<template>
  <v-card
  elevation="2"
  outlined
  shaped
  class="ma-2">
    <v-img
      height="500"
      :src="src"
    ></v-img>
  </v-card>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      src: require('../assets/Pizza-Background.jpg')
    }
  }
}
</script>
