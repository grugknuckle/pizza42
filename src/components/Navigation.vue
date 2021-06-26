<template>
	<div>
		<v-app-bar
      app 
      clipped-left
      light
      :src="appbarimg"
      shrink-on-scroll
      prominent
      fade-img-on-scroll>

      <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon> -->
      
      <v-app-bar-title class="float-left">
        Pizza 42 - Auth0 Technical Challenge
			</v-app-bar-title>

		</v-app-bar>

		<v-navigation-drawer
      v-model="drawer"
      app
      floating
      :clipped="true"
      light
      :mini-variant="miniVariant">

			<v-list dense nav>

				<v-list-item  to="/home">
					<v-list-item-icon>
						<v-icon>{{ icons.mdiHome }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

        <v-list-item @click="placeOrder()">
					<v-list-item-icon>
						<v-icon>{{ icons.mdiSilverware }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Order</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item @click="logInOut()">
					<v-list-item-icon>
						<v-icon>{{ $auth.isAuthenticated ? icons.mdiLogoutVariant : icons.mdiLoginVariant }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ $auth.isAuthenticated ? 'Log out' : 'Login' }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

        <v-list-item v-if="$auth.isAuthenticated" to="/profile">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiAccount }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
					</v-list-item-content>
        </v-list-item>

        <v-list-item v-if="$auth.isAuthenticated">
          <v-list-item-icon>
						<v-avatar color="danger" size="36" tile>
              <img :src="$auth.user.picture" :alt="$auth.user.name">
            </v-avatar>
					</v-list-item-icon>
        </v-list-item>
			</v-list>
		</v-navigation-drawer>

    <order-form ref="orderform"></order-form>
	</div>
</template>

<script>
import {
	mdiAccount,
	mdiHome,
  mdiFoodVariant,
  mdiSilverware,
	mdiLogoutVariant,
	mdiLoginVariant,
	mdiAccountCircle
} from '@mdi/js'
import OrderForm from './OrderForm.vue'

export default {
  components: {
    OrderForm
  },
	data: () => ({
		drawer: true,
		miniVariant: false,
    // appbarimg: require('../assets/Pizza-Background.jpg'),
    appbarimg: require('../assets/tablecloth-italy.svg'),
    logo: require('../assets/Pizza42.svg'),
    icons: {
      mdiAccount,
      mdiHome,
      mdiFoodVariant,
      mdiSilverware,
      mdiLogoutVariant,
      mdiLoginVariant,
      mdiAccountCircle
    }
	}),
	methods: {
		toggleDrawer() {
			this.drawer = !this.drawer
		},
    placeOrder() {
      if (!this.$auth.user.email_verified) {
        // show an alert "please verify your email address"
      } else {
        // show the order form.
        this.$refs.orderform.show()
      }
    },
		// https://auth0.com/blog/complete-guide-to-vue-user-authentication/#Add-User-Authentication
    login() {
      this.$auth.loginWithRedirect()
    },
    logout() {
      this.$auth.logout()
      this.$router.push({ path: '/' })
    },
    logInOut() {
      if(this.$auth.isAuthenticated) {
        this.logout()
      } else {
        this.login()
      }
    }
	}
}
</script>