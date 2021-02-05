<template>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
export default {
  name: 'OrderItemComponent',
  props: {
    itemProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      items: {}
    })
    onMounted(async() => {
      try {
        const item = await productsService.getItems(props.productId)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
