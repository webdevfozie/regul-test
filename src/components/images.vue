<template>
  <div class="fb-comment__attach">
    <input type="file" id="attach">
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
  },
  methods: {}
};
</script>