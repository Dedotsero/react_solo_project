import { csrfFetch } from './csrf'

const LOAD = 'album/load'
const ADD_ALBUM = 'album/setAlbum'
const DELETE_ALBUM = 'album/deleteAlbum'

const load = (album) => {
  return {
    type: LOAD,
    album
  }
}
const addAlbum = (album) => {
  return {
    type: ADD_ALBUM,
    album
    }
  }

const deleteAlbum = (album) => {
  return {
    type: DELETE_ALBUM,
    album
  }
}

export const getAlbums = () => async (dispatch) => {
  const res = await fetch('/api/albums')
  if(res.ok){
    const albumList = await res.json()
    dispatch(load(albumList))
  }
}

export const getAllAlbums = () => async (dispatch) => {
  const res = await fetch('/api/albums/all')
  if(res.ok){
    const albumsList = await res.json()
    dispatch(load(albumsList))
  }
}

export const createAlbum = (album) => async (dispatch) => {
  const { title, imageUrl, userId } = album
  const res = await csrfFetch("/api/albums", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      imageUrl,
      userId
    })
  })
  if(res.ok){
    const createAlbum = await res.json()
    dispatch(addAlbum(createAlbum))
    return createAlbum
  }
}


export const editAlbum = (album) => async (dispatch) => {
  const { title, imageUrl, userId } = album
  const res = await fetch(`/api/albums/${album.id}`,{
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      imageUrl,
      userId
    })
  })
  if(res.ok){
    const editAlbum = await res.json()
    dispatch(addAlbum(editAlbum))
    return editAlbum
  }
}

export const removeAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`,{
    method: "DELETE"
  })
  const removeAlbum = await res.json()
  await dispatch(deleteAlbum(removeAlbum))
  return res
}

const initialState = {}

const sortList = (list) => {
  return list.sort((albumA, albumB) => {
    return albumA.no - albumB.no;
  }).map((album) => album.id);
};

const albumReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    case LOAD: {
      const allAlbums = {};
      action.payload.forEach(album => {
        allAlbums[album.id] = album;
      })
      return {
        ...allAlbums,
        ...state,
        list: sortList(action.list),
      };
    }
    case ADD_ALBUM:
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
