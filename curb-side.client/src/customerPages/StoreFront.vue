<template>
  <div class="store-front container-fluid">
    <div class="row">
      <div class="col-12 banner-img">
      </div>
    </div>
    <div class="row logo-row justify-content-end">
      <img class="logo mx-4" :src="business.logo" alt="">
    </div>
    <div class="row justify-content-center">
      <div class="col-sm-10 gutter-col offset-1 mr-4">
        <div class="row">
          <p class="business-name f-18">
            {{ business.name }}
          </p>
        </div>
        <div class="row tags">
          <tag-component v-for="tag in business.tags" :key="tag.name" :tag="tag" />
        </div>
        <div class="row">
          <p class="f-16">
            {{ business.address }}
          </p>
        </div>
        <div class="row">
          <p class="f-16">
            placeholder
          </p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-sm-10 gutter-col">
        <div class="row justify-content-around">
          <product-component v-for="p in products" :key="p.id" :p="p" :bool="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { businessService } from '../services/BusinessService'
import { AppState } from '../AppState'
import { productsService } from '../services/ProductsService'
export default {
  name: 'StoreFront',
  setup() {
    onMounted(async() => {
      const route = useRoute()
      await businessService.getOneBusiness(route.params.id)
      await productsService.getProductsByBusiness(route.params.id)
    })
    return { business: computed(() => AppState.activeBusiness), products: computed(() => AppState.products) }
  },
  components: { }
}
</script>

<style lang="scss" scoped>
.banner-img {
    background-image: url('https://www.mrgoglass.com/wp-content/uploads/2019/06/buildings-city-cityscape-210557-1-1024x412.jpg');
    background-position:bottom ;
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
}
.logo{
    border-radius: 8px;
    height: 130px;
    width: 130px;
    transform: translateY(-70px);
}
@media only screen and (max-width: 600px) {
.logo-row {
    justify-content: start !important;
    margin-top: 15px;
}
.gutter-col {
    margin-right: 25px;
    margin-left: 25px;
    margin-top: 15px;
}

}
.logo-row {
    height: 60px;
}
.business-name {
    font-weight: 650;
}
.tags {
  width: fit-content;
}
</style>
