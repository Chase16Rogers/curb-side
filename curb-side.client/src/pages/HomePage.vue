<template>
  <div
    class="home flex-grow-1 container-fluid align-items-center justify-content-center"
  >
    <div class="row mobile-header justify-content-start mt-3 d-none">
      <div class="hexagon align-items-center row ml-3">
        <h1 class="big-c col text-center text-white">C</h1>
      </div>
      <div class="col-8 d-flex align-items-center justify-content-center">
        <h1 class="title-text text-muted">Curb-Side</h1>
      </div>
    </div>
    <form id="search-form" class="row search-row justify-content-center">
      <div class="col-xs-10 col-md-8">
        <div class="col-6">
          <input class="elevation-4" placeholder="Enter Address" type="text" />
        </div>
        <div class="col-4">
          <button class="btn btn-primary elevation-4">Shop</button>
        </div>
      </div>
    </form>
    <div class="row"></div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.home {
  text-align: center;
  user-select: none;
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
}
input {
  border-radius: 8px;
  border: 3px solid $primary;
}
input:focus {
  outline: none;
  width: 100% !important;
}
form {
  width: 100%;
}
</style>
