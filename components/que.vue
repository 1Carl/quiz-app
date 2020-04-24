<template>
    <v-flex xs12>
        <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ quest.question }}</div>
                </div> 
            </v-card-title>
            <v-card-text>
                Your Proress: {{ progress }}/10
            </v-card-text>
             <v-list color="blue-grey darken-2" class="white--text" v-if="ans">
                <v-list-item-group >
                    <v-list-item
                    v-for="(answer, i) in quest.answers"
                    :key="i"
                    @click="show(i)"
                    :class="'list'+i"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="answer">{{ answer }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-card-actions  align-content-space-around>
                <v-spacer></v-spacer>
                <v-btn class="buttn" :disabled="answered" color="indigo" @click="checkAns">Submit</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="buttn" :disabled="!answered" @click="skipAns()" text color="warning">Next</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
export default {
    name: 'que',
    props: [
        'quest', 'id', 'progress' 
    ],
    data(){
        return{
            model: '',
            ans:false,
            correc: '',
            answered: false
        }
    },
    methods: {
        show(i){
            if(this.model === i){
                this.model = ''
            }
            else{
                this.model = i;
            }
        },
        checkAns(){
            this.correc = _.indexOf(this.quest.answers, _.toString(this.quest.correct_answer))
            if(this.model == this.correc){
                this.$emit('correct');
                $('.list'+this.model).addClass('correct')
            }
            else{
                $('.list'+this.model).addClass('incorrect')
                $('.list'+this.correc).addClass('correct')
            } 
            this.answered = true
        },
        async sho(){
            this.ans = await true
        },
        async skipAns(){
            await $('.list'+this.model).removeClass('incorrect');
            await $('.list'+this.correc).removeClass('correct')
            this.model = ''
            this.correc= ''
            await this.$emit('next')
            this.model = await ''
            this.answered = false
        }
    }, 
    mounted(){
        this.sho()
    }
}
</script>
<style scoped>
    .buttn{
        width: 150px;
    }
    .correct{
        background-color: green;
    }
    .incorrect{
        background-color: red;
    }
</style>