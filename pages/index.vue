<template>
  <div class="c">
    <countries v-bind:countries="countries" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      loaded: false
    };
  },

  async fetch() {
    await fetch(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
    )
      .then(res => res.json())
      .then(data => (this.countries = data));
  }
};
</script>

<style>
.c {
  width: 100%;
  margin: 10 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
