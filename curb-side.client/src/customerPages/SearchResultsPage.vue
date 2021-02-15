<template>
  <div class="container-fluid">
    <div class="row pt-5 justify-content-center">
      <div class="col-xs-10 col-md-8">
        <h5>Search Results for Your Location</h5>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xs-10 col-md-7">
        <business-component
          v-for="buiz in state.buiz"
          :key="buiz.id"
          :link="'StoreFront'"
          :buiz-prop="buiz"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
// import { googleMapsService } from '../services/GoogleMapsService'
// import { useRoute } from 'vue-router'
export default {
  setup() {
    const state = reactive({
      buiz: computed(() => AppState.businesses)
    })

    return {
      state
    }
  }

}
</script>

<style>
</style>
