import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'

// 중앙 관리소 vuex
// 영구히 지속되어야 하는 데이터 : localStorage(쿠키)
// 브라우저가 닫히면 사라지는 데이터 : sessionStorage(세션) -> 이거 사용
// 그 외 컴포넌트끼리 임시로 주고받는 데이터
const store = createStore({
    plugins : [
        createPersistedState({
            storage: window.sessionStorage,
            paths : ['userNo','curShowPetType'] // SessionStorage에 관리될 state들은 여기에 선언해주어야함
        })
    ],
    state() {
        return {
            userNo : -1, // 서버 session이 무효화 or 로그아웃시 -1로 다시
            curShowPetType : '0' // 0 : dog, 1 : cat
        }
    },
    getters : {
        
    },  
    mutations : { //동기식, 직접 수정은 못하고 commit을 통해 밑의 함수명을 전달해야함
        reversePetType(state, payload){
            //state.curShowPetType = payload.value; { value : 10 } 형태일 시(자바스크립트 객체)
            state.curShowPetType = payload;
        },
        setUserNo(state, payload) {
            state.userNo = payload;
        }
    },
    actions : { // 비동기
        
        
        
    }
});

export default store;