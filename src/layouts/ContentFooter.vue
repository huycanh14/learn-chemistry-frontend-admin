<template>
    <footer class="footer footer-black  footer-white ">
        <div class="container-fluid">
          <div class="row">
            <nav class="footer-nav">
              <ul>
                <li><a href="https://www.creative-tim.com" target="_blank">Creative Tim</a></li>
                <li><a href="https://www.creative-tim.com/blog" target="_blank">Blog</a></li>
                <li><a href="https://www.creative-tim.com/license" target="_blank">Licenses</a></li>
              </ul>
            </nav>
            <div class="credits ml-auto">
              <span class="copyright">
                © {{full_year}}, made with <i class="fa fa-heart heart"></i> by Canh Huy
              </span>
            </div>
          </div>
        </div>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            full_year: new Date().getFullYear()
        }
    },
}
</script>