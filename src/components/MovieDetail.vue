<template>
  <div class="container">
    <div class="nav">
      <h2>MoviesTV 📺</h2>
    </div>
    <div class="second">
      <div class="latest">
        <div class="card-detail" v-if="movie">
          <div class="left-detail">
            <img :src="movie.image.original" />
          </div>
          <div class="right-detail">
            <h3>{{ movie.name }}</h3>
            <div class="rating">
              <span v-for="i in 5" :key="i">
                <fa
                  :icon="['fas', 'star']"
                  v-if="i <= Math.round(movie.rating.average / 2)"
                  style="color: gold"
                />
                <fa :icon="['far', 'star']" style="color: gold" v-else />
              </span>
              <span class="average-rating">{{ movie.rating.average }}/10</span>
            </div>
            <p style="font-weight: bold">
              Genre:
              <span style="font-weight: 100">{{
                movie.genres.join(", ")
              }}</span>
            </p>
            <p style="font-weight: bold">
              Type: <span style="font-weight: 100">{{ movie.type }}</span>
            </p>
            <p style="font-weight: bold">
              Language:
              <span style="font-weight: 100">{{ movie.language }}</span>
            </p>
            <p style="font-weight: bold">
              Premiered:
              <span style="font-weight: 100">{{ movie.premiered }}</span>
            </p>
            <div class="summary-container" v-html="movie.summary"></div>
            <div class="btn-play">
              <button>
                <fa :icon="['fas', 'play']" />
                PLAY MOVIE
              </button>
            </div>
          </div>
          <fa
            :icon="['far', 'circle-xmark']"
            class="close-icon"
            @click="$router.go(-1)"
          />
        </div>
        <div class="container-loading" v-else>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>Made with ❤️ by <span>Daud Ekalaya MCS</span></p>
  </div>
</template>

<script>
export default {
  name: "MovieDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movie: null,
    };
  },
  methods: {
    async fetchMovie() {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${this.$route.params.id}`
      );
      const result = await response.json();
      return result;
    },
  },
  mounted() {
    this.fetchMovie().then((result) => {
      this.movie = result;
    });
  },
};
</script>
