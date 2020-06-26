<template>
    <tr>
        <td> {{index + 1}} </td>
        <td>
            <div v-show = "edit == false" 
                @dblclick = "edit = true" 
                :title="$t('clicks.dbclick')" 
                data-toggle="tooltip" 
                data-placement="left"
            >
                {{payload.name}}
            </div>
            <div class="form-group" v-show = "edit == true" >
                    <label>{{ $t('form_grade.name') }} </label>
            <input
                v-model = "grade.name"
                class="form-control"
                v-bind:placeholder="$t('form_grade.name')"
            />
            </div>
        </td>
        <td >{{payload.created_at | numberToDate}}</td>
        <td>{{payload.updated_at | numberToDate}}</td>
        
        <td v-if="payload.activated == true" 
            @dblclick = "edit = true"
            :title="$t('clicks.dbclick')" 
            data-toggle="tooltip" 
            data-placement="right"
            v-show = "edit == false"
        >{{$t('form_grade.active')}}</td>

        <td v-if="payload.activated == false" 
            @dblclick = "edit = true"
            :title="$t('clicks.dbclick')" 
            data-toggle="tooltip" 
            data-placement="right"
            v-show = "edit == false"
        >{{$t('form_grade.inactive')}}</td>

        <div class="form-group" v-show = "edit == true">
            <label >{{ $t('form_grade.status') }}</label>
            <select class="form-control" v-model="grade.activated">
                <option value="true"> {{ $t('form_grade.active') }} </option>
                <option value="false"> {{ $t('form_grade.inactive') }} </option>
            </select>
        </div>
        <td v-show = "edit == false" class="text-right"></td>
        <td v-show = "edit == true" class="text-right"> 
            <i class="nc-icon nc-check-2 text-success" 
                :title="$t('clicks.update')"
                data-toggle="tooltip" 
                data-placement="right"
                @click="updateValue"
            ></i>
        </td>
        <td v-show = "edit == true" class="text-right"> 
            <i class="nc-icon nc-simple-remove text-danger" 
                :title="$t('clicks.cancel')"
                data-toggle="tooltip" 
                data-placement="right"
                @click="cancelUpdate"
            ></i>
        </td>
        <td v-show = "edit == false" class="text-right"> 
            <i class="nc-icon nc-simple-delete text-danger" 
                :title="$t('clicks.delete')"
                data-toggle="tooltip" 
                data-placement="right"
                @click="deleteItem"
            ></i>
        </td>
    </tr>
</template>
<script>
import $ from "jquery";
export default {
    props: {
        payload: {
        },
        index: {}
    },
    data() {
        return {
            edit: false,
            grade: {},
        }
    },
    mounted() {
        $(document).ready(function ($) {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        })
    },
    methods: {
        updateValue(){
            this.edit = false;
            this.$store.dispatch('grades/updateGrade', this.grade).then(response => {
                if(response.status == 200) {
                    this.$toast.success(this.$t('messages.update_success'))
                } else {
                    this.$toast.error(this.$t('messages.update_error'))
                }
            });
        },
        cancelUpdate() {
            this.grade = { ...this.payload };
            this.edit = false;
            
        },
        deleteItem(){
            this.$store.dispatch('grades/deleteGrade', this.grade._id).then(response => {
                if(response.status == 200) {
                    this.$toast.success(this.$t('messages.delete_success'))
                } else {
                    this.$toast.error(this.$t('messages.delete_error'))
                }
            });
        }
    },
    filters: {
        numberToDate: function(value) {
            return `${new Date(value).toLocaleString().split(',')[1]} - ${new Date(value).toLocaleString().split(',')[0]}`;
        },

    },
    created() {
        this.grade = { ...this.payload };
    }
}
</script>

<style lang="scss" scoped>
i{
    font-size:32px;
    cursor: pointer;
    // color: #ffa500;
}
</style>