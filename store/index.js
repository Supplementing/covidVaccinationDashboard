const vaccination_api =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json";

export default {
  state: {
    world: [],
    totalVaccinations: 0,
    totalPopulation: 0,
    countries: [],
    isLoading: true
  },
  actions: {
    getCountries({ commit }) {
      fetch(vaccination_api, {
        method: "GET",
        headers: {}
      })
        .then(res => res.json())
        .then(res => {
          this.state.world = res.OWID_WRL;
          // World is un-needed, so delete
          delete res["OWID_WRL"];

          this.state.totalVaccinations = this.state.world.total_vaccinations;
          this.state.totalPopulation = this.state.world.population;

          commit("SET_COUNTRIES", res);
          this.state.isLoading = false;
        })
        .catch(console.error.bind(console));
    }
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    }
  },
  getters: {
    countries: state => state.countries,
    totalPopulation: state => state.totalPopulation,
    totalVaccinations: state => state.totalVaccinations
  }
};
