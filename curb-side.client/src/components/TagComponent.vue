<template>
  <div class="tag mx-2 mt-2">
    <p>{{ tag }}</p>
  </div>
</template>

<script>
export default {
  name: 'TagComponent',
  props: {
    tag: {
      type: String,
      required: true
    }
  }

}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.tag {
  background: $info;
  border-radius: 20px;
  width: fit-content;
}
p {
  margin-bottom: 2px;
  padding: 5px !important;
  font-weight: 500;
}
</style>
