<template>
  <div class="tag mr-3 mt-2 px-2 m-0">
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
    background: $info-light;
    border-radius: 5px;
    width: fit-content;
    }
    p {
    margin-bottom: 2px;
    padding: 5px !important;
    font-weight: 500;
    }
    </style>
