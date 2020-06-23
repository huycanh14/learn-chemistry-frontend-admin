<template>
    <div class="sidebar" data-color="white" data-active-color="danger">
      <div class="logo">
        <a href="https://www.creative-tim.com" class="simple-text logo-mini">
          <!-- <div class="logo-image-small">
            <img src="./assets/img/logo-small.png">
          </div> -->
          <!-- <p>CT</p> -->
        </a>
        <a href="https://www.creative-tim.com" class="simple-text logo-normal">
          Your Logo
          <!-- <div class="logo-image-big">
            <img src="../assets/img/logo-big.png">
          </div> -->
        </a>
      </div>
      <div class="sidebar-wrapper" >
        <ul class="nav slidebar">

          <li class="active ">
            <a href="javascript:;">
              <i class="nc-icon nc-bank"></i>
              <p>{{$t('menu.home')}} </p>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="nc-icon nc-align-left-2"></i>
              <p>{{$t('menu.grade')}}</p>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="nc-icon nc-book-bookmark"></i>
              <p>{{$t('menu.chapter')}}</p>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="nc-icon nc-bullet-list-67"></i>
              <p>{{$t('menu.lesson')}}</p>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="nc-icon nc-paper"></i>
              <p>{{$t('menu.document')}}</p>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="nc-icon nc-single-02"></i>
              <p>{{$t('menu.account')}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
    }
  },
  mounted() {
    $(document).ready(function ($) {
      $('ul.nav.slidebar li').click(function() { 
          $(this).addClass('active').siblings().removeClass('active');
      });
    })
  },
}
/* $(function() {
  $( 'ul.nav li' ).on( 'click', function() {
    $( this ).parent().find( 'li.active' ).removeClass( 'active' );
      $( this ).addClass( 'active' );
  });
});*/
</script>