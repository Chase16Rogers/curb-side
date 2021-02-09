<template>
  <div class="productPage container-fluid">
    <div class="row h-100 prod-home justify-content-between ">
      <div class="col-md-5 offset-1 col-10 prod-info">
        <div class="row mt-4 align-items-center justify-content-around">
          <div class="col-4 logo-img"
               :style="`background-image: url(${state.logo})`"
          >
          </div>
          <div class="col-7 pt-3">
            <div class="fc">
              <p class="prod-name">
                {{ state.product.name }}
              </p>
              <p class="f-20 text-right" v-if="state.product.name">
                ${{ state.product.price.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col bg-white rounded elevation-1">
            <p class="p-2 f-12">
              {{ state.product.description }}
            </p>
          </div>
        </div>
        <div class="row text-home justify-content-end pt-5">
          <div class="col-10">
            <div class="row">
              <textarea name="metaData" id="metaData" class="w-100 input-field rounded" v-model="state.product.instructions" placeholder="Special Instructions?"></textarea>
            </div>
            <div class="row btn-home justify-content-end mt-3">
              <button class="btn btn-primary text-white mb-4 " @click="orderItem">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-12 prod-image" :style="`background-image: url(${state.product.img})`">
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { productsService } from '../services/ProductsService'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { businessService } from '../services/BusinessService'
import { cartService } from '../services/CartService'

export default {
  name: 'ProductPage',

  setup() {
    const state = reactive({ product: computed(() => AppState.activeProduct), logo: computed(() => AppState.activeBusiness ? AppState.activeBusiness.logo : '') })
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      await productsService.getProductById(route.params.id)
      console.log(state)
      await businessService.getOneBusiness(state.product.businessId)
    })
    return {
      state,
      orderItem() {
        if (cartService.addToCart(state.product)) {
          router.push({ name: 'StoreFront', params: { id: state.product.businessId } })
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.logo-img{
    background-position:bottom ;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 120px !important;
    min-width: 120px !important;
    border-radius: 8px;
}
.prod-name{
    font-weight: 500;
    font-size: 2.5rem;

}
.fc {
    width: fit-content;
}
.input-field{
    height: 90px;
}
.prod-image{
    background-position:center ;
    background-repeat: no-repeat;
    background-size: cover;
    height: 79vh;
}
@media only screen and (max-width: 600px){
    .prod-image{
        order: 1 !important;
        height: 30vh !important
    }
    .prod-info{
        order: 2 !important;
    }
    .btn-home{
        justify-content: center !important;
    }
    .text-home{
        justify-content: center !important;
    }
}
</style>
