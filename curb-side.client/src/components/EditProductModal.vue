<template>
  <!-- Modal -->
  <div class="modal fade" :id="'id'+ editProductProp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form class="form-inline" @submit.prevent="editProduct">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Edit this product!
            </h5>
          </div>
          <div class="modal-body container-fluid">
            <div class="row">
              <div class="col-12">
                <input
                  class="form-control border-0 mb-2"
                  type="text"
                  name="name"
                  maxlength="20"
                  placeholder="Product Name..."
                  v-model="state.product.name"
                />
              </div>
              <div class="col-12">
                <input
                  class="form-control border-0 mb-2"
                  type="number"
                  name="name"
                  placeholder="Price"
                  v-model="state.product.price"
                />
              </div>
              <div class="col-12">
                <input
                  class="form-control border-0 mb-2"
                  type="text"
                  name="name"
                  placeholder="Description..."
                  v-model="state.product.description"
                />
              </div>
              <div class="col-12">
                <input
                  class="form-control border-0 mb-2"
                  type="text"
                  name="name"
                  placeholder="Img URL... (optional)"
                  v-model="state.product.img"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { productsService } from '../services/ProductsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'EditProductModal',
  props: {
    editProductProp: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      product: {}
    })
    return {
      state,
      async editProduct() {
        try {
          $('#id' + props.editProductProp).modal('hide')
          state.product.businessId = route.params.id
          await productsService.editProduct(props.editProductProp, state.product)
          state.product = {}
          // eslint-disable-next-line no-undef
          swal('Edited Product', 'Congratulations on successfully editing your product!! ', 'success')
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
