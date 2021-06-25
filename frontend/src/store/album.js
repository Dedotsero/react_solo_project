import { csrfFetch } from './csrf'

const SET_ALBUM = 'album/setEvent'
const DELETE_ALBUM = 'album/deleteEvent'

const setAlbum = (album) => {
  return {
    type: SET_ALBUM,
    payload: album
    }
  }

const deleteAlbum = (album) => {
  return {
    type: DELETE_ALBUM,
    payload: album
  }
}

export const createAlbum = (album)=> async() =>{
  const { title, imageUrl, userId } = album
  const response = await csrfFetch("/api/album", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      imageUrl,
      userId
    })
  })
  return response
}

export const getAlbums = () => async (dispatch) => {
  const res = await fetch('/api/album')
  const albumList = await res.json()
  await dispatch(setAlbum(albumList.albums))
  return res;
}

export const getAllAlbums = () => async (dispatch) => {
  const res = await fetch('/api/album/all')
  const albumsList = await res.json()
  await dispatch(setEvent(albumsList.albums))
  return res
}

export const editAlbum = (albumId) => async dispatch => {
  const res = await fetch(`/api/pokemon/${albumId}`,{
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      albumUrl,
      userId
    })
  })
  if(response.ok){
    const editPokemon = await response.json()
    dispatch(addOnePokemon(editPokemon))
    return editPokemon
  }
}

export const removeAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/album/${albumId}`,{
    method: "DELETE"
  })
  const removeAlbum = await res.json()
  await dispatch(deleteAlbum(removeAlbum))
  return res
}

const initialState = {}

const albumReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    case SET_ALBUM:
      newState = Object.assign({}, state)
      action.payload.forEach((album)=>{
        newState[album.id] = album
      })
      return newState
    case DELETE_ALBUM:
      newState = Object.assign({}, state)
      delete newState[action.payload.id]
      return newState
    default:
      return state
  }
}

export default albumReducer;
