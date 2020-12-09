<template>
  <div class="fb-comment__attach">
    <input type="file" multiple accept="image/jpeg,image/png" id="attach">
    <label class="fb-comment__attach-btn fb-comment__attach-block" for="attach">+</label>
    <div v-for="image in images" :key="image.url" class="fb-comment__attach-block fb-comment__added-img">
      <img :src='image.url' :alt="image.alt"/>
      <button type="button" class="delete"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          url: "img/img1.jpg",
          alt: "img1"
        },
        {
          url: "img/img2.jpg",
          alt: "img2"
        },
        {
          url: "img/img3.jpg",
          alt: "img3"
        },
        {
          url: "img/img4.jpg",
          alt: "img4"
        },
        {
          url: "img/img5.jpg",
          alt: "img5"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../assets/style/_variables.scss";

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

@media screen and (max-width: 500px) {
  // Изминение стилей при formMobileStep == 2
  .popup--step-two {
    & .fb-comment {
      display: flex;
      flex-direction: column;
      height: calc(100% - 4rem);
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
      display: grid;
      grid-template-columns: 8rem 8rem 8rem;
      grid-template-rows: 8rem 8rem 8rem;
      grid-gap: 8px;
    }
    & .fb-comment__attach-block:last-child {
      display: block;
    }
  }
}
</style>