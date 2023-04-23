<template>
  <div class="container">
    <div class="nav">
      <h2>MoviesTV 📺</h2>
    </div>
    <div class="search">
      <h3>Search Movie</h3>

      <div class="search_card">
        <input type="text" v-model="search" placeholder="search by name..." />
      </div>
    </div>
    <div v-if="!isLoading">
      <div v-if="searchData.length > 0">
        <div class="second">
          <div class="latest">
            <div v-for="(item, index) in searchData" :key="index" class="box">
              <router-link
                :to="{ name: 'MovieDetail', params: { id: item.show.id } }"
                v-on:click.prevent
              >
                <div class="card">
                  <div class="details">
                    <div class="left">
                      <p class="name">{{ item.show.name }}</p>
                      <div class="date_quality">
                        <p class="quality">HD</p>
                        <p class="date">{{ item.show.language }}</p>
                      </div>
                      <p class="category">
                        {{ item.show.genres.join(" | ") }}
                      </p>

                      <div class="info">
                        <div class="rate">
                          <p>
                            <span v-if="item.show.rating.average"
                              ><span style="color: gold"
                                ><fa :icon="['fas', 'star']" /></span
                              >{{ item.show.rating.average }}</span
                            >
                            <span v-else
                              ><span style="color: gold"
                                ><fa :icon="['far', 'star']" /></span
                              >No rating available</span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <img :src="item.show.image.medium" />
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="search-not-found">
        <p>DATA NOT FOUND</p>
      </div>
    </div>
    <div v-else>
      <div
        class="lds-ring"
        style="display: flex; margin: 0 auto; height: 100vh"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="footer">
      <p>Made with ❤️ by <span>Daud Ekalaya MCS</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmDisplay",
  data() {
    return {
      search: "",
      film: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchData() {
      const response = await fetch(
        "https://api.tvmaze.com/search/shows?q=girls"
      );
      const result = await response.json();
      return result;
    },
  },
  mounted() {
    this.fetchData().then((result) => {
      this.film = result;
      this.isLoading = false;
    });
  },
  computed: {
    searchData() {
      return this.film.filter((item) => {
        return item.show.name.match(this.search);
      });
    },
  },
};
</script>
