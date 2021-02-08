<template>
  <div class="row" :class="toggle(messageProp.message.senderId)">
    <!-- <div class="col-2 d-flex align-items-center" v-if="!state.right">
      <img class="img-fluid" :src="state.business.logo" alt="">
    </div> -->
    <div class="col-8">
      <div class="card">
        <div class="card-body">
          {{ messageProp.message.message }}
        </div>
      </div>
    </div>
    <div class="col-2 d-flex align-items-center" v-if="state.right">
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

<style>

</style>
