<template>
  <div class="car-colors-component">
    <div class="square mx-2 my-2 rounded border-dark pointer" :class=" {selected: color.isSelected}" :style="{backgroundColor: color.color}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarColorsComponent',
  props: {
    color: {
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
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.square{
    height: 40px;
    width: 40px;
    border-radius: 10px;
    border: 1px solid black;

}
.selected{
    filter: drop-shadow(1px 1px 5px black);
}
.car-colors-component {
  flex-basis: 20% !important;
}

</style>
