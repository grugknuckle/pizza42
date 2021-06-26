<template>
  <v-app id="app" light>
		<navigation></navigation>

			<v-main>
        <error />
        <router-view></router-view>
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
  components: {
    Error,
    Navigation,
    // AppFooter
  }
}
</script>
