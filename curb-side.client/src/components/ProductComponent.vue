<template>
  <div class="product-component bg-white hover-topleft round my-3 col-md-5 col-sm-12 elevation-5">
    <div class="row pc-row h-100 pointer" @click="productPage">
      <div class="col-8 col-lg-9 h-100">
        <div class="row px-3 mt-1 mb-3 h-25 justify-content-between">
          <p class="f-14 product-name w-75">
            {{ p.name }}
          </p>
          <p class="f-14 product-price">
            ${{ p.price.toFixed(2) }}
          </p>
        </div>
        <div class="row px-3 f-14 h-75">
          <p> {{ p.description.length > 100 ? p.description.slice(0,100)+'...' : p.description }}</p>
        </div>
      </div>
      <div class="col-4 col-lg-3 product-img round square-left" :style="`background-image: url(${p.img})`">
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'ProductComponent',
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
    min-height: 140px;

    }
    .pc-row{
         flex-wrap: nowrap;
    }
    .product-img{
        background-position:center ;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 140px;
    }
p {overflow: hidden;}
.product-price {
  position: absolute;
  top: 4hpx;
  right: 8px;
}

  </style>
