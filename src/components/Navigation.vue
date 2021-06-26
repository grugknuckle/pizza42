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
     
      <v-app-bar-title class="float-left">
        <div class="logo"></div> Pizza 42 - Auth0 Technical Challenge
			</v-app-bar-title>

		</v-app-bar>

		<v-navigation-drawer app floating :clipped="true" light :mini-variant="false">

      <v-system-bar></v-system-bar>
      <v-list v-if="$auth.isAuthenticated">
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img :src="$auth.user.picture"></v-img>
          </v-list-item-avatar>
        </v-list-item> -->

        <v-list-item link>
          <v-list-item-avatar>
            <v-img :src="$auth.user.picture"></v-img>
          </v-list-item-avatar>
          
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $auth.user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $auth.user.email }}
            </v-list-item-subtitle>

            <!-- TODO: Flag if the email is not verified ! -->
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>{{ icons.mdiMenuDown}}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

			<v-list dense nav>

        <v-list-item v-if="$auth.isAuthenticated" to="/profile">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiAccount }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Profile</v-list-item-title>
					</v-list-item-content>
        </v-list-item>

				<v-list-item @click="$auth.isAuthenticated ? logout() : login()">
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
	mdiAccount,
  mdiMenuDown,
	mdiLogoutVariant,
	mdiLoginVariant,
	mdiAccountCircle
} from '@mdi/js'

export default {
	data: () => ({
    appbarimg: require('../assets/tablecloth-italy.svg'),
    logo: require('../assets/Pizza42.svg'),
    icons: {
      mdiAccount,
      mdiMenuDown,
      mdiLogoutVariant,
      mdiLoginVariant,
      mdiAccountCircle
    }
	}),
	methods: {
		// https://auth0.com/blog/complete-guide-to-vue-user-authentication/#Add-User-Authentication
    login() {
      this.$auth.loginWithRedirect()
    },
    logout() {
      this.$auth.logout()
      this.$router.push({ path: '/' })
    }
	}
}
</script>