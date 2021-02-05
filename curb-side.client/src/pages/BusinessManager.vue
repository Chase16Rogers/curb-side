<template>
  <div class="container-fluid">
    <div class="row my-2 mb-3">
      <div class="col">
        <h3>Business Manager</h3>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-3">
        <img class="img-fluid" :src="state.business.logo" alt="Oops">
      </div>
      <div class="col-9 d-flex align-items-center">
        <p class="mb-0">
          {{ state.business.name }}
        </p>
      </div>
    </div>
    <div class="row mb-3 px-3">
      <div class="col dark-lines">
        <h4>Active Orders</h4>
      </div>
    </div>
    <div class="row mb-3 px-3">
      <div class="col dark-lines">
        <h4>View Catalogue</h4>
      </div>
    </div>
    <div class="row mb-3 px-3">
      <div class="col dark-lines">
        <h4>View Archived Orders</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { businessService } from '../services/BusinessService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
// import { useRouter } from 'vue-router'
export default {
  name: 'BusinessManager',
  setup() {
    // const router = useRouter()
    const route = useRoute()
    const state = reactive({
      business: computed(() => AppState.activeBusiness)
    })
    onMounted(async() => {
      try {
        await businessService.getOneBusiness(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state

    }
  }
}
</script>

<style>

</style>
