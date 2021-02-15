<template>
  <!-- Modal -->
  <div class="modal fade" :id="'id' + completeProp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mb-5">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Are you sure you want to mark this order as completed?
          </h5>
        </div>

        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary mr-5" data-dismiss="modal">
            Nevermind
          </button>
          <button type="button" @click="completedOrder()" class="btn btn-primary">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { AppState } from '../AppState'
import { orderService } from '../services/OrderService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { socketService } from '../services/SocketService'
export default {
  name: 'CompleteOrderModal',
  props: {
    completeProp: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({

    })
    return {
      state,
      async completedOrder() {
        try {
          $('#id' + props.completeProp).modal('hide')
          AppState.spin = true
          await orderService.editOrder(props.completeProp, { status: 'completed' })
          socketService.emit('leave:room', props.completeProp._id)
          // eslint-disable-next-line no-undef
          swal('Order Completed', 'Congratulation on completing the order. Finally YOU did it!!', 'success')
          AppState.spin = false
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style>
imageUrl{
  height: 50px;
  width: 50px;
}
</style>
