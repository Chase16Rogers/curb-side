<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9 d-flex">
        <p class="mr-1">
          {{ itemProp.quantity }}x
        </p>
        <p class="">
          {{ itemProp.product.name }}
        </p>
      </div>
      <div class="col-3">
        <p class="">
          ${{ itemProp.product.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
// import { logger } from '../utils/Logger'
export default {
  name: 'OrderItemComponent',
  props: {
    itemProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      items: {}
    })
    return {
      state
    }
  }
}
</script>

<style>
p{
  margin: 0;
  font-size: .8em;
}
</style>
