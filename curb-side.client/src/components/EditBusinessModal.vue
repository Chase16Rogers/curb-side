<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade" id="editBusiness" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit Business
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="form-inline" @submit.prevent="editBusiness">
            <div class="container-fluid d-flex flex-column p-3">
              <div class="row mb-5">
                <div class="col-sm">
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="name"
                    placeholder="Business Name"
                    v-model="state.newBusiness.name"
                  />
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="tags"
                    placeholder="Tags"
                    v-model="state.newBusiness.tags"
                  />
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="img"
                    placeholder="Image-url for your business logo"
                    v-model="state.newBusiness.logo"
                  />
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="address"
                    placeholder="What's your business's address"
                    v-model="state.newBusiness.location"
                  />
                </div>
              </div>
              <div class="row align-self-center my-5">
                <div class="col">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { businessService } from '../services/BusinessService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'EditBusinessModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      newBusiness: {}
    })
    return {
      state,
      async editBusiness() {
        try {
          $('#editBusiness').modal('hide')
          await businessService.editBusiness(route.params.id, state.newBusiness)
          state.newBusiness = {}
          // eslint-disable-next-line no-undef
          swal('Edited Business', 'Congratulation on editing your business successfully', 'success')
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
