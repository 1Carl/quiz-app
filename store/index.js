import Vuex from 'vuex'


const createStore = () => { 
    return new Vuex.Store({
        state: {
            questions: [], 
            chose: false,     
        },
        mutations: {
            async fetque (state, questions){
                state.questions = await questions;
                state.chose = false;
            },
            async check ( state){
                state.chose = await true;
            }
        },
        getters: {
            quiz: state => {
                return state.questions
            },
            chec: state => {
                return state.chose
            }
        }
    })
}
export default createStore