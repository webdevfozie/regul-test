<template>
  <transition name="fade">
    <div class="popup" :class="{ 'popup--step-two': formMobileStep == 2 }">
      <form action="#" class="form">

        <!-- form__header -->
        <div class="form-header">
          <button v-if="formMobileStep == 2" @click.prevent="formMobileStep = 1" type="button" class="form-header__btn-prev"></button>
          <h2 v-if="!isMobile" class="form-header__title">Мой отзыв</h2>
          <h2 v-if="isMobile" class="form-header__title">Новый отзыв</h2>
          <span class="form-header__close" v-on:click="$emit('close-form')">⨉</span>
        </div>
        <!-- form__header -->

        <!-- Rating -->
        <div v-if="formMobileStep == 1 || !isMobile" class="fb">
          <div class="fb__info">
            <img class="fb__preview-img" src="@/assets/img/work.jpg" alt="Превью фото">
            <div class="fb__description">
              <div class="fb__work-name">Фоточки в свадебном платьице</div>
              <div class="fb__author-name">Алена Смирнова</div>
            </div>
          </div>
          <div class="fb__wrapper">
            <Rating v-bind:ratingList="ratingList" />
            <div v-if="isMobile" class="form-footer">
              <button @click="formMobileStep = 2" type="button" class="button">Продолжить</button>
            </div>
          </div>
        </div>
        <!-- /Rating -->

        <!-- Коментарий и фото -->
        <div v-if="formMobileStep == 2 || !isMobile" class="fb-comment">
          <label>
            <textarea 
              class="fb-comment__text" 
              name="comment" 
              placeholder="Комментарий"
              v-model="formComment"
            ></textarea>
          </label>
          <span class="fb-comment__count">{{ formComment.length }}/500</span>
          <div class="fb__wrapper">
            <Images/> 
            <!-- Фото лежат в папке public для работы относительных путей в компоненте -->
            <div class="form-footer">
              <input type="submit" class="button" value="Отправить"
                v-on:click.prevent="submit()"
              />
            </div>
          </div>
        </div>
        <!-- /Коментарий и фото -->

      </form>
    </div>
  </transition>
</template>

<script>
import Rating from "./rating.vue";
import Images from "./images.vue";

export default {
  components: {
    Rating,
    Images
  },
  data() {
    return {
      formMobileStep: 1,
      formComment: "",
      ratingList: [
        {
          title: "Скорость",
          name: "Speed",
          value: ""
        },
        {
          title: "Скорость отдачи видео",
          name: "Return speed",
          value: ""
        },
        {
          title: "Качество",
          name: "Quality",
          value: ""
        },
        {
          title: "Пунктуальность",
          name: "Punctuality",
          value: ""
        }
      ]
    };
  },
  computed: {
    isMobile: () => {
      if (window.innerWidth <= 500) {
        return true;
      }
    }
  },
  methods: {
    submit() {
      // Валидация
      this.ratingList.forEach(item => {
        if (!item.value) {
          alert(`Пожалуйста поставьте оценку ${item.title}!`);
          return;
        }
      });

      if (this.formComment.length > 500) {
        alert("Комментарий больше 500 символов!");
        return;
      } else if (this.formComment.length < 1) {
        alert("Комментарий обязателен к заполнению!");
        return;
      }

      this.$emit("close-form");
      this.$emit("send-form");
      this.formMobileStep = 1;
      console.log(
        `Оценки: 
        ${this.ratingList[0].title}: ${this.ratingList[0].value}, 
        ${this.ratingList[1].title}: ${this.ratingList[1].value}, 
        ${this.ratingList[2].title}: ${this.ratingList[2].value}, 
        ${this.ratingList[3].title}: ${this.ratingList[3].value}, 
        Комментарий пользователя: ${this.formComment}`
      );
    }
  }
};
</script>

<style lang="scss">
@import "../assets/style/_variables.scss";

// Popup
.popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding-top: 10vh;
  background: $bg-color;
}

.form {
  max-width: 56rem;
  background: #fff;
  border-radius: 1.6rem;
  margin: 0 auto;
  align-items: center;
  z-index: 3;
  padding: 1.6rem 1.6rem 1.6rem 3.2rem;
  overflow: hidden;
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
  .popup {
    display: flex;
    align-items: flex-end;
    padding-top: 0;
    background: rgba($color: #000, $alpha: 0.66);
    min-height: 100%;
  }

  .form {
    width: 100%;
    overflow: hidden;
    padding: 1.6rem;
    border-radius: 16px 16px 0 0;
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

  .fb__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 80%;
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

  // Изминение стилей при formMobileStep == 2
  .popup--step-two {
    padding: 0;
    // bottom: 0;

    & .form {
      border-radius: 0;
    }
    & .form-header {
      &:after {
        content: "";
        position: absolute;
        top: 3.9rem;
        width: 120%;
        height: 0.1rem;
        background-color: $secondary-color;
      }
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
    & .form-footer {
      margin-top: 2.4rem;
    }
  }
}
</style>