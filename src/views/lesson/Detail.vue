<template>
    <tabs>
    <tab title="Vue">
      This is Vue
    </tab>
    <tab title="React">
      This is React
    </tab>
    <tab title="Svelte">
      This is Svelte
    </tab>
  </tabs>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            lesson: state => state.lessons.lesson
        })
    },
    created() {
        let getInfo = [
            this.getLessonByID(this.$route.params.id)
        ];
        Promise.all(getInfo)
        .then(() =>{
        })
        .catch(error => {
            console.error(error, 'error');
        });
        
    },
    methods: {
        ...mapActions({
            getLessonByID: 'lessons/getLessonByID'
        })
    },
    watch: {
        lesson(newValue, oldValue) {
            console.log(newValue, oldValue);    
        }
    },
}
</script>

<style scoped>

</style>
