<template>
  <div class="checkout-item-component row justify-content-center" :class="{'bg-info-light': index % 2 == 0, 'bg-info': index % 2 == 1 }">
    <div class="col-6 py-2">
      <div class="row px-4">
        <h5>
          {{ p.name }}
        </h5>
      </div>
      <div class="row qty">
        <p1>Qty: {{ p.quantity }}</p1>
      </div>
    </div>
    <div class="col-4 justify-content-end text-muted d-flex align-items-center">
      <h5>${{ (p.quantity * p.price).toFixed(2) }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutItemComponent',
  props: {
    p: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
.bg-info-light {
  background-color: $info-light ;
}
.qty {
  padding-left: 50px;
}
</style>
