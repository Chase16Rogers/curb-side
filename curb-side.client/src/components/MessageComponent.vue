<template>
  <div class="col-12 my-2" :class="toggle(messageProp.message.senderId)">
    <!-- <div class="col-2 d-flex align-items-center" v-if="!state.right">
      <img class="img-fluid" :src="state.business.logo" alt="">
    </div> -->
    <div class="w-fc msg px-3 py-2" :class="[ state.right ? 'bg-primary text-white': 'bg-info-light text-dark']">
      <div class="msg-txt">
        {{ messageProp.message.message }}
      </div>
    </div>
    <div class="col-2 d-flex align-items-center" v-if="state.left">
      <img class="img-fluid" :src="state.business.logo" alt="">
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'MessageComponent',
  props: {
    messageProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      business: computed(() => AppState.activeBusiness),
      right: true
    })
    return {
      state,
      toggle(id) {
        if (id === AppState.account._id) {
          state.right = true
          return 'justify-content-end'
        } else {
          state.right = false
          return 'justify-content-start'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.bg-info-light {
  background-color: $info-light;
}
.msg {
  border-radius: 15px;
}
.w-fc {
  width: fit-content !important;
}
.msg-txt {
  font-size: 1.2rem;
}
</style>
