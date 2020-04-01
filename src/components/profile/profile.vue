<script>
import api from "../../services/Api";
export default {
  async created() {
    try {
      this.profile = await api.getAsync("/users/1");
      console.log(this.profile);
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      profile: {}
    };
  }
};
</script>

<template>
  <div>#file</div>
</template>

<style>
@import url("../../assets/theme.css");
</style>