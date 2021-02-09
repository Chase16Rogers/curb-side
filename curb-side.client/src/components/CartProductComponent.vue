<template>
  <div class="cart-product-component col-12 my-2 elevation-5">
    <div class="row pc-row h-100" @click="productPage">
      <div class="col-4 product-img" :style="`background-image: url(${p.img})`">
      </div>
      <div class="col-6 h-100">
        <div class="row px-3 mt-1 mb-3 h-25 justify-content-between">
          <p class="f-14 product-name w-75">
            {{ p.name }}
          </p>
          <p class="f-14 product-price text-muted">
            ${{ p.price.toFixed(2) }}
          </p>
        </div>
        <div class="row px-3 f-14 h-75">
          <p> {{ p.description.length > 100 ? p.description.slice(0,100)+'...' : p.description }}</p>
        </div>
      </div>
      <div class="col-2">
        <div class="row flex-lg-nowrap flex-wrap quantity-row mt-3 align-items-center justify-content-center">
          <i @click="changeQuantity(-1)" class="pointer rl fa fa-caret-left f-l mr-2"></i>
          <div class="d-flex align-items-center circle  bg-primary text-dark justify-content-center">
            {{ p.quantity }}
          </div>
          <i @click="changeQuantity(1)" class="pointer rr fa fa-caret-right f-l ml-2"></i>
        </div>
        <div class="row text-center mt-4 justify-content-center">
          <p class="f-14 text-muted text-center">
            ${{ (p.quantity * p.price).toFixed(2) }}
          </p>
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
.circle {
  font-size: 2rem;
  font-weight: 500;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
.f-l{
  font-size: 3rem;
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
}
  </style>
