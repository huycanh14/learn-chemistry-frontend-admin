<template>
  <div class="home">
    <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="fullPage"
        :color="color"
        :background-color="background_color"
        :height="155"
        :width="155">
    </loading>

    <div class="row">
      <card-stats-home :title= "$t('menu.grade')" :number="count_grade" :icon="`nc-icon nc-align-left-2 text-warning`"></card-stats-home>
      <card-stats-home :title= "$t('menu.chapter')" :number="count_chapter" :icon="`nc-icon nc-book-bookmark text-success`"></card-stats-home>
      <card-stats-home :title= "$t('menu.chapter')" :number="count_chapter" :icon="`nc-icon nc-paper text-danger`"></card-stats-home>
      <card-stats-home :title= "$t('menu.account')" :number="count_account" :icon="`nc-icon nc-single-02 text-primary`"></card-stats-home>
    </div>
  </div>
</template>

<script>
import CardStatsHome from "../../components/CardStatsHome.vue"
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Home',
  components: {
    CardStatsHome, Loading
  },
  data() {
    return {
      isLoading: true,
      fullPage: false,
      background_color: "#4B4B4B",
      color: "#00AB00"

    }
  },
  methods: {
    /**
     * ...mapActions({
      setColor: 'store/changeColor',
    }),*/
    getListAccounts(){
      this.$store.dispatch('accounts/getListAccounts', {page: 1})
    }
  },
  computed: {
    ...mapState({
      count_grade: state => state.grades.count,
      count_account: state => state.accounts.count,
      count_chapter: state => state.chapters.count,
    }),
    
  },
  beforeCreate(){
    let getTotals = [
      this.$store.dispatch('grades/getTotalGrades'),
      this.$store.dispatch('accounts/getTotalAccounts'),
      this.$store.dispatch('chapters/getTotalChapters'),
    ];
    Promise.all(getTotals)
    .then(() =>{
      this.isLoading = false;
    })
    .catch(error => {
      console.error(error, 'error');
      this.isLoading = false;
    });
  }
}
</script>

<style scoped>

</style>
