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
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="answer">{{ answer }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-card-actions  align-content-space-around>
                <v-spacer></v-spacer>
                <v-btn class="buttn" color="indigo" @click="checkAns">Submit</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="buttn" @click="skipAns" text color="warning">Skip</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'que',
    props: [
        'quest', 'id', 'progress' 
    ],
    data(){
        return{
            model: '',
            ans:false
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
            if(this.model == _.indexOf(this.quest.answers, _.toString(this.quest.correct_answer))){
                this.$emit('correct');
            }
            else this.$emit('next');
            this.model = ''
        },
        async sho(){
            this.ans = await true
        },
        skipAns(){
            this.$emit('next')
            this.model = ''
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
</style>