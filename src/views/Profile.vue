<template>
  <v-row>
    <v-col cols="5">

      <v-card elevation="2" outlined shaped class="ma-3 pa-3">

        <v-row>
          <v-col cols="3">
            <v-avatar color="primary" size="56">
              <img :src="$auth.user.picture" alt="User's profile picture" />
            </v-avatar>
          </v-col>

          <v-col cols="9">
            <v-card-title>
              {{ $auth.user.name}}
            </v-card-title>
            <v-card-text>
              {{ $auth.user.email }}
            </v-card-text>
          </v-col>
        </v-row>
        
        <v-card-title>Order History</v-card-title>
        <v-divider></v-divider>

        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="showJSON = !showJSON">
            {{ showJSON ? 'Hide JSON' : 'Show JSON' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="7" v-if="showJSON">
      <v-card elevation="2" outlined shaped class="ma-3 pa-3">
        <v-card-title>Identity Token</v-card-title>
        <highlightjs autodetect :code="JSON.stringify($auth.user, null, 2)" class="rounded w-100" />
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: 'Profile',
  metaInfo: {
    title: 'Profile',
  },
  data() {
    return {
      showJSON: false,
      headers: [
        {
          text: 'Timestamp', align: 'start', sortable: true, value: 'date'
        }, // date
        {
          text: 'Item', value: 'item'
        }, // pizza
        {
          text: '', value: 'price'
        }  // price
      ],
      orders: []
    }
  },
  beforeMount() {
    const orders = this.$auth.user['https://pizza4242.herokuapp.com'].orders || []
    this.orders = orders.map(x => {
      const orderdate = new Date(x.timestamp)
      return {
        date: `${orderdate.getMonth() + 1}/${orderdate.getDate()}/${orderdate.getFullYear()}`,
        item: `${x.size} ${x.toppings.length > 0 ? '+ ' + x.toppings.join(', ') : '' }`,
        price: `$${x.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
      }
    })
  }
}
</script>