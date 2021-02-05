<template>
  <form class="form-inline" @submit.prevent="createBusiness">
    <div class="container-fluid d-flex flex-column p-3">
      <div class="row mb-5">
        <div class="col-sm">
          <h3 class="">
            Tell us a bit about your business!
          </h3>
          <input class="form-control border-0 mb-2 "
                 type="text"
                 name="name"
                 placeholder="Business Name"
                 required
                 v-model="state.newName.name"
          >
          <input class="form-control border-0 mb-2" type="text" name="tags" placeholder="Tags" v-model="state.newName.tag">
          <input class="form-control border-0 mb-2"
                 type="text"
                 name="img"
                 placeholder="Image-url for your business logo"
                 v-model="state.newName.logo"
          >
          <input class="form-control border-0 mb-2"
                 type="text"
                 name="address"
                 placeholder="What's your business's address"
                 required
                 v-model="state.newName.location"
          >
        </div>
      </div>
      <div class="row align-self-center my-5">
        <div class="col">
          <button class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { businessService } from '../services/BusinessService'
import { useRouter } from 'vue-router'
export default {
  name: 'CreateBusiness',
  setup() {
    const router = useRouter()
    const state = reactive({
      newName: {}

    })
    return {
      state,
      async createBusiness() {
        try {
          router.push({ name: 'MyBusiness' })
          await businessService.createBusiness(state.newName)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style>

</style>
