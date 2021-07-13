import axios from 'axios';

//constants
let initialState = {
    animes: [],
    loadingAnimes: true,
    errorAnimes: "",
    popularities: [],
    loadingPopularities: true,
    errorPopularities: "",
    animesByGenre: [],
    loadingAnimesByGenre: true,
    errorAnimesByGenre: "",
    genres: [],
    loadingGenres: true,
    errorGenres: "",
    search:[],
    loadingSearch:true,
    errorSearch:"",
    details:[],
    loadingDetails:true,
    errorDetails:""
}

let GET_ANIMES_REQUEST = "GET_ANIMES_REQUEST";
let GET_ANIMES_SUCCESS = "GET_ANIMES_SUCCESS";
let GET_ANIMES_FAILURE = "GET_ANIMES_FAILURE";

let GET_POPULARITIES_REQUEST = "GET_POPULARITIES_REQUEST";
let GET_POPULARITIES_SUCCESS = "GET_POPULARITIES_SUCCESS";
let GET_POPULARITIES_FAILURE = "GET_POPULARITIES_FAILURE";

let GET_ANIMESBYGENRE_REQUEST = "GET_ANIMESBYGENRE_REQUEST";
let GET_ANIMESBYGENRE_SUCCESS = "GET_ANIMESBYGENRE_SUCCESS";
let GET_ANIMESBYGENRE_FAILURE = "GET_ANIMESBYGENRE_FAILURE";

let GET_GENRES_REQUEST = "GET_GENRES_REQUEST";
let GET_GENRES_SUCCESS = "GET_GENRES_SUCCESS";
let GET_GENRES_FAILURE = "GET_GENRES_FAILURE";

let SEARCH_REQUEST = "SEARCH_REQUEST";
let SEARCH_SUCCESS = "SEARCH_SUCCESS";
let SEARCH_FAILURE = "SEARCH_FAILURE";

let DETAILS_REQUEST = "DETAILS_REQUEST";
let DETAILS_SUCCESS = "DETAILS_SUCCESS";
let DETAILS_FAILURE = "DETAILS_FAILURE";

//reducer
const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_ANIMES_REQUEST:
      return {
        ...state,
        loadingAnimes:false
      }
    case GET_ANIMES_SUCCESS:
      return {
        ...state,
        animes: action.payload,
        loadingAnimes: true
      }
    case GET_ANIMES_FAILURE:
      return {
        ...state,
        errorAnimes: action.payload,
        loadingAnimes:true
      }
    case GET_POPULARITIES_REQUEST:
      return {
        ...state,
        loadingPopularities:false
      }
    case GET_POPULARITIES_SUCCESS:
      return {
        ...state,
        popularities: action.payload,
        loadingPopularities: true
      }
    case GET_POPULARITIES_FAILURE:
      return {
        ...state,
        errorPopularities: action.payload,
        loadingPopularities:true
      }
      case GET_GENRES_REQUEST:
        return {
          ...state,
          loadingGenres:false
        }
      case GET_GENRES_SUCCESS:
        return {
          ...state,
          genres: action.payload,
          loadingGenres: true
        }
      case GET_GENRES_FAILURE:
        return {
          ...state,
          errorGenres: action.payload,
          loadingGenres:true
        }
      case SEARCH_REQUEST:
        return {
          ...state,
          loadingSearch:false
        }
      case SEARCH_SUCCESS:
        return {
          ...state,
          search: action.payload,
          loadingSearch: true
        }
      case SEARCH_FAILURE:
        return {
          ...state,
          errorSearch: action.payload,
          loadingSearch:true
        }
      case DETAILS_REQUEST:
        return {
          ...state,
          loadingDetails:false
        }
      case DETAILS_SUCCESS:
        return {
          ...state,
          details: [action.payload],
          loadingDetails: true
        }
      case DETAILS_FAILURE:
        return {
          ...state,
          errorDetails: action.payload,
          loadingDetails:true
        }
      case GET_ANIMESBYGENRE_REQUEST:
        return {
          ...state,
          loadingAnimesByGenre:false
        }
      case GET_ANIMESBYGENRE_SUCCESS:
        return {
          ...state,
          animesByGenre: action.payload,
          loadingAnimesByGenre: true
        }
      case GET_ANIMESBYGENRE_FAILURE:
        return {
          ...state,
          errorAnimesByGenre: action.payload,
          loadingAnimesByGenre:true
        }
   
    default:
      return state;
  }
}

//actionsCreator
export const getAnimes = (num) => {
    return async (dispatch,getState) => {
      dispatch({
        type:GET_ANIMES_REQUEST
      })

      let options = {
        method: 'POST',
        url: 'http://localhost:3001/animes/create',
        header:{
            ContentType: 'application/json',   
        },
        data:{
            offset: num
            }
      }
      await axios.request(options)
      .then(res => {
        dispatch({
          type: GET_ANIMES_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_ANIMES_FAILURE,
          payload: err.message
        })
      })
    }

}

export const getAnimesPopularities = () => {
  return async (dispatch,getState) => {
    dispatch({
      type:GET_POPULARITIES_REQUEST
    })
    await axios.get('http://localhost:3001/animes/popularity')
    .then(res => {
      dispatch({
        type: GET_POPULARITIES_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_POPULARITIES_FAILURE,
        payload: err.message
      })
    })
  }

}

export const getAnimesDB = () => {
  return async (dispatch,getState) => {
    dispatch({
      type:GET_ANIMESBYGENRE_REQUEST
    })
    await axios.get('http://localhost:3001/animes')
    .then(res => {
      dispatch({
        type: GET_ANIMESBYGENRE_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ANIMESBYGENRE_FAILURE,
        payload: err.message
      })
    })
  }

}

export const getGenres = () => {
  return async (dispatch,getState) => {
    dispatch({
      type:GET_GENRES_REQUEST
    })

    await axios.get('http://localhost:3001/genres')
    .then(res => {
        console.log(res.data)
      dispatch({
        type: GET_GENRES_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_GENRES_FAILURE,
        payload: err.message
      })
    })
  }
}

export const getAnimeByName = (name) => {
  return async (dispatch,getState) => {
    dispatch({
      type: SEARCH_REQUEST
    })

    await axios.get(`http://localhost:3001/animes/search/${name}`)
    .then(res => {
      dispatch({
        type: SEARCH_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: SEARCH_FAILURE,
        payload: err.message
      })
    })
  }

}

export const getAnimesByGenre = (nameGenre) => {
  return async (dispatch,getState) => {
    dispatch({
      type:GET_ANIMESBYGENRE_REQUEST
    })
    await axios.get('http://localhost:3001/animes')
    .then(res => {
      let newAnimes =[]
        for(let i = 0; i < res.data.length; i++){
          res.data[i].genres.map(point => {
            if(point === nameGenre){
              newAnimes.push(res.data[i])
            }
          })
        }
      dispatch({
        type: GET_ANIMESBYGENRE_SUCCESS,
        payload: newAnimes
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ANIMESBYGENRE_FAILURE,
        payload: err.message
      })
    })
  }

}

export const getAnimeDetails = (animeId) => {
  return async (dispatch,getState) => {
    dispatch({
      type: DETAILS_REQUEST
    })

    await axios.get(`http://localhost:3001/animes/details/${animeId}`)
    .then(res => {
      dispatch({
        type: DETAILS_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: DETAILS_FAILURE,
        payload: err.message
      })
    })
  }

}



export default reducer;