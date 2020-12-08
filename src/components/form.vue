<template>
  <div>
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
    <transition name="fade">
      <div class="popup" :class="{ 'popup--step-two': formMobileStep == 2 }" v-if="formIsOpen">
        <form action="#" class="form">

          <!-- Компонент form__header -->
          <div class="form-header">
            <button v-if="formMobileStep == 2" @click.prevent="formMobileStep = 1" type="button" class="form-header__btn-prev"></button>
            <h2 v-if="!isMobile" class="form-header__title">Мой отзыв</h2>
            <h2 v-if="isMobile" class="form-header__title">Новый отзыв</h2>
            <span class="form-header__close" v-on:click="formIsOpen = false">⨉</span>
          </div>
          <!-- Компонент form__header -->

          <!-- Rating -->
          <div v-if="formMobileStep == 1 || !isMobile" class="fb">
            <div class="fb__info">
              <img class="fb__preview-img" src="@/assets/img/work.jpg" alt="Превью фото">
              <div class="fb__description">
                <div class="fb__work-name">Фоточки в свадебном платьице</div>
                <div class="fb__author-name">Алена Смирнова</div>
              </div>
            </div>
            <div class="fb__rating">
              <!-- Отдельный компонент -->
              <div v-for="item in ratingList" :key="item.title" class="stars__item">
                <div class="stars__name">{{ item.title }}</div>
                <ul class="list" data-total-value="0" :data-value="item.name">
                  <li class="list__star" data-item-value="5" @click="rate($event)">★</li>
                  <li class="list__star" data-item-value="4" @click="rate($event)">★</li>
                  <li class="list__star" data-item-value="3" @click="rate($event)">★</li>
                  <li class="list__star" data-item-value="2" @click="rate($event)">★</li>
                  <li class="list__star" data-item-value="1" @click="rate($event)">★</li>
                </ul>
              </div>
            </div>
            <div v-if="isMobile" class="form-footer">
              <button @click="formMobileStep = 2" type="button" class="button">Продолжить</button>
            </div>
          </div>
          <!-- Rating -->

          <!-- Коментарий и фото -->
          <div v-if="formMobileStep == 2 || !isMobile" class="fb-comment">
            <label>
              <textarea class="fb-comment__text" name="comment" placeholder="Комментарий"></textarea>
            </label>
            <span class="fb-comment__count">12/500</span>
            <div class="fb__wrapper">
              <div class="fb-comment__attach">
                <input type="file" id="attach">
                <label class="fb-comment__attach-btn fb-comment__attach-block" for="attach">+</label>
                <div class="fb-comment__attach-block fb-comment__added-img">
                  <img src="@/assets/img/img1.jpg" alt="img1"/>
                  <button type="button" class="delete"></button>
                </div>
                <div class="fb-comment__attach-block fb-comment__added-img">
                  <img src="@/assets/img/img2.jpg" alt="img2"/>
                  <button type="button" class="delete"></button>
                </div>
                <div class="fb-comment__attach-block fb-comment__added-img">
                  <img src="@/assets/img/img3.jpg" alt="img3"/>
                  <button type="button" class="delete"></button>
                </div>
                <div class="fb-comment__attach-block fb-comment__added-img">
                  <img src="@/assets/img/img4.jpg" alt="img4"/>
                  <button type="button" class="delete"></button>
                </div>
                <div class="fb-comment__attach-block fb-comment__added-img">
                  <img src="@/assets/img/img5.jpg" alt="img4"/>
                  <button type="button" class="delete"></button>
                </div>
              </div>
              <div class="form-footer">
                <input type="submit" class="button" value="Отправить"
                      v-on:click.prevent="
                        formIsOpen = false;
                        formIsSend = true"
                />
              </div>
            </div>
          </div>
          <!-- Коментарий и фото -->

        </form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsOpen: false,
      formIsSend: false,
      formMobileStep: 1,
      ratingList: [
        {
          title: "Скорость",
          name: "Speed"
        },
        {
          title: "Скорость отдачи видео",
          name: "Return speed"
        },
        {
          title: "Качество",
          name: "Quality"
        },
        {
          title: "Пунктуальность",
          name: "Punctuality"
        }
      ]
    };
  },
  methods: {
    rate: event => {
      let pressedStar = event.target;
      pressedStar.parentNode.dataset.totalValue = pressedStar.dataset.itemValue;
    }
  },
  computed: {
    isMobile: () => {
      if (window.innerWidth <= 500) {
        return true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/style/_variables.scss";

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
}

// Popup
.popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding-top: 10vh;
  background: $bg-color;
}

.form {
  max-width: 56rem;
  background: #fff;
  border-radius: 1.6rem;
  overflow: hidden;
  margin: 0 auto;
  align-items: center;
  z-index: 3;
  padding: 1.6rem 1.6rem 1.6rem 3.2rem;
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
  background: rgba(255, 255, 255, 0.4) url("../assets/img/close.svg") center
    no-repeat;
}

// <form-header>
.form-header {
  display: flex;
  padding: 0 0 1.6rem 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: -3.2rem;
    bottom: 0.1rem;
    width: 120%;
    height: 0.1rem;
    background-color: $secondary-color;
  }
}

.form-header__btn-prev {
  display: none;
}

.form-header__title {
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.5rem;
  color: $main-text-color;
}

.form-header__title--mobile {
  display: none;
}

.form-header__close {
  position: absolute;
  right: 0.4rem;
  font-size: 2rem;
  color: #7f899e;
  cursor: pointer;
}

// feedback (fb)
.fb {
  padding: 2.4rem 0 0 0;
}

.fb__info {
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;
}

.fb__preview-img {
  border-radius: 0.6rem;
  overflow: hidden;
  width: 10.2rem;
  margin-top: -0.1rem;
}

.fb__description {
  padding-left: 2rem;
  flex: 1 1 auto;
}

.fb__work-name {
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.4rem;
  margin-bottom: 0.3rem;
  color: $main-text-color;
}

.fb__author-name {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: $secondary-text-color;
}

// Rating
.fb__rating {
  display: grid;
  grid-template-areas: "stars__item stars__item";
}

.stars__name {
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  color: $main-text-color;
}

.list {
  display: flex;
  justify-content: space-around;
  flex-direction: row-reverse;
  max-width: 17rem;
  margin: 0 -4.5rem 1.6rem -0.1rem;
}

.list__star {
  font-size: 35px;
  color: $secondary-color;
  cursor: pointer;
  margin: -3px 0 0 0;
  transition: color 0.2s ease-in-out;
}

.list__star:hover,
.list__star:hover ~ .list__star {
  color: $accent-color;
}

.list[data-total-value="1"] .list__star:nth-child(n + 5),
.list[data-total-value="2"] .list__star:nth-child(n + 4),
.list[data-total-value="3"] .list__star:nth-child(n + 3),
.list[data-total-value="4"] .list__star:nth-child(n + 2),
.list[data-total-value="5"] .list__star:nth-child(n + 1) {
  color: $accent-color;
}

.list__star--checked {
  color: $accent-color;
}

// Comment&Photo
.fb-comment__text {
  width: 96.9%;
  height: 10rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  padding: 1.2rem 0 0 1.1rem;
  margin-top: 0.8rem;
  resize: none;
  background-color: #fafafa;
  border: 0.1rem solid #eaecf0;
  border-radius: 0.6rem;

  &::placeholder {
    color: #7f899e;
  }
}

.fb-comment__count {
  display: block;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: right;
  color: #7f899e;
  margin: 0.1rem 1.6rem 1.6rem 0;
}

.fb-comment__attach {
  display: flex;
  margin-bottom: 2.4rem;
  width: 96.9%;
}

.fb-comment__attach input {
  position: absolute;
  left: -9000px;
}

.fb-comment__attach-block {
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  border-radius: 0.6rem;
}

.fb-comment__attach-block img {
  border-radius: 0.6rem;
  overflow: hidden;
}

.fb-comment__attach-block:not(:last-child) {
  margin-right: 0.8rem;
}

.fb-comment__attach-block:last-child {
  display: none;
}

.fb-comment__added-img {
  position: relative;

  &:hover .delete {
    visibility: visible;
    opacity: 1;
  }
}

.delete {
  visibility: hidden;
  opacity: 0;
  padding: 0;
  border: none;
  position: absolute;
  width: 3.2rem;
  height: 3.2rem;
  background: #000;
  top: 0.8rem;
  right: 0.8rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6) url("../assets/img/delete.svg") center center
    no-repeat;
  border-radius: 4px;
  transition: opacity 0.2s ease-in-out;
}

.fb-comment__attach-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9aa2b7;
  font-size: 3rem;
  padding-bottom: 1px;
  border: 0.1rem solid $secondary-color;
  background: #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: darken(#f3f4f6, 2.5%);
  }
}

// form-footer
.form-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1.6rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: -3.2rem;
    top: 0;
    width: 120%;
    height: 0.1rem;
    background-color: $secondary-color;
  }
}

@media screen and (max-width: 500px) {
  .form {
    padding: 1.6rem;
    border-radius: 16px 16px 0 0;
  }

  .popup {
    padding-top: 5.6rem;
    background: rgba($color: #000, $alpha: 0.66);
  }

  .form-header {
    &:after {
      left: 50%;
      transform: translateX(-50%);
      top: -1.2rem;
      width: 2.4rem;
      height: 0.3rem;
      border-radius: 0.4rem;
      background-color: #cfd3dd;
    }
  }

  .fb {
    padding: 0;
  }

  .fb__info {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2.4rem;
  }

  .fb__preview-img {
    width: 8.4rem;
  }

  .fb__description {
    padding: 1.4rem 0 0 0;
  }

  .fb__work-name {
    margin-bottom: 0.4rem;
  }

  .fb__rating {
    grid-template-areas: "stars__item";
    margin-bottom: 0.7rem;
  }

  .list {
    max-width: 18rem;
    margin: 0 0 1.2rem -0.1rem;
  }

  // Изминение стилей при formMobileStep == 2
  .popup--step-two {
    padding: 0;
    bottom: 0;

    & .form {
      border-radius: 0;

      & .form-header {
        &:after {
          content: "";
          position: absolute;
          top: 3.9rem;
          width: 120%;
          height: 0.1rem;
          background-color: $secondary-color;
        }
        & .form-header__title {
          padding-left: 1.2rem;
        }
        & .form-header__btn-prev {
          margin: 4px;
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
          border: none;
          background: transparent url("../assets/img/arrow-left.svg") center
            no-repeat;
        }
      }
      & .fb__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      & .fb-comment__text {
        width: 100%;
        margin-top: 1.3rem;
        padding-top: 1.6rem;
        padding-left: 1.1rem;
        height: 14.6rem;
      }
      & .fb-comment__count {
        margin-right: 0;
      }
      & .fb-comment__attach {
        width: 89%;
        display: grid;
        grid-template-columns: 8rem 8rem 8rem;
        grid-template-rows: 8rem 8rem 8rem;
        grid-gap: 8px;
      }
      & .fb-comment__attach-block:last-child {
        display: block;
      }
      & .form-footer {
        margin-top: 2.4rem;
        position: relative;
      }
    }
  }
}
</style>