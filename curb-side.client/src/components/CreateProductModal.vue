<template>
  <!-- Modal -->
  <div class="modal fade" id="createProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form class="form-inline" @submit.prevent="createProduct">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Add a product to your catalogue!
            </h5>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="name"
                    maxlength="20"
                    placeholder="Product Name..."
                    required
                    v-model="state.product.name"
                  />
                </div>
                <div class="col-12">
                  <input
                    class="form-control border-0 mb-2"
                    type="number"
                    name="name"
                    placeholder="Price"
                    required
                    v-model="state.product.price"
                  />
                </div>
                <div class="col-12">
                  <input
                    class="form-control border-0 mb-2"
                    type="text"
                    name="name"
                    placeholder="Description..."
                    required
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
  name: 'CreateProductModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      product: {}
    })
    return {
      state,
      async createProduct() {
        try {
          $('#createProduct').modal('hide')
          state.product.businessId = route.params.id
          await productsService.createProduct(state.product)
          state.product = {}
          // eslint-disable-next-line no-undef
          swal('Product Created', 'Your product is created, Congratulations', 'success')
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
