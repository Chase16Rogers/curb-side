<template>
  <div class="store-front container-fluid">
    <div class="row">
      <div class="col-12 banner-img">
      </div>
    </div>
    <div class="row logo-row justify-content-end">
      <img class="logo mx-4" src="data:image/png;base64,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" alt="">
      <div class="col-3 align-self-end">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-sm-8 gutter-col offset-1 mr-4">
        <div class="row">
          <div class="col-7 pl-0">
            <p class="business-name f-18">
              {{ business.name }}
            </p>
          </div>
          <div class="col-5 d-flex justify-content-end">
            <i class="fa fa-pencil fa-2x" aria-hidden="true" data-toggle="modal" data-target="#editBusiness"></i>
            <edit-business-modal />
            <i class="fa fa-trash fa-2x" aria-hidden="true" data-toggle="modal" data-target="#deleteBusiness"></i>
            <delete-business-modal />
          </div>
        </div>
        <create-product-modal />

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
        <div class="row">
          <p class="text-primary f-16" data-toggle="modal" data-target="#createProduct">
            Add Item +
          </p>
        </div>
      </div>
      <div class="col-2">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-sm-10 gutter-col">
        <div class="row justify-content-around">
          <edit-product-component v-for="p in products" :key="p.id" :p="p" :bool="true" />
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
import EditProductComponent from '../components/EditProductComponent.vue'
import DeleteBusinessModal from '../components/DeleteBusinessModal.vue'

export default {
  components: { EditProductComponent, DeleteBusinessModal },
  name: 'StoreFront',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await businessService.getOneBusiness(route.params.id)
      await productsService.getProductsByBusiness(route.params.id)
    })
    return { business: computed(() => AppState.activeBusiness), products: computed(() => AppState.products) }
  }
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
