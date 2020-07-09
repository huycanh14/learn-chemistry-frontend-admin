<template>
  <div class="col-md-4 d-flex box-shadow">
    <div class="card border-primary mb-3 w-100">
      <div class="multi-button">
        <button class="nc-icon nc-simple-remove text-danger">
        </button>
      </div>
      <div class="container">
        <div class="card-header">
          {{ $t("lesson.card_title") }} : {{ payload.lesson_number }}
          
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{{ payload.title }}</h5>
          <p class="card-text">
            <cite>{{ payload.description | shortText(200) }}</cite>
          </p>
          <a href="#" class="mt-auto btn btn-lg btn-block btn-primary"
            >Go somewhere</a
          >
        </div>
        <div class="card-footer text-muted">
          {{ payload.created_at | numberToDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      text: "",
    };
  },
  props: {
    payload: {},
  },
  filters: {
    shortText: function(value, length) {
      var div = document.createElement("div");
      div.innerHTML = value;
      var text = div.textContent || div.innerText || "";
      return text.length > length ? `${text.substring(0, length)}...` : text;
    },
    numberToDate: function(value) {
      return `${new Date(value).toLocaleString().split(",")[1]} - ${
        new Date(value).toLocaleString().split(",")[0]
      }`;
    },
  },
  watch: {},
  mounted() {
    $(document).ready(function($) {
      $(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $("[title]").tooltip();
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.card {
    position: relative;
  box-shadow: 0 0 2rem -1rem rgba(0, 0, 0, 0.05);
  background: rgba(235, 233, 249, 1);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(235, 233, 249, 1) 0%,
    rgba(216, 208, 239, 1) 33%,
    rgba(193, 191, 234, 1) 88%,
    rgba(193, 191, 234, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(235, 233, 249, 1)),
    color-stop(33%, rgba(216, 208, 239, 1)),
    color-stop(88%, rgba(193, 191, 234, 1)),
    color-stop(100%, rgba(193, 191, 234, 1))
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(235, 233, 249, 1) 0%,
    rgba(216, 208, 239, 1) 33%,
    rgba(193, 191, 234, 1) 88%,
    rgba(193, 191, 234, 1) 100%
  );
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(235, 233, 249, 1) 0%,
    rgba(216, 208, 239, 1) 33%,
    rgba(193, 191, 234, 1) 88%,
    rgba(193, 191, 234, 1) 100%
  );
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    rgba(235, 233, 249, 1) 0%,
    rgba(216, 208, 239, 1) 33%,
    rgba(193, 191, 234, 1) 88%,
    rgba(193, 191, 234, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(235, 233, 249, 1) 0%,
    rgba(216, 208, 239, 1) 33%,
    rgba(193, 191, 234, 1) 88%,
    rgba(193, 191, 234, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ebe9f9', endColorstr='#c1bfea', GradientType=1 );
  cursor: pointer;
  &:hover .multi-button, .multi-button:focus-within   {
    opacity: 1;
    transition: 0.25s cubic-bezier(0.25, 0, 0, 1);
  }
  
}
i {
  font-size: 32px;
  cursor: pointer;
}
body .card .multi-button {
  z-index: 0;
    opacity: 0;
  position: absolute;
  right: 0%;
  border-radius: 100%;
  width: 0rem;
  height: 0rem;
  transform: translate(-50%, -50%);
  transition: 0.25s cubic-bezier(0.25, 0, 0, 1);
}
body .card .multi-button button {
  display: grid;
  place-items: center;
  position: absolute;
  width: 2.1rem;
  height: 2.1rem;
  border: none;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.25s cubic-bezier(0.25, 0, 0, 1);
  background-color: oldlace;
}

body .card .content {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}

</style>
