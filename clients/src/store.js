import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            curShowPetType : '0' // 0 : dog, 1 : cat
        }
    },
    getters : {
        
    },  
    mutations : { //동기식, 직접 수정은 못하고 commit을 통해 밑의 함수명을 전달해야함
        reversePetType(state, value){
            state.curShowPetType = value;
        }
    },
    // actions : { // 비동기
    //     
    //     
    //     
    // }
});

export default store;