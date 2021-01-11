<template>
  <div class="each-country">
    <strong>{{ country.location }}</strong>
    -
    {{ (100 * (country.total_vaccinations / country.population)).toFixed(2) }} %
    vaccinated

    <b-progress
      :value="this.country.total_vaccinations"
      :max="this.country.population"
      precision="4"
      class="progress-left"
    >
    </b-progress>
    <b-container fluid>
      <b-row>
        <b-col> Total Vaccinations: {{ country.total_vaccinations }}</b-col>
        <b-col>Total Cases: {{ country.total_cases }}</b-col>
        <b-col>Total Deaths: {{ country.total_deaths }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ["country"]
};
</script>

<style>
.small-text {
  font-size: 12px;
}
.each-country {
  padding-top: 5px;
  width: 90%;
  margin: auto;
  margin-top: 15px;
  text-align: left;
}
</style>
