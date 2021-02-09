<template>
  <div class="col-12 d-flex justify-content-end mb-1">
    <i class="fa fa-pencil fa-2x mr-2" aria-hidden="true" data-toggle="modal" :data-target="'#id'+ p.id"></i>
    <edit-product-modal :edit-product-prop="p.id" />
    <i class="fa fa-trash fa-2x" aria-hidden="true" data-toggle="modal" :data-target="'#canid'+ p.id"></i>
    <confirm-delete-modal :delete-prop="p.id" />
  </div>
  <div class="product-component mb-3 col-md-5 col-sm-12 elevation-5">
    <div class="row pc-row h-100 pointer">
      <div class="col-8 col-lg-9 h-100">
        <div class="row px-3 mt-1 h-25 justify-content-between">
          <p class="f-14 product-name">
            {{ p.name }}
          </p>
          <p class="f-14 product-price">
            ${{ p.price.toFixed(2) }}
          </p>
        </div>
        <div class="row px-3 f-14 h-75">
          <p>{{ p.description }}</p>
        </div>
      </div>
      <div class="col-4 col-lg-3 product-img" :style="`background-image: url(${p.img})`">
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'

export default {
  components: { ConfirmDeleteModal },
  name: 'EditProductComponent',
  props: {
    p: {
      type: Object,
      required: true
    },
    bool: {
      type: Boolean,
      default: false
    }

  },
  setup(props) {
    const router = useRouter()
    return {
      productPage() {
        if (props.bool) {
          router.push({ name: 'ProductPage', params: { id: props.p.id } })
        }
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
    @import '../assets/scss/_variables.scss';

    .product-name {
    font-weight: 500;
    }

    .small-text-shadow {
    text-shadow: 1px 1px 0 $dark,  -1px 1px 0 $dark,  1px -1px 0 $dark,  -1px -1px 0 $dark;
    }
    .product-component{
    height: 100px;

    }
    .pc-row{
         flex-wrap: nowrap;
    }
    .product-img{
        background-position:center ;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100px;
    }

  </style>
