<template>
  <div class="fb__rating">
    <div v-for="item in ratingList" :key="item.title" class="stars__item">
      <div class="stars__name">{{ item.title }}</div>
      <ul class="list" data-total-value="0">
        <li class="list__star" data-item-value="5" @click="rate($event)">★</li>
        <li class="list__star" data-item-value="4" @click="rate($event)">★</li>
        <li class="list__star" data-item-value="3" @click="rate($event)">★</li>
        <li class="list__star" data-item-value="2" @click="rate($event)">★</li>
        <li class="list__star" data-item-value="1" @click="rate($event)">★</li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
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
  }
};
</script>