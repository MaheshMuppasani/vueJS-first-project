<template>
  <form class="simpleForm" @submit.prevent="handleSubmit">
    <div class="control">
      <label for="name">Name :</label>
      <input type="text" id="name" v-model.trim.lazy="formData.name" />
    </div>

    <div class="control">
      <label for="email">Email :</label>
      <input type="email" id="email" v-model="formData.email" />
    </div>
    <div class="control">
      <label for="country">Country :</label>
      <select id="country" v-model="formData.countryCode">
        <option value>Select a country</option>
        <option
          v-for="country in countryList"
          :value="country.countryCode"
          :key="country"
        >{{ country.name }}</option>
      </select>
    </div>
    <div class="control">
      <label for="job-location">Job Location :</label>
      <select id="job-location" multiple v-model="formData.preferredLocations">
        <option
          v-for="country in countryList"
          :value="country.countryCode"
          :key="country"
        >{{ country.name }}</option>
      </select>
    </div>

    <div class="control">
      <input
        type="checkbox"
        id="remoteWork"
        v-model="formData.remoteWork"
        true-value="yes"
        false-value="no"
      />
      <label for="remoteWork">Open to remote work?</label>
    </div>

    <div class="control">
      <label class="underline">Select Skill Set</label>
      <div>
        <input type="checkbox" id="html" value="html" v-model="formData.skillSet" />
        <label for="html">HTML</label>
        <input type="checkbox" id="css" value="css" v-model="formData.skillSet" />
        <label for="css">CSS</label>
        <input type="checkbox" id="javascript" value="javascript" v-model="formData.skillSet" />
        <label for="javascript">Javascript</label>
      </div>
    </div>

    <div class="control">
      <label class="underline">Select Your Experience</label>
      <div>
        <input type="radio" id="0-2" value="0-2" v-model="formData.yearsExperience" />
        <label for="0-2">0-2</label>
        <input type="radio" id="3-5" value="3-5" v-model="formData.yearsExperience" />
        <label for="3-5">3-5</label>
        <input type="radio" id="5-10" value="5-10" v-model="formData.yearsExperience" />
        <label for="5-10">5-10</label>
        <input type="radio" id="10+" value="10+" v-model="formData.yearsExperience" />
        <label for="10+">10+</label>
      </div>
    </div>

    <div class="control">
      <label for="age">Age :</label>
      <input type="number" id="age" v-model="formData.age" @keyup.enter="handleSubmit" />
    </div>
    <!-- <div class="control">{{JSON.stringify(formData, null, 2)}}</div> -->
    <!-- <div class="control">
      <button>Submit</button>
    </div>-->

    <div class="control" v-once>
        {{formData.name}}
    </div>
    <div class="control" v-pre>
        {{formData.name}}
    </div>
  </form>
</template>

<script>
function handleSubmit() {
  alert(JSON.stringify(this.formData, null, 2));
}

export default {
  name: "SimpleForm",
  data() {
    return {
      formData: {
        name: "mahi",
        age: null,
        email: "",
        countryCode: "",
        preferredLocations: [],
        remoteWork: "no",
        skillSet: [],
        yearsExperience: ""
      },
      countryList: [
        { name: "India", countryCode: "IN" },
        { name: "United States", countryCode: "US" },
        { name: "United kingdom", countryCode: "UK" },
        { name: "Singapore", countryCode: "SG" },
        { name: "Vietnam", countryCode: "VT" }
      ]
    };
  },
  methods: {
    handleSubmit
  }
};
</script>

<style>
.simpleForm {
  margin: 20px 0;
}
.simpleForm label {
  font-weight: bold;
}
.simpleForm .control {
  margin: 5px 0;
}
.underline {
  text-decoration: underline;
}
</style>
