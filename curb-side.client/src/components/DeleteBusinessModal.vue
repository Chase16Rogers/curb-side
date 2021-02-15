<template>
  <!-- Modal -->
  <div class="modal fade" id="deleteBusiness" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mb-5">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Are you sure you want to delete this Business?
          </h5>
        </div>

        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary mr-5" data-dismiss="modal">
            Nevermind
          </button>
          <button type="button" @click="deleteBusiness()" class="btn btn-primary">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { useRoute, useRouter } from 'vue-router'
import { businessService } from '../services/BusinessService'
export default {
  name: 'DeleteBusinessModal',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({

    })
    return {
      state,
      async deleteBusiness() {
        try {
          $('#deleteBusiness').modal('hide')
          router.push({ name: 'Account' })
          // AppState.spin = true
          await businessService.deleteBusiness(route.params.id)
          // eslint-disable-next-line no-undef
          swal('Business Deleted', 'Your business is no longer here with us!!', 'error')
          // AppState.spin = false
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
