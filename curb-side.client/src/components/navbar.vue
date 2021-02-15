<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark row">
    <div class="button-div navbar row d-none justify-content-end">
      <router-link class="" :to="{ name: 'Cart' }">
        <i class="fa mr-3 fa-shopping-cart mobile-cart-icon text-white" aria-hidden="true"></i>
      </router-link>
    </div>
    <div class="hex-home mx-5 pt-2">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="hexagon align-items-center row rotate">
          <h1 class="big-c col text-center">
            C
          </h1>
        </div>
      </router-link>
    </div>

    <div class="navbar button-div row w-100 justify-content-between" id="navbarText">
      <div class="row lg-icon-row">
        <router-link class="mx-3 home-link f-16 hover-topleft" :to="{ name: 'Home' }">
          Home
        </router-link>
        <router-link class="mx-3 cart-link f-16 hover-topleft" :to="{ name: 'Cart' }">
          Your Cart
        </router-link>
      </div>

      <span class="navbar-text d-flex align-item-center ">
        <div class="container-fluid">
          <div class="row">
            <div class="col d-flex justify-content-start align-items-center">
              <button
                class="btn btn-outline-light text-uppercase"
                @click="login"
                v-if="!user.isAuthenticated"
              >
                Login
              </button>
              <router-link v-else :to="{ name: 'Account' }">
                <i class="fa hover-topleft fa-user-circle d-flex fa-2x align-self-center" aria-hidden="true"></i>
                <!-- <img
            :src="user.picture"
            alt="user photo"
            height="40"
            class="rounded ml-3 hover-topleft"
          /> -->

              </router-link></div>
            <div class="col-md ml-0 col-sm-0 d-flex align-items-center">
              <router-link :to="{ name: 'Account' }">
                <span class="account-name ml-0 mx-3"><p class="hover-topleft email-text">{{ user.name }}</p></span>
              </router-link></div>
          </div>
        </div>

      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      }

    }
  }
}
</script>

<style scoped lang='scss'>
@import "../assets/scss/_variables.scss";
.hoverable {
  cursor: pointer;
}
.navbar {
  flex-wrap: nowrap !important;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
@media only screen and (max-width: 600px) {
  #navbarText{
    justify-content: end;
  }
  .cart-link {
    display: none;
  }
  .home-link {
    display: none;
  }
  .hex-home {
    justify-self: center !important;
    display: flex;
    margin: auto !important;
  }
  .button-div {
    width: 38% !important;
    min-height: 10px;
    justify-content: center;
    display: flex !important;

  }
  i {
    display: block !important;
  }
  .navbar-brand {
    margin-right: 0px !important;
  }
  .navbar {
    justify-content: space-between;

    height: 20%;
  }
  .account-name {
    display: none;
  }
  .lg-icon-row {
    display:none;
  }
}
.nav-item .nav-link.router-link-exact-active {
  color: var(--primary);
}

.big-c {
  font-size: 3rem;
  font-weight: 400;
}
.mobile-cart-icon{
  font-size: 2.5rem;
}
.rotate {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.anti-rotate {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.zoom {

  transition: transform .8s; /* Animation */

  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.5); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
.email-text{
  font-size: 1em;
}
</style>
