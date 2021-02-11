<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-xs-10 lines col-md-8">
        <h3>Search Results</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xs-10 col-md-8">
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
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { searchService } from '../services/SearchService'
// import { googleMapsService } from '../services/GoogleMapsService'
// import { useRoute } from 'vue-router'
export default {
  setup() {
    const state = reactive({
      buiz: computed(() => AppState.businesses)
    })
    // const route = useRoute()
    // const query = route.params.query
    onMounted(async() => {
      // NOTE Google data will eventually be here
      try {
        // await googleMapsService.findByDistance(route.params.search)
        await searchService.getAll()
        // debugger
      } catch (error) {
        console.log(error)
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
