<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card sm3 xs6 color="blue-grey darken-2" class="white--text">
      <v-card-title primary-title class="set">
        Simple Quiz app
      </v-card-title>
      <v-card-text class="set red" v-if="showAlert">
        You have to choose category and difficulty first.
      </v-card-text>
      <v-form class="set">
          <v-select 
            class="sel"
            :items="cate"
            v-model="quiz.cate"
            label="Category"
            item-text="name"
            item-value="id"
            outlined
            dense
            color="cyan"
            style="width: 80%"
            selected="Books"
          ></v-select>
          <v-select
            class="sel"
            :items="diff"
            v-model="quiz.diff"
            label="Difficult"
            outlined
            dense
            color="cyan"
            style="width: 80%"
          ></v-select>
      </v-form>
      <v-card-actions class="set">
        <v-btn color="success" class="indigo" @click="choose()">Let's start</v-btn>
      </v-card-actions>
    </v-card>
    
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  components: {
    
  },
  data(){
    return {
      diff: ['easy', 'medium', 'hard'],
      cate: [
        {name: "General Knowledge", id: 9},
        {name: "Books", id: 10},
        {name: "Film", id: 11},
        {name: "Music", id: 12},
        {name: "Musicals & Theatres", id: 13},
        {name: "Televsion", id: 14},
        {name: "Video Games", id: 15},
        {name: "Board Games", id: 16},
        {name: "Science & Nature", id: 17},
        {name: "Computer Science", id: 18},
        {name: "Mathematics", id: 19},
        {name: "Mythology", id: 20},
        {name: "Sports", id: 21},
        {name: "Geography", id: 22},
        {name: "History", id: 23},
        {name: "Politics", id: 24},
        {name: "Art", id: 25},
        {name: "Celebrities", id: 26},
        {name: "Animals", id: 27},
        {name: "Vehicles", id: 28},
        {name: "Entertainment", id: 29},
        {name: "Gadgets", id: 30},
        {name: "Anime & Manga", id: 31},
        {name: "Cartoon & Animations", id: 32}
      ],
      quiz:{
        cate: {},
        diff: ""
      },
      questions: [],
      showAlert: false
    }
  },

  beforeMount(){
    this.quiz.cate = this.cate[0].id;
    this.quiz.diff = this.diff[0];
    this.che();
  },
  methods: {
    async choose(){
      await  axios.get('https://opentdb.com/api.php?amount=10&category='+this.quiz.cate+'&difficulty='+this.quiz.diff+'&type=multiple')
            .then(res => this.questions = res.data.results)
            .catch(err => console.log(err))
            .then(res => this.$store.commit('fetque', this.questions))
            .then(res => this.$router.push('/question'))
    },
    async che(){
      this.showAlert = await this.$store.getters.chec
    }
  }
}
</script>
<style scoped>
  .set{
    justify-content: center;
    align-content: center;
  }
  .sel{
    margin-left: 10%;
  }
  v-card-title{
    text-align: center;
    align-self: center;
    align-items: center;
  }
  .red{
    margin-bottom: 20px;
  }
</style>