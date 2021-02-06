<template>
  <div class="container-fluid">
    <div class="row lines">
      <div class="col-sm mb-4">
        <h3>My Businesses</h3>
      </div>
    </div>
    <business-component
      v-for="buiz in state.buiz"
      :key="buiz.id"
      :link="'BusinessManager'"
      :buiz-prop="buiz"
    />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import BusinessComponent from '../components/BusinessComponent.vue'
import { AppState } from '../AppState'
import { businessService } from '../services/BusinessService'
import { logger } from '../utils/Logger'
export default {
  components: { BusinessComponent },
  setup() {
    const state = reactive({
      buiz: computed(() => AppState.myBusinesses)
    })
    onMounted(async () => {
      try {
        await businessService.getMyBusiness()
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
