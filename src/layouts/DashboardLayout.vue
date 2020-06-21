<template>
    <div class="wrapper ">
        <SildeBar></SildeBar>
        <MainPanel></MainPanel>
    </div>  
</template>

<script>
import SildeBar from "./SideBar.vue";
import MainPanel from "./MainPanel.vue";

export default {
    components: {
        SildeBar,
        MainPanel
    }

}
</script>