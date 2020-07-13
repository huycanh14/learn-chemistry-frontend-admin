<template>
    <v-card outlined elevation="7">
        <v-container>
            <v-form>
                <div class="form-group">
                    <label >{{ $t('theory.content')}}</label>
                    <ckeditor id="create-lesson" 
                        :editor="editor" 
                        v-model="theory.content" 
                        :config="editorConfig" 
                        :disabled="editorDisabled "
                        @ready="onReady"
                        v-bind:placeholder="$t('theory.content')"
                        class="form-control"
                    ></ckeditor>
                </div>
                <div class="form-group">
                    <label >{{ $t('theory.status')}}</label>
                     <v-col>
                        <v-radio-group v-model="theory.activated" row>
                            <v-radio :label="$t('theory.active')" :value="true"></v-radio>
                            <v-radio :label="$t('theory.inactive')" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>
                </div>
               
                <div class="text-center">
                    <v-btn class="mx-2"  dark large color="cyan" @click="createTheory">
                        {{ $t('btn.create') }}
                    </v-btn>
                    <v-btn class="mx-2" dark large color="warning" @click="cancel">
                        {{ $t('btn.cancel') }}
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
    
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            editor: DecoupledEditor,
            editorDisabled: false,
            editorConfig: {
                placeholder: this.$t('theory.content'),
    //             toolbar : [
	// 	{ name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
	// 	{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	// 	{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
	// 	{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
	// 	'/',
	// 	{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
	// 	{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
	// 	{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
	// 	{ name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
	// 	'/',
	// 	{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
	// 	{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	// 	{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
	// 	{ name: 'about', items: [ 'About' ] }
	// ]
            },
            theory: {
                content: "",
                activated: false,
            }
        }
    },
    computed: {
        ...mapState({
            lesson: state => state.lessons.lesson
        })
    },
    watch: {
    },
    methods: {
        ...mapActions({
            createTheory: "theories/createTheory"
        }),
        onReady( editor )  {
            console.log(Array.from( editor.ui.componentFactory.names() ), 1)
            Array.from( editor.ui.componentFactory.names() );
            editor.ui.getEditableElement().parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement(),
            );
        },
        createTheory(){
            if(this.theory.content === "") {
                this.$toast.warning(this.$t('messages.required'))
                return false;
            }
            let data = {
                content: this.theory.content,
                activated: this.theory.activated,
                grade_id: this.lesson.relationships.grade_id,
                chapter_id: this.lesson.relationships.chapter_id,
                lesson_id: this.lesson._id,
            };
            this.createTheory(data).then(response => {
                if(response.status == 200) {
                    this.$toast.success(this.$t('messages.create_success'));
                    this.$emit('message-form-create')
                } else {
                    this.$toast.error(this.$t('messages.create_error'))
                }
            });

        },
        cancel(){
            this.$emit('message-form-create')
        }
    },
}
</script>

<style lang="scss" scoped>
.ck-editor__editable {
    min-height: 650px;
    max-height: 650px;
    background-color: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    color: #66615b;
    line-height: normal;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    box-shadow: none;
}   
</style>