<template>
  <div id="app">
    <div class="main">
      <transition name="fade">
        <button type="button" class="button" v-if="!formIsSend" v-on:click="formIsOpen = true">Оставить отзыв</button>
      </transition>
      <transition name="fade">
        <div class="message" v-if="formIsSend">
          <span class="message__text">Спасибо, отзыв опубликован!</span>
          <button type="button" class="message__close" @click="formIsSend = false"></button>
        </div>
      </transition>
    </div>
    <Form 
      v-if="formIsOpen"
      v-on:close-form="formIsOpen = false"
      v-on:send-form="formIsSend = true"
    />
  </div>
</template>

<script>
import Form from "@/components/form";
export default {
  name: "App",
  components: {
    Form
  },
  data() {
    return {
      formIsOpen: false,
      formIsSend: false
    };
  }
};
</script>

<style lang="scss">
@import "assets/style/_minireset.scss";
@import "assets/style/_variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap");

body,
html {
  font-size: 10px;
}

body {
  position: relative;
}

* {
  font-family: "Montserrat", sans-serif;
}

.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: #ebedf0;
}

// button
.button {
  color: #fff;
  background-color: $accent-color;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: darken($accent-color, 10%);
  }

  &:active {
    opacity: 0.8;
  }
}

// Message
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  background: #15a758;
  border-radius: 0.6rem;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.08);
}

.message__text {
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 500;
  padding: 0.8rem 1.4rem 0.8rem 1.2rem;
  color: #fff;
}

.message__close {
  font-weight: 600;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  margin: 0 1.4rem 0 0;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4) url("assets/img/close.svg") center
    no-repeat;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
