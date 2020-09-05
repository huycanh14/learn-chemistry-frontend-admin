<template>
    <form @submit.prevent="doCreate">
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <div class="form-group">
                    <label>{{ $t('lesson.lesson_number') }} </label>
                    <input type="number" class="form-control" v-bind:placeholder="$t('lesson.lesson_number')" v-model="lesson.lesson_number" required min="1"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <div class="form-group">
                    <label>{{ $t('lesson.title') }} </label>
                    <input type="text" class="form-control" v-bind:placeholder="$t('lesson.title')" v-model="lesson.title" required/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <div class="form-group">
                    <label>{{ $t('lesson.description') }} </label>
                    <!-- <ckeditor id="create-lesson" 
                        :editor="editor" 
                        v-model="lesson.description" 
                        :config="editorConfig" 
                        :disabled="editorDisabled "
                        @ready="onReady"
                        v-bind:placeholder="$t('lesson.description')"
                        class="form-control"
                    ></ckeditor> -->
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-12 col-12 pr-1">
                <label class="pr-4">{{ $t('lesson.status') }}:</label> 
                <div class="form-check form-check-inline pr-4">
                    <input class="form-check-input" type="radio" name="activated" v-model="lesson.activated" value="true">
                    <label class="form-check-label" for="inlineRadio1">{{ $t('lesson.active') }}</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="activated" v-model="lesson.activated" value="false">
                    <label class="form-check-label" for="inlineRadio2">{{ $t('lesson.inactive') }}</label>
                </div>
            </div>  
        </div>
        <div class="row">
            <div class="update ml-auto mr-auto">
                <button type="submit" class="btn btn-primary btn-round"> {{ $t('btn.create')}}</button>
            </div>
        </div>
    </form>
</template>
<script>
import { mapActions, mapState } from 'vuex'
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import $ from "jquery";
export default {
    data() {
        return {
            lesson: {
                title: '',
                activated: true,
                lesson_number: 1,
                description: '',
            },
            // editor: DecoupledEditor,
            editorDisabled: false,
            editorConfig: {
                placeholder: this.$t('lesson.description'),
                extraPlugins: 'fixed'
                
            }
        }
    },
    computed: {
        ...mapState({
            chapter: state => state.chapters.chapter
        }),
    },
    methods: {
        ...mapActions({
            createLesson: 'lessons/createLesson'
        }),
        doCreate() {
            if(this.lesson.description === "") {
                this.$toast.warning(this.$t('messages.required'))
                return false;
            }
            let data = {
                title: this.lesson.title,
                description: this.lesson.description,
                lesson_number: this.lesson.lesson_number,
                activated: this.lesson.activated,
                chapter_id: this.chapter._id,
                grade_id: this.chapter.relationships.grade_id,
            }
            this.createLesson(data).then(response => {
                if(response.status == 200) {
                    this.$toast.success(this.$t('messages.create_success'))
                } else {
                    this.$toast.error(this.$t('messages.create_error'))
                }
            });
        },
        onReady( editor )  {
            editor.ui.getEditableElement().parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
        }
    },
    beforeCreate(){
       
    },
    mounted() {
        // $(document).ready(function ($) {
        //     con
        //     $('#create-lesson').click(function() { 
        //         console.log('click ckeditor')
        //     });
        // })
    },
    
    
}
</script>
<style lang="scss" scoped>
form {
    text-align: left;
}
.ck-editor__editable {
    min-height: 250px;
    background-color: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    color: #66615b;
    line-height: normal;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    box-shadow: none;
}
</style>