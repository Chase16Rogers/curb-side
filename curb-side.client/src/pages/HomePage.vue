<template>
  <div class="home container-fluid">
    <div class="row mobile-header h-25 justify-content-start">
      <div class="hexagon align-items-center row ml-3 d-none">
        <h1 class="big-c col text-center text-white">
          C
        </h1>
      </div>
      <div
        class="col-8 title-div align-items-center justify-content-center d-none"
      >
        <h1 class="title-text text-muted">
          Curb-Side
        </h1>
      </div>
    </div>
    <div
      id="search-form"
      class="row search-row h-25 align-items-end justify-content-center"
    >
      <div class="col-8">
        <div class="row justify-content-center">
          <div class=" col-xs-10 col-md-6">
            <input
              v-model="state.search"
              class="elevation-4"
              placeholder="Enter Address"
              type="text"
            />
          </div>
          <div class="col-6 col-md-3 d-flex justify-content-center ">
            <button
              type="button"
              @click="search"
              class="btn btn-primary px-4 shop-button elevation-4"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row h-50 bottom-row align-items-end justify-content-center">
      <div class="col-xs-4 mb-3 col-md-3 offset-xs-3 offset-md-9">
        <button class="btn btn-outline-dark elevation-3 register-btn" @click="createBusiness()">
          Register your business with us!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { googleMapsService } from '../services/GoogleMapsService'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',

  setup() {
    const state = {
      search: ''
    }
    const router = useRouter()

    return {
      state,
      async search() {
        try {
          debugger
          await googleMapsService.findNearMe(state.search)
        } catch (error) {
          logger.error(error)
        }
        router.push({ name: 'SearchResults' })
      },
      createBusiness() {
        router.push({ name: 'CreateBusiness' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.home {
  flex: 3;
  // display: flex;
  align-items: stretch;
  // flex-flow: column;
  overflow: auto;
  position: relative;
  align-content: space-between;
}
.bottom-row {
  // align-self: flex-end;
  justify-self: flex-end;
}
.hexagon {
  height: 100px;
  width: 100px;
}
.big-c {
  font-size: 4rem;
  font-weight: 400;
}
@media only screen and (max-width: 600px) {
  .mobile-header {
    display: flex !important;
    flex-wrap: nowrap;
  }
  .hexagon {
    display: flex !important;
  }
  .title-div {
    display: flex !important;
    height: 100px;
  }
}
input {
  border-radius: 8px;
  width: 100% !important;
  border: 3px solid $primary;
}
input:focus {
  outline: none;
  width: 100% !important;
}
form {
  width: 100%;
  // margin-top: 180px;
}
.register-btn {
  font-weight: 600;
}
</style>
