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
  props: ["ratingList"],
  data() {
    return {};
  },
  methods: {
    rate(event) {
      let pressedStar = event.target;
      pressedStar.parentNode.dataset.totalValue = pressedStar.dataset.itemValue;

      this.ratingList.forEach(element => {
        if (
          element.title ==
          pressedStar.parentNode.parentNode.firstChild.innerHTML
        ) {
          element.value = pressedStar.parentNode.dataset.totalValue;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/style/_variables.scss";

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

@media screen and (max-width: 500px) {
  .fb__rating {
    grid-template-areas: "stars__item";
    margin-bottom: 0.7rem;
  }

  .list {
    max-width: 18rem;
    margin: 0 0 1.2rem -0.1rem;
  }
}
</style>