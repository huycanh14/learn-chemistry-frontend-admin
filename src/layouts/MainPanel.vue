<template>
    <div class="main-panel">
        <NavBar></NavBar>
        <Content></Content>
        <ContentFooter></ContentFooter>
    </div>
</template>
<script>
import NavBar from './NavBar.vue';
import Content from './Content.vue';
import ContentFooter from './ContentFooter.vue';
export default {
    components: {
        NavBar,
        Content,
        ContentFooter
    }
    
}
</script>