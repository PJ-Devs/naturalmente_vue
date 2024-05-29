<script setup lang="ts">
import { ref } from 'vue'
import {
  VApp,
  VMain,
  VNavigationDrawer,
  VListItem,
  VDivider,
  VBtn,
  VList
} from 'vuetify/components'
import { useAuthUserStore } from '@/stores/authUser'
import { logoutUser } from '@/API/authUsers'
import { useRouter } from 'vue-router'

const useAuthUser = useAuthUserStore()
const router = useRouter()

const selectedItem = ref('')
const drawer = ref(false)

const logOut = () => {
  logoutUser().then(() => {
    useAuthUser.logout()
    router.push('/')
  })
}
</script>

<template>
  <v-app>
    <div class="flex">
      <v-main>
        <!--
        <v-btn icon @click="drawer = !drawer">
          <v-icon>{{ drawer ? 'mdi-chevron-right' : 'mdi-menu' }}</v-icon>
        </v-btn>
        -->
        <router-view />
      </v-main>
      <!--v-model="drawer" app mini-variant-->
      <v-navigation-drawer :width="400" absolute class="drawer pt-[7dvh]" mobile-break-point="0">
        <v-list-item
          :title="`Bienvenido de vuelta, ${useAuthUser.authUser?.name}`"
          subtitle="Menu de navegacion"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <router-link to="/profile/account">
            <v-list-item
              link
              prepend-icon="mdi-account"
              title="Datos Personales"
              value="personalInformation"
              @click="selectedItem = 'account'"
            >
              <template v-slot:append>
                <v-btn
                  :icon="selectedItem === 'account' ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </router-link>
          <v-list-item
            link
            prepend-icon="mdi-basket"
            title="Mis compras"
            value="shopping"
            @click="selectedItem = 'shopping'"
          >
            <template v-slot:append>
              <v-btn
                :icon="selectedItem === 'shopping' ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
          <router-link to="/profile/buys">
            <v-list-item
              link
              prepend-icon="mdi-basket"
              title="Mis compras"
              value="shopping"
              @click="selectedItem = 'shopping'"
            >
              <template v-slot:append>
                <v-btn
                  :icon="selectedItem === 'shopping' ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </router-link>
          <v-list-item
            link
            class="text-black hover:bg-red-300 py-3 transition-all duration-100"
            prepend-icon="mdi-logout"
            title="Cerrar sesión"
            value="logout"
            @click="
              () => {
                logOut()
              }
            "
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<style scoped>
.drawer {
  z-index: 0 !important;
}
</style>
