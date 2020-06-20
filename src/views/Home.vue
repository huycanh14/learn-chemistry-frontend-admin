<template>
  <div class="home">
    <input type="button" @click="getListAccounts" value="get accounts">
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  methods: {
    getListAccounts(){
      this.$store.dispatch('accounts/getListAccounts', {page: 1})
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
