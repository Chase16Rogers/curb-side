<template>
  <div class="home container-fluid">
    <div class="row mobile-header justify-content-start mt-3 d-none">
      <div class="hexagon align-items-center row ml-3">
        <h1 class="big-c col text-center text-white">C</h1>
      </div>
      <div class="col-8 d-flex align-items-center justify-content-center">
        <h1 class="title-text text-muted">Curb-Side</h1>
      </div>
    </div>
    <form
      id="search-form"
      class="row search-row align-items-center justify-content-center"
    >
      <div class="col-8">
        <div class="row justify-content-center">
          <div class="mt-3 col-xs-10 col-md-6">
            <input
              v-model="state.query"
              class="elevation-4"
              placeholder="Enter Address"
              type="text"
            />
          </div>
          <div class="col-sm-6 col-md-3 mt-3">
            <button
              @click="search"
              class="btn btn-primary px-4 shop-button elevation-4"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </form>

    <div class="row bottom-row">
      <div class="col-xs-4 col-md-3 offset-xs-3 offset-md-9">
        <button class="btn btn-outline-dark elevation-3 register-btn">
          Register your business with us!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',

  setup() {
    const state = { query: '' }
    const router = useRouter()

    return {
      state,
      search() {
        router.push({ name: 'SearchResults', params: { query: state.query } })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.home {
  flex: 1;
  display: flex;
  align-items: stretch;
  flex-flow: column;
  overflow: auto;
}
.bottom-row {
  margin-top: 250px;
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
  .bottom-row {
    margin-top: 180px;
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
  margin-top: 180px;
}
.register-btn {
  font-weight: 600;
}
</style>
