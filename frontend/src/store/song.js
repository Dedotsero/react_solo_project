import { csrfFetch } from './csrf'

const LOAD = 'song/load'
const ADD_SONG = 'song/setSong'
const DELETE_SONG = 'song/deleteSong'

const load = (song) => {
  return {
    type: LOAD,
    song
  }
}

const addSong = (song) => {
  return {
    type: ADD_SONG,
    song
  }
}

  const deleteSong = (song) => {
    return {
      type: DELETE_SONG,
      song
    }
  }

export const getSongs = () => async (dispatch) => {
  const res = await fetch('/api/song')
  if(res.ok){
    const songList = await res.json()
    dispatch(load(songList))
  }
}

export const getAllSongs = () => async (dispatch) => {
  const res = await fetch('/api/song/all')
  if(res.ok){
    const songsList = await res.json()
    dispatch(load(songsList))
  }
}

export const createSong = (song) => async (dispatch) => {
  const { title, songUrl, userId, albumId } = song
  const res = await csrfFetch("/api/song", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      songUrl,
      userId,
      albumId
    })
  })
  if(res.ok){
    const createSong = await res.json()
    dispatch(addSong(createSong))
    return createSong
  }
}

export const editSong = (song) => async (dispatch) => {
  const { title, songUrl, userId, albumId } = song
  const res = await fetch(`/api/song/${song.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      songUrl,
      userId,
      albumId
    })
  })
  if(res.ok){
    const editSong = await res.json()
    dispatch(addSong(editSong))
    return editSong
  }
}

export const removeSong = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/song/${songId}`,{
    method: "DELETE"
  })
  const removeSong = await res.json()
  await dispatch(deleteSong(removeSong))
  return res
}

const initialState = {}

const sortList = (list) => {
  return list.sort((songA, songB) => {
    return songA.no - songB.no;
  }).map((song) => song.id);
};

const songReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    case LOAD: {
      const allSongs = {};
      action.list.forEach(song => {
        allSongs[song.id] = song;
      })
      return {
        ...allSongs,
        ...state,
        list: sortList(action.list),
      };
    }
    case ADD_SONG:
      newState = Object.assign({}, state)
      action.payload.forEach((song)=>{
        newState[song.id] = song
      })
      return newState
    case DELETE_SONG:
      newState = Object.assign({}, state)
      delete newState[action.payload.id]
      return newState
    default:
      return state
  }
}

export default songReducer;
