<template>
  <div class="row lines" @click="businessManager()">
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'BusinessComponent',
  props: {
    buizProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({

    })
    return {
      state,
      businessManager() {
        router.push({ name: 'BusinessManager', params: { id: props.buizProp.id } })
      }
    }
  }
}
</script>

<style>

</style>
