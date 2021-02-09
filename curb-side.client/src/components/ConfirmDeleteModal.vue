<template>
  <!-- Modal -->
  <div class="modal fade" :id="'canid' + deleteProp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mb-5">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Are you sure you want to delete this product?
          </h5>
        </div>

        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary mr-5" data-dismiss="modal">
            Nevermind
          </button>
          <button type="button" @click="deleteProduct()" class="btn btn-primary">
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
import { productsService } from '../services/ProductsService'
export default {
  name: 'ConfirmDeleteModal',
  props: {
    deleteProp: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({

    })
    return {
      state,
      async deleteProduct() {
        try {
          $('#canid' + props.deleteProp).modal('hide')
          // AppState.spin = true
          await productsService.deleteProduct(props.deleteProp)
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
