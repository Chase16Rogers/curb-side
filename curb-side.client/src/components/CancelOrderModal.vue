<template>
  <!-- Modal -->
  <div class="modal fade" :id="'canid' + cancelProp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mb-5">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Are you sure you want to cancel this order?
          </h5>
        </div>

        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary mr-5" data-dismiss="modal">
            Nevermind
          </button>
          <button type="button" @click="cancelledOrder()" class="btn btn-primary">
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
  name: 'CancelOrderModal',
  props: {
    cancelProp: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({

    })
    return {
      state,
      async cancelledOrder() {
        try {
          $('#canid' + props.cancelProp).modal('hide')
          AppState.spin = true
          await orderService.editOrder(props.cancelProp, { status: 'cancelledByBusiness' })
          // AppState.orders = AppState.orders.filter(o => o.status === 'pending')
          socketService.emit('leave:room', props.cancelProp._id)
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

</style>
