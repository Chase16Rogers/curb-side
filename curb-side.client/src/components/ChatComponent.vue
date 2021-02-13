<template>
  <div class="chat col-12">
    <div class="row bg-primary">
      <div class="col-12">
        <h3>{{ state.business.name }}</h3>
      </div>
    </div>
    <transition name="slide" tag="div">
      <div class="col-12 d-flex chat-col of-hidden">
        <div :id="'id-'+chatProp._id" class="row w-100 mb-5 of-auto">
          <transition-group name="fade" tag="div" class="row mt-3">
            <message-component class="msg" v-for="message in chatProp.content" :key="message._id" :message-prop="{message: message, logo: state.business.logo}" />
          </transition-group>
        </div>
      </div>
    </transition>
    <div class="col-10 offset-1 d-flex justify-content-end chat-input ">
      <input class="border-0"
             type="text"
             v-model="state.message"
             placeholder="Send Message..."
      >
      <button @click="createMessage" type="button" class="btn btn-outline-primary">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { socketService } from '../services/SocketService'
import { chatService } from '../services/ChatService'
import $ from 'jquery'
export default {
  name: 'ChatComponent',
  watch: {
    'state.chat'(newChat, oldChat) {
      console.log('#id-' + newChat._id)
      const height = $('#id-' + newChat._id)[0].scrollHeight
      console.log(height)
      $('#id-' + newChat._id).animate({ scrollTop: height }, 500, 'swing')

      console.log($('#id-' + newChat._id).is(':visible'))
      const o = AppState.orders.find(o => o.id === newChat.orderId)
      if (o) { o.unreads = !$('#id-' + newChat._id).is(':visible') }
    }
  },
  props: {
    chatProp: { type: Object, required: true }
  },
  setup(props) {
    onMounted(async() => {
      await socketService.emit('update:message', props.chatProp.orderId)
    })
    const state = reactive({
      chat: computed(() => props.chatProp),
      business: computed(() => AppState.activeBusiness),
      message: ''

    })
    return {
      state,
      async createMessage() {
        try {
          await chatService.createMessage(props.chatProp._id, state.chat, state.message)

          state.message = ''
        } catch (error) {
          console.error(error)
        }
      }

    }
  }
}
</script>

<style>

.chat {
  height: 100%;
}

.of-auto {
  overflow-y:auto ;
  overflow-x: hidden;
}
.of-hidden {
  overflow-y: hidden;
  height: 80%;

}
.chat-input {
  transform: translateY(-30px);
}
input {
  width: 100%
}
.fade-enter-active,
.fade-leave-active {
  transition: all 500ms ease;
  transform: translateX(0px);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-80px);
   margin-bottom: 0px;
}

</style>
