<template>
	<v-form ref="form" lazy-validation v-model="valid">
		<v-container class="lighten-5">
			<v-row>
				<v-col align="right" v-show="edit == false">
					<v-icon
						x-large
						color="blue darken-2"
						:title="$t('lesson.title_update')"
						data-toggle="tooltip"
						data-placement="right"
						@click="showFormEdit"
						>mdi-tooltip-edit</v-icon
					>
				</v-col>
			</v-row>
			<v-row align="center">
				<v-col cols md="3" xs="5" sm="5">
					{{ $t("lesson.card_title") }}
				</v-col>

				<v-col v-show="edit == false">
					<p class="pa-2">
						{{ payload.lesson_number }}
					</p>
				</v-col>
				<v-col v-show="edit == true">
					<v-text-field
						name="number"
						type="number"
						min="1"
						solo
						v-model="lesson.lesson_number"
						required
						:rules="[(v) => !!v || 'This is required']"
					></v-text-field>
				</v-col>
			</v-row>

			<v-row align="center">
				<v-col cols md="3" xs="5" sm="5">
					{{ $t("lesson.title") }}
				</v-col>

				<v-col v-show="edit == false">
					<p class="pa-2">{{ payload.title }}</p>
				</v-col>
				<v-col v-show="edit == true">
					<v-text-field
						name="number"
						type="text"
						required
						solo
						v-model="lesson.title"
						:rules="[(v) => !!v || 'This is required']"
					></v-text-field>
				</v-col>
			</v-row>

			<v-row align="center">
				<v-col cols md="3" xs="5" sm="5">
					{{ $t("lesson.description") }}
				</v-col>

				<v-col v-show="edit == false">
					<p class="pa-2" v-html="payload.description">
						{{ payload.description }}
					</p>
				</v-col>
				<v-col v-show="edit == true">
					<!-- <ckeditor id="create-lesson" 
                        :editor="editor" 
                        v-model="lesson.description" 
                        :config="editorConfig" 
                        :disabled="editorDisabled "
                        @ready="onReady"
                        required
                        v-bind:placeholder="$t('lesson.description')"
                        class="form-control"
                        :rules="[v => !!v || 'This is required']"
                    ></ckeditor> -->
                    <textarea
                        name="editor1"
                        id="editor1"
                        v-model="lesson.description" 
                    ></textarea>
                    {{lesson.description}}
				</v-col>
			</v-row>

			<v-row align="center">
				<v-col cols md="3" xs="5" sm="5">
					{{ $t("lesson.status") }}
				</v-col>

				<v-col v-show="edit == false">
					<p class="pa-2" v-if="payload.activated == true">
						{{ $t("lesson.active") }}
					</p>
					<p class="pa-2" v-if="payload.activated == false">
						{{ $t("lesson.inactive") }}
					</p>
				</v-col>
				<v-col v-show="edit == true">
					<v-radio-group v-model="lesson.activated" row>
						<v-radio :label="$t('lesson.active')" :value="true"></v-radio>
						<v-radio :label="$t('lesson.inactive')" :value="false"></v-radio>
					</v-radio-group>
				</v-col>
			</v-row>

			<v-row align="center" v-show="edit == true">
				<v-col cols md="3" xs="5" sm="5">
					{{ $t("form_grade.name") }}
				</v-col>
				<v-col class="d-flex">
					<v-select
						item-text="name"
						item-value="_id"
						v-model="lesson.relationships.grade_id"
						:items="grades"
						@change="onChangeGrade"
						required
						solo
						:rules="[(v) => !!v || 'This is required']"
					>
					</v-select>
				</v-col>
			</v-row>

			<v-row align="center" v-show="edit == true">
				<v-col cols md="3" xs="5" sm="5">
					{{ $t("table_chapter._title") }}
				</v-col>
				<v-col class="d-flex">
					<v-select
						:item-text="
							(item) =>
								`${$t('table_chapter.chapter_number')} ${
									item.chapter_number
								}: ${item.title}`
						"
						item-value="_id"
						v-model="lesson.relationships.chapter_id"
						:items="chapters"
						solo
						required
						:rules="[(v) => !!v || 'This is required']"
					>
					</v-select>
				</v-col>
			</v-row>

			<div class="text-center" v-show="edit == true">
				<v-btn class="mx-2" dark large color="cyan" @click="doUpdate">
					{{ $t("btn.update") }}
				</v-btn>
				<v-btn class="mx-2" dark large color="warning" @click="edit = false">
					{{ $t("btn.cancel") }}
				</v-btn>
			</div>
		</v-container>
	</v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import $ from "jquery";
export default {
	data() {
		return {
			edit: false,
			editorDisabled: false,
			editorConfig: {
				placeholder: this.$t("lesson.description"),
			},
			valid: true,
			lesson: {
				relationships: {
					grade_id: "",
					chapter_id: "",
				},
			},
		};
	},
	computed: {
		...mapState({
			payload: (state) => state.lessons.lesson,
			grades: (state) => state.grades.grades,
			chapters: (state) => state.chapters.chapters,
		}),
	},
	created() {
		this.getListGrades();
	},
	watch: {
        'lesson.description'(value){
            // eslint-disable-next-line no-undef
            CKEDITOR.instances['editor1'].setData(value);
            console.log(value);
        }
    },
	filters: {},
	methods: {
		onReady(editor) {
			editor.ui
				.getEditableElement()
				.parentElement.insertBefore(
					editor.ui.view.toolbar.element,
					editor.ui.getEditableElement(),
				);
		},
		...mapActions({
			getListChapters: "chapters/getListChapters",
			getListGrades: "grades/getListGrades",
			updateLesson: "lessons/updateLesson",
		}),
		async showFormEdit() {
			this.lesson = JSON.parse(JSON.stringify(this.payload));
			await this.getListChapters(this.payload.relationships.grade_id);
			this.edit = true;
		},

		async onChangeGrade() {
			this.lesson.relationships.chapter_id = "";
			await this.getListChapters(this.lesson.relationships.grade_id);
		},

		doUpdate() {
			if (this.lesson.description === "" || !this.$refs.form.validate()) {
				this.$toast.warning(this.$t("messages.required"));
				return false;
			}
			this.updateLesson(this.lesson).then((response) => {
				if (response.status == 200) {
					this.$toast.success(this.$t("messages.update_success"));
					this.edit = false;
				} else {
					this.$toast.error(this.$t("messages.update_error"));
				}
			});
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
                    // eslint-disable-next-line no-undef
                    CKEDITOR.replace( 'editor1' );
                    // let editor = CKEDITOR.instances.editor1;
                    // eslint-disable-next-line no-undef
                    CKEDITOR.instances['editor1'].setData(vm.lesson.description);
                    console.log(vm.lesson);
                    // CKEDITOR.replace( 'editor1' );
				};
			});
		});
	},
};
</script>

<style scoped>
.ck-editor__editable {
	min-height: 250px;
	background-color: #ffffff;
	border: 1px solid #dddddd;
	border-radius: 4px;
	color: #66615b;
	line-height: normal;
	border-color: black !important;
	transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
		background-color 0.3s ease-in-out;
	box-shadow: none;
}
i {
	font-size: 26px;
	cursor: pointer;
}
</style>
