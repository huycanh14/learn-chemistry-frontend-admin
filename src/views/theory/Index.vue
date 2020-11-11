<template>
	<div>
		<v-icon
			x-large
			color="blue darken-2"
			data-toggle="tooltip"
			data-placement="right"
			@click="show = true"
			v-if="show == false"
		>
			mdi-database-plus</v-icon
		>
		<v-expand-x-transition>
			<create @message-form-create="notShowForm" v-if="show == true"></create>
		</v-expand-x-transition>
		<br />
		<div class="list-content" v-for="theory in theories" :key="theory._id">
			<div class="action">
				<div class="row">
					<div class="col-2 offset-8">
						<button
							type="button"
							class="btn-outline-warning form-control btn btn-warning"
						>
							{{ $t("btn.update") }}
						</button>
					</div>
					<div class="col-2">
						<button
							type="button"
							class="btn-outline-danger form-control btn btn-danger"
						>
							{{ $t("btn.delete") }}
						</button>
					</div>
				</div>
			</div>
			<div class="container" v-html="theory.content"></div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Create from "./Create.vue";
import $ from "jquery";
export default {
	components: {
		Create,
	},
	data() {
		return {
			show: false,
		};
	},
	computed: {
		...mapState({
			theories: (state) => state.theories.theories,
		}),
	},
	created() {
		this.getTheoriesByLessonId(this.$route.params.id);
	},
	mounted() {
		$(document).ready(function($) {
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
				$("[title]").tooltip();
			});
		});
	},
	methods: {
		...mapActions({
			getTheoriesByLessonId: "theories/getTheoriesByLessonId",
		}),
		notShowForm() {
			this.show = false;
		},
	},
};
</script>

<style scoped>
i {
	font-size: 26px;
	cursor: pointer;
}
</style>
