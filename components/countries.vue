<template>
  <div class="whole-container">
    <div class="jt">
      <section class="bigFont">
        Covid-19 Vaccination Tracker
      </section>
      <section class="smallFont">
        We're all in this together
      </section>
      <p id="paragraphHeading">
        Live stats for Covid-19 vaccination around the world. An ongoing effort
        to end the epidemic. Updated daily.
      </p>
      <div class="percentageBar">
        Percentage of the entire world vaccinated:
        <b-progress
          variant="success"
          :value="this.vac"
          :max="this.pop"
          precision="4"
        >
        </b-progress>
        {{ (100 * (this.vac / this.pop)).toFixed(2) }}%
      </div>
    </div>
    <div class="world-data-container text-white"></div>

    <div class="all-countries-container">
      <div :key="country" v-for="country in countries">
        <country :country="country" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["countries"],

  data() {
    return {
      value: 0,
      max: 0,
      vac: this.countries["OWID_WRL"].total_vaccinations,
      pop: this.countries["OWID_WRL"].population
    };
  },

  methods: {}
};
</script>

<style>
#paragraphHeading {
  color: white;
  font-size: 18px;
  margin-top: 50px;
  margin-left: 10%;
  width: 30%;
  text-align: left;
}
.bigFont {
  color: white;
  font-size: 45px;
  text-align: left;
  margin-left: 10%;
  padding-top: 20px;
}
.smallFont {
  color: white;
  font-size: 30px;
  text-align: left;
  margin-left: 10%;
}
.percentageBar {
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
  background-color: rgb(90, 126, 172);
}
.whole-container {
  width: 100%;
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

  margin-top: 10px;
  flex: auto;
  justify-content: center;
}
</style>
