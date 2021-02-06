<template>
  <div class="row lines p-3">
    <div class="col-6 p-0">
      <p>Order Recieved:</p>
      <order-item-component v-for="item in orderProp.contents" :key="item._id" :item-prop="item" />
    </div>
    <div class="col-6">
      <p>WE NEED A WAY TO TELL IF COSTUMER IS AT LOCATION! ON SERVER MODEL</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderComponent',
  props: {
    orderProp: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
p{
  margin-bottom: 0;
}
</style>
