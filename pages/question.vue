<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <que 
      v-if="i<10"
      v-bind:quest="questions[i]"
      :id="i"
      :progress="i+1"
      @next="next"
      @correct="correct"
      />
    <v-card v-else> 
      <v-card-title primary-title>
        You answered {{ corr }} questions correct.
      </v-card-title>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="retry()">Retry</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import axios from 'axios'
import que from '~/components/que'
import _ from 'lodash'


export default {
  components: {
    que
  },
    data(){
        return{
            questions: [{
              question: 'example question'
            }
            ],
            i: 0,
            corr: 0
        }
    },
    async beforeCreate() {
        this.questions = await this.$store.getters.quiz;
        if(this.questions.length > 1){
          for(let j=0; j<this.questions.length; j++){
            this.questions[j].answers = await _.concat(this.questions[j].incorrect_answers, this.questions[j].correct_answer)
            this.questions[j].answers = await _.shuffle(this.questions[j].answers)
          }
        }
        else{
          await this.$store.commit('check');
          await this.$router.push('/');
        }
    },
    methods: {
      next(){
        this.i++
      },
      correct(){
        this.corr++;
      },
      retry(){
        this.$router.push('/')
      }
    }
}
</script>