<template>
  <div class="whole-container">
    <div class="jt">
      <section class="bigFont">
        Covid-19 Vaccination Tracker
      </section>

      <section class="smallFont">
        We're all in this together
      </section>
      <div id="paragraphHeading">
        <p>
          Live stats for Covid-19 vaccination around the world. <br />
          An ongoing effort to end the epidemic. <br />Updated daily.
        </p>
      </div>

      <div class="percentageBar">
        Percentage of the entire world vaccinated:
        <b-progress
          variant="warning"
          :value="this.$store.getters.totalVaccinations"
          :max="this.$store.getters.totalPopulation"
          precision="2"
          animated
        >
        </b-progress>
        {{
          (
            100 *
            (this.$store.getters.totalVaccinations /
              this.$store.getters.totalPopulation)
          ).toFixed(2)
        }}%
      </div>
      <input
        id="searchBox"
        placeholder="Search for country..."
        v-model="search"
      />
    </div>

    <div class="world-data-container text-white"></div>

    <div class="all-countries-container">
      <input type="checkbox" @click="changeEnabled" />
      <strong>Show Countries with Zero Vaccinations </strong>
      <br />
      <select name="filtering" v-model="filterSelection">
        <option value="none" disabled>Sort By.. </option>
        <option value="none">None </option>
        <option value="ascending">Ascending(percentage)</option>
        <option value="descending">Descending(percentage</option>
      </select>

      <div :key="country" v-for="country in filteredLocations">
        <country v-if="enabled" :country="country" />
        <country v-else-if="country.total_vaccinations" :country="country" />
      </div>
    </div>
    <foot />
  </div>
</template>

<script>
export default {
  computed: {
    filteredLocations() {
      const countries = this.$store.state.countries;
      let filteredData = Object.values(countries).filter(item => {
        return (
          item.location.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
      filteredData = this.filterBy(this.filterSelection, filteredData);
      return filteredData;
    }
  },
  mounted() {
    this.$store.dispatch("getCountries");
  },
  data() {
    return {
      value: 0,
      max: 0,
      vac: this.$store.getters.totalVaccinations,
      pop: this.$store.getters.totalPopulation,
      search: "",
      enabled: false,
      filterSelection: "none"
    };
  },

  methods: {
    changeEnabled() {
      this.enabled = !this.enabled;
    },
    filterBy(filterSelection, filteredData) {
      //if no filter selected, just return normal data
      if (filterSelection == "none") {
        return filteredData;
      } else if (filterSelection == "ascending") {
        filteredData.sort((a, b) =>
          a.total_vaccinations / a.population >
          b.total_vaccinations / b.population
            ? 1
            : -1
        );
        return filteredData;
      } else if (filterSelection == "descending") {
        filteredData.sort((a, b) =>
          a.total_vaccinations / a.population <
          b.total_vaccinations / b.population
            ? 1
            : -1
        );
        return filteredData;
      }
    }
  }
};
</script>

<style>
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white;
}
#searchBox {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 40%;
  height: 30px;
  background: transparent;
  color: white;
}

#paragraphHeading {
  color: white;
  font-size: 18px;
  margin-top: 50px;
  margin-left: 10%;

  width: auto;
  height: auto;

  text-align: left;
}

.bigFont {
  color: white;
  font-size: 45px;
  text-align: left;
  margin-left: 10%;
  margin-right: auto;
  padding-top: 20px;
}
.smallFont {
  color: white;
  font-size: 30px;
  text-align: left;
  margin-left: 10%;
}
.percentageBar {
  padding-top: 10px;
  width: 70%;
  margin: auto;

  color: white;
  font-size: 25px;
}
ul {
  list-style-type: none;
  text-align: left;
}
.jt {
  height: auto;
  background: #396afc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #396afc,
    #2948ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #396afc, #2948ff);
  box-shadow: 0 4px 2px -2px gray;
}
.whole-container {
  width: 100%;
  position: absolute;
  top: 0;
}
.world-data-container {
  margin: auto;
  width: 80%;
}
.all-countries-container {
  margin: auto;
  width: 80%;
  align-content: center;
  background-color: rgb(255, 255, 255);
  padding-top: 20px;
  padding-bottom: 20px;

  margin-top: 10px;
  flex: auto;
  justify-content: center;
}
</style>
