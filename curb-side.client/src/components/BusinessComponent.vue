<template>
  <div class="row lines">
    <div class="col-4 p-0">
      <img class="img-fluid" :src="buizProp.logo">
    </div>
    <div class="col-8">
      <p class="p-2 m-0">
        {{ buizProp.name }}
      </p>
      <p class="px-2 m-0">
        {{ buizProp.tags }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessComponent',
  props: {
    buizProp: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
