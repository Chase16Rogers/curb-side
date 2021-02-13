<template>
  <div
<<<<<<< HEAD
    class="row my-4 elevation-3 round hover-el-5 business-component bg-white hover-topleft justify-content-between pointer"
    @click="pushTo()"
=======
    class="row py-3 pl-3 lines justify-content-between pointer"
    :class="state.color"
    @click="businessManager()"
>>>>>>> d440d577e6ad0dee89c4c1d59dad38c8fd632bb2
  >
    <div class="col-2 p-0">
      <img class="img-fluid square-right round" :src="buizProp.logo" />
    </div>
    <div class="col-9">
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
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
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
      color: ''
    })
    onMounted(() => {
      const index = AppState.businesses.findIndex(o => o._id === props.buizProp._id)
      if (index % 2 === 0) {
        state.color = 'white'
      } else {
        state.color = 'green'
      }
    })
    return {
      state,
      pushTo() {
        router.push({ name: props.link, params: { id: props.buizProp.id } })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../assets/scss/_variables.scss';
.tags {
  width: fit-content;
}

.names {
  font-weight: 500;
  font-size: 1.2rem;
}
.business-component{

}
</style>
