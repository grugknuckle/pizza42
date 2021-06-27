<template>
  <v-app id="app" light>
		<navigation></navigation>

			<v-main>
        <error />
        <v-card elevation="2" outlined shaped class="ma-2">
          <v-img :src="src">
            <router-view></router-view>
          </v-img>
        </v-card>
			</v-main>
		
		<!-- <app-footer></app-footer> -->
	</v-app>
</template>

<script>
import Error from './components/Error'
import Navigation from './components/Navigation'
// import AppFooter from './components/Footer'

export default {
  metaInfo: {
    titleTemplate: 'Pizza 42 - %s'
  },
  data() {
    return {
      src: require('./assets/Pizza-Background.jpg')
    }
  },
  components: {
    Error,
    Navigation,
    // AppFooter
  }
}
</script>
