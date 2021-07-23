import { createStore,combineReducers,compose,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import animesReducer, { getUser,getGenres,getAnimesDB,getAnimesPopularities } from './animesDuck/animesDuck';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let rootReducer = combineReducers({
    animedb: animesReducer
})

// let num = 0;

const generateStore = () =>{
  let store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk))
  )
  let userRegister = JSON.parse(localStorage.getItem("user"))
  // const createAnime = setInterval(()=>{
  //   getAnimes(num)(store.dispatch,store.getState);
  //   num+=20
  //   if(num > 30000 && num <= 30020){
  //     clearInterval(createAnime)
  //   }
  // },1000)
  getAnimesPopularities()(store.dispatch,store.getState);
  getAnimesDB()(store.dispatch,store.getState);
  getGenres()(store.dispatch,store.getState);
  getUser(userRegister)(store.dispatch,store.getState);
  return store
}   


export default generateStore;