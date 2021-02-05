<template>
  <div class="row">
    <div class="col-6">
      <p>Order Recieved:</p>
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

<style>

</style>
