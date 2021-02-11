<template>
  <div class="cart-product-component row border-bottom">
    <div class="col-12">
      <div class="row justify-content-center pc-row h-100" @click="productPage">
        <div class="col-3 product-img-col d-flex align-items-center">
          <div class="product-img w-100 " :style="`background-image: url(${p.img})`"></div>
        </div>
        <div class="col-md-6 col-7 h-100">
          <div class="row px-3 mt-1 mb-3 h-25 justify-content-between">
            <p class="f-14 product-name w-75">
              {{ p.name }}
            </p>
            <p class="f-14 product-price text-muted">
              ${{ (p.quantity * p.price).toFixed(2) }}
            </p>
          </div>
          <div class="row px-3 f-14 h-75" v-if="p.instructions">
            <p> {{ p.instructions.length > 80 ? p.instructions.slice(0,80)+'...' : p.instructions }}</p>
          </div>
        </div>
        <div class="col-md-3 col-4">
          <div class="row flex-lg-nowrap flex-wrap quantity-row align-items-center justify-content-center">
            <i @click="changeQuantity(-1)" v-if="changeQty" class="pointer rl fa fa-caret-left arr f-l mr-2"></i>
            <div class="d-flex align-items-center circle  bg-primary text-dark justify-content-center">
              {{ p.quantity }}
            </div>
            <i @click="changeQuantity(1)" v-if="changeQty" class="pointer rr fa fa-caret-right arr f-l ml-2"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { cartService } from '../services/CartService'

export default {
  name: 'CartProductComponent',
  props: {
    p: {
      type: Object,
      required: true
    },
    bool: {
      type: Boolean,
      default: false
    },
    changeQty: {
      type: Boolean,
      default: true
    }

  },
  setup(props) {
    const router = useRouter()
    return {
      productPage() {
        if (props.bool) {
          router.push({ name: 'ProductPage', params: { id: props.p.id } })
        }
      },
      changeQuantity(amt) {
        cartService.changeQuantity(props.p, amt)
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
    min-height: 90px;

    }
    .pc-row{
         flex-wrap: nowrap;
    }
    .product-img{
        background-position:center ;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 90px;
        border-radius: 10px;
        height: 50%;
    }
p {overflow: hidden;}
.product-price {
  position: absolute;
  top: 4px;
  right: 8px;
}
.circle {
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 50%;
  height: 30px;
  width: 30px;
}
.f-l{
  font-size: 2.5rem;
}

@media only screen and (max-width: 600px) {
  .quantity-row{
    flex-direction: column-reverse;
  }
  .rl{
    transform: rotateZ(-90deg) !important;
    margin: 0px !important;

  }
  .rr{
    transform: rotateZ(-90deg) !important;
    margin: 0px !important;
  }
  .product-img-col{
    display: none !important;
  }
}
  </style>
