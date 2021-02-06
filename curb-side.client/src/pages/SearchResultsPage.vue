<template>
  <div class="container-fluid">
    <div class="row lines">
      <div class="col-sm mb-4">
        <h3>Search Results</h3>
      </div>
    </div>
    <business-component
      v-for="buiz in state.buiz"
      :key="buiz.id"
      :link="'BusinessDetails'"
      :buiz-prop="buiz"
    />
  </div>
</template>

<script>
// import { useRoute } from 'vue-router'
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { searchService } from '../services/SearchService'
export default {
  setup() {
    const state = reactive({
      buiz: computed(() => AppState.businesses)
    })
    // const route = useRoute()
    // const query = route.params.query
    onMounted(async () => {
      // NOTE Google data will eventually be here 
      try {
        await searchService.getAll()
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
