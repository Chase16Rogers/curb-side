<template>
  <div class="container-fluid p-3">
    <form class="form-inline" @submit.prevent="createBusiness">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 d-flex justify-content-center">
                <h3 class="">
                  Tell us a bit about your business!
                </h3>
              </div>
              <div class="col-12 d-flex justify-content-center">
                <input
                  class="form-control border-0 mb-2"
                  type="text"
                  name="name"
                  placeholder="Business Name"
                  required
                  v-model="state.newBusiness.name"
                />
              </div>

              <div class="col-12 d-flex justify-content-center">
                <input
                  class="form-control border-0 mb-2"
                  type="text"
                  name="tags"
                  placeholder="Tags"
                  v-model="state.newBusiness.tags"
                />
              </div>

              <div class="col-12 d-flex justify-content-center">
                <input
                  class="form-control border-0 mb-2"
                  type="text"
                  name="img"
                  placeholder="Image-url for your business logo"
                  v-model="state.newBusiness.logo"
                />
              </div>

              <div class="col-12 d-flex justify-content-center">
                <input
                  class="form-control border-0 mb-2"
                  type="text"
                  name="address"
                  placeholder="What's your business's address"
                  required
                  v-model="state.newBusiness.address"
                />
              </div>

              <!-- <div class="row align-self-center my-5"> -->
              <div class="col-12 d-flex justify-content-center">
                <button class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 d-sm-none d-md-block ">
          <div class="trust-us"></div>
        </div>
      </div>
    </form>
  </div>
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
      newBusiness: {}

    })
    return {
      state,
      async createBusiness() {
        try {
          await businessService.createBusiness(state.newBusiness)
          router.push({ name: 'MyBusinesses' })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.zoom {

  transition: transform .8s; /* Animation */

  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.3); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
@media only screen and (min-width: 600px) {
 input.border-0{
  width: 80%;
}
  .trust-us{
    background-image: url('http://www.clker.com/cliparts/A/3/x/H/9/K/green-swirl-hi.png');
    width: 50vw;
    right: 0;
    bottom: 72px;
    top: 118.892px;
    position: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  }

</style>
