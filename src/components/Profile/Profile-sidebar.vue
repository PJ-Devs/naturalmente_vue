<script setup lang="ts">
import { ref } from 'vue'
import { VApp, VMain, VNavigationDrawer, VListItem, VDivider, VBtn } from 'vuetify/components'
import { useAuthUserStore } from '@/stores/authUser'

const useAuthUser = useAuthUserStore()
console.log(useAuthUser.authUser)

let selectedItem = ref('')
let drawer = ref(false)
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
          :title="`Bienvenido devuelta, ${useAuthUser.authUser?.name}`"
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
          <router-link to="/profile/changePassword">
            <v-list-item
              link
              prepend-icon="mdi-lock"
              title="Configurar mi cuenta"
              value="changePassword"
              @click="selectedItem = 'changePassword'"
            >
              <template v-slot:append>
                <v-btn
                  :icon="
                    selectedItem === 'changePassword' ? 'mdi-chevron-right' : 'mdi-chevron-left'
                  "
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </router-link>
          <v-list-item
            link
            prepend-icon="mdi-map-marker"
            title="Direcciones"
            value="addresses"
            @click="selectedItem = 'addresses'"
          >
            <template v-slot:append>
              <v-btn
                :icon="selectedItem === 'addresses' ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
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
          <v-list-item
            link
            class="text-black hover:bg-red-300 py-3 transition-all duration-100"
            prepend-icon="mdi-logout"
            title="Cerrar sesión"
            value="logout"
            @click="selectedItem = 'logout'"
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
