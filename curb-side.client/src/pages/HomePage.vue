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
          CurbSyde
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
              class="elevation-4 px-2 py-1 hover-topleft"
              placeholder="Enter Current Address..."
              type="text"
            />
          </div>
          <div class="col-6 col-md-3 d-flex justify-content-center ">
            <button
              type="button"
              @click="search"
              class="btn btn-primary px-4 shop-button elevation-4 hover-topleft"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row h-50 bottom-row align-items-end justify-content-center">
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
  .shop-button {
    margin-top: 10px;
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
.zoom {
  transition: transform .35s; /* Animation */
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.08); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

</style>
