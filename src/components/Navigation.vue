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

      <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
      
      <v-app-bar-title class="float-left">
        Pizza 42 - Auth0 Technical Challenge
			</v-app-bar-title>
			
      
			
			<v-spacer></v-spacer>

      <v-btn icon v-if="$auth.isAuthenticated" @click="logout">
        <v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
      </v-btn>
      <v-btn icon v-else @click="login">
        <v-icon>{{ icons.mdiLoginVariant }}</v-icon>
      </v-btn>

      <v-btn v-if="$auth.isAuthenticated" icon to="/profile">
        <v-avatar color="primary" >
          <img :src="$auth.user.picture" :alt="$auth.user.name">
        </v-avatar>
      </v-btn>
      <v-btn v-else icon>
        <v-avatar color="primary" size="48">
          <v-icon x-large>{{ icons.mdiAccountCircle }}</v-icon>
        </v-avatar>
      </v-btn>

		</v-app-bar>

		<v-navigation-drawer
      v-model="drawer"
      app
      floating
      :clipped="true"
      light
      :mini-variant="miniVariant">

			<v-list dense nav>
				<v-list-item v-for="item in routes" :key="item.title" :to="item.to">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
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

			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import {
	// mdiAccount,
	mdiHome,
  mdiFoodVariant,
  mdiSilverware,
	mdiLogoutVariant,
	mdiLoginVariant,
	mdiAccountCircle
} from '@mdi/js'

export default {
	data: () => ({
		drawer: false,
		miniVariant: false,
    // appbarimg: require('../assets/Pizza-Background.jpg'),
    appbarimg: require('../assets/tablecloth-italy.svg'),
    logo: require('../assets/Pizza42.svg'),
    routes: [
      { title: 'Home', icon: mdiHome, to: '/' },
      { title: 'Order Online', icon: mdiSilverware, to: '/order' },
      { title: 'Menu', icon: mdiFoodVariant, to: '/menu' },
    ],
    icons: {
      // mdiAccount,
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