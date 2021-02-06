<template>
  <div
    class="row py-3 pl-3 lines justify-content-between"
    @click="businessManager()"
  >
    <div class="col-4 p-0">
      <img class="img-fluid" :src="buizProp.logo" />
    </div>
    <div class="col-7">
      <div class="row">
        <p class="p-2 m-0 names">
          {{ buizProp.name }}
        </p>
      </div>
      <div class="row tags">
        <TagComponent
          v-for="tag in buizProp.tags"
          :key="tag"
          :tag="tag"
          class="px-2 m-0"
        />
      </div>
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
    },
    link: {
      type: String,
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
        router.push({ name: props.link, params: { id: props.buizProp.id } })
      }
    }
  }
}
</script>

<style scoped>
.tags {
  width: fit-content;
}
img {
  border-radius: 5px;
}
.names {
  font-weight: 500;
  font-size: 1.2rem;
}
</style>
