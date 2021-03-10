<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade" id="editBusiness" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit Business
          </h5>
        </div>
        <div class="modal-body">
          <form class="form-inline" @submit.prevent="editBusiness">
            <div class="container-fluid d-flex flex-column p-3">
              <div class="row mb-5">
                <div class="col-12">
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="name"
                    placeholder="Business Name"
                    v-model="state.newBusiness.name"
                  />
                </div>
                <div class="col-12">
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="tags"
                    placeholder="Tags"
                    v-model="state.newBusiness.tags"
                  />
                </div>
                <div class="col-12">
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="img"
                    placeholder="Image-url for your business logo"
                    v-model="state.newBusiness.logo"
                  />
                </div>
                <div class="col-12">
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="address"
                    placeholder="What's your business's address"
                    v-model="state.newBusiness.address"
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
import { computed, onMounted, reactive } from 'vue'
import { businessService } from '../services/BusinessService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
export default {
  name: 'EditBusinessModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      newBusiness: {},
      thisBusiness: computed(() => AppState.activeBusiness)
    })
    onMounted(() => {
      state.newBusiness = state.thisBusiness
    })
    return {
      state,
      async editBusiness() {
        try {
          $('#editBusiness').modal('hide')
          await businessService.editBusiness(route.params.id, state.newBusiness)
          state.newBusiness = {}
          // eslint-disable-next-line no-undef
          swal('Edited Business', 'Business edited.', 'success')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
input.border-0{
  width: 100%;
}
</style>
