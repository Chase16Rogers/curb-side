<template>
  <div class="container p-3">
    <div class="row elevation-1 bg-white body">
      <div class="col-12 pointer py-3  px-3 dark-lines" @click="myOrders()">
        <h4>My Orders</h4>
      </div>
      <div class="col-12 pointer py-3  px-3 dark-lines" @click="createBusinessPage()">
        <h4>Register New Business</h4>
      </div>
      <div class="col-12 pointer py-3  px-3 dark-lines" @click="myBusiness()">
        <h4>My Businesses</h4>
      </div>
      <div class="col-12 pointer py-3 px-3 text-warning" @click="logout()">
        <h4>Logout</h4>
      </div>
      <!-- <div class="col-12 pointer py-3  px-3 dark-lines" @click="">
        <h4>Help</h4>
      </div>
      <div class="col-12 pointer py-3  px-3 dark-lines" @click="">
        <h4>My Favorite Shops</h4>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
import { AuthService } from '../services/AuthService'
export default {
  name: 'Account',
  setup() {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      myBusiness() {
        router.push({ name: 'MyBusinesses' })
      },
      createBusinessPage() {
        router.push({ name: 'RegisterBusinessPage' })
      },
      myOrders() {
        router.push({ name: 'MyOrdersPage', params: { id: AppState.account._id } })
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped lang="scss">
img {
  max-width: 100px;
}
.body {
  border-radius: 10px;
}
</style>
