<template>
	<v-card outlined elevation="7">
		<v-container>
			<v-form>
				<div class="form-group">
					<label>{{ $t("theory.content") }}</label>
					<textarea
						name="create-theory"
						id="create-theory"
					></textarea>
				</div>
				<div class="form-group">
					<label>{{ $t("theory.status") }}</label>
					<v-col>
						<v-radio-group v-model="theory.activated" row>
							<v-radio :label="$t('theory.active')" :value="true"></v-radio>
							<v-radio :label="$t('theory.inactive')" :value="false"></v-radio>
						</v-radio-group>
					</v-col>
				</div>

				<div class="text-center">
					<v-btn class="mx-2" dark large color="cyan" @click="createTheory">
						{{ $t("btn.create") }}
					</v-btn>
					<v-btn class="mx-2" dark large color="warning" @click="cancel">
						{{ $t("btn.cancel") }}
					</v-btn>
				</div>
			</v-form>
		</v-container>
	</v-card>
</template>

<script>
/*global CKEDITOR*/
/*eslint no-undef: "error"*/
import $ from "jquery";
import { mapState, mapActions } from "vuex";
export default {
	data() {
		return {
			theory: {
				content: "",
				activated: false,
			},
		};
	},
	computed: {
		...mapState({
			lesson: (state) => state.lessons.lesson,
		}),
	},
	watch: {},
	methods: {
		...mapActions({
			createTheory: "theories/createTheory",
		}),
		onReady(editor) {
			console.log(Array.from(editor.ui.componentFactory.names()), 1);
			Array.from(editor.ui.componentFactory.names());
			editor.ui
				.getEditableElement()
				.parentElement.insertBefore(
					editor.ui.view.toolbar.element,
					editor.ui.getEditableElement(),
				);
		},
		createTheory() {
			if (this.theory.content === "") {
				this.$toast.warning(this.$t("messages.required"));
				return false;
			}
			let data = {
				content: this.theory.content,
				activated: this.theory.activated,
				grade_id: this.lesson.relationships.grade_id,
				chapter_id: this.lesson.relationships.chapter_id,
				lesson_id: this.lesson._id,
			};
			this.createTheory(data).then((response) => {
				if (response.status == 200) {
					this.$toast.success(this.$t("messages.create_success"));
					this.$emit("message-form-create");
				} else {
					this.$toast.error(this.$t("messages.create_error"));
				}
			});
		},
		cancel() {
			this.$emit("message-form-create");
		},
	},
	mounted() {
		var vm = this;
		$(document).ready(function($) {
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
				$("[title]").tooltip();

				let ckeditor_js = document.createElement("script");
				ckeditor_js.setAttribute("src", "/ckeditor/ckeditor.js");
				ckeditor_js.async = true;
				document.head.appendChild(ckeditor_js);
				ckeditor_js.onload = () => {
					CKEDITOR.replace("create-theory");
					let editor = CKEDITOR.instances["create-theory"];
					editor.on("change", () => {
						vm.lesson.description = editor.getData();
					});
				};
			});
		});
	},
	destroyed() {
		if (CKEDITOR.instances["create-theory"]) {
			CKEDITOR.instances["create-theory"].destroy();
			this.count=0;
		}
	},
};
</script>

<style lang="scss" scoped>
.ck-editor__editable {
	min-height: 650px;
	max-height: 650px;
	background-color: #ffffff;
	border: 1px solid #dddddd;
	border-radius: 4px;
	color: #66615b;
	line-height: normal;
	transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
		background-color 0.3s ease-in-out;
	box-shadow: none;
}
</style>
