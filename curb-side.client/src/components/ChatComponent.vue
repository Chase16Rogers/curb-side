<template>
  <div class="container-fluid">
    <div class="row bg-primary">
      <div class="col">
        <h3>{{ state.business.name }}</h3>
      </div>
    </div>
    <message-component v-for="message in chatProp.content" :key="message._id" :message-prop="{message: message, logo: state.business.logo}" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { socketService } from '../services/SocketService'
export default {
  name: 'ChatComponent',
  props: {
    chatProp: { type: Object, required: true }
  },
  setup() {
    onMounted(() => {
      socketService.emit('update:message', 'general')
    })
    const state = reactive({
      chat: computed(() => AppState.chat),
      business: computed(() => AppState.activeBusiness)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
