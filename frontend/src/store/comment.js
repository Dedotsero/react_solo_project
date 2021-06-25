import { csrfFetch } from './csrf'

const LOAD = 'comment/load'
const ADD_COMMENT = 'comment/setComment'
const DELETE_COMMENT = 'comment/deleteComment'

const load = (comment) => {
  return {
    type: LOAD,
    comment
  }
}

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

  const deleteComment = (comment) => {
    return {
      type: DELETE_COMMENT,
      comment
    }
  }

export const getComments = () => async (dispatch) => {
  const res = await fetch('/api/comment')
  if(res.ok){
    const commentList = await res.json()
    dispatch(load(commentList))
  }
}

export const getAllComments = () => async (dispatch) => {
  const res = await fetch('/api/comment/all')
  if(res.ok){
    const commentsList = await res.json()
    dispatch(load(commentsList))
  }
}

export const commentSong = (comment) => async (dispatch) => {
  const { content, songId, userId } = comment
  const res = await csrfFetch("/api/comment", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      songId,
      userId
    })
  })
  if(res.ok){
    const createComment = await res.json()
    dispatch(addComment(createComment))
    return createComment
  }
}

export const editComment = (comment) => async (dispatch) => {
  const { content, songId, userId } = comment
  const res = await fetch(`/api/song/${comment.id}`,{
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      songId,
      userId
    })
  })
  if(res.ok){
    const editComment = await res.json()
    dispatch(addComment(editComment))
    return editComment
  }
}

export const removeComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comment/${commentId}`,{
    method: "DELETE"
  })
  const removeComment = await res.json()
  await dispatch(deleteComment(removeComment))
  return res
}

const initialState = {}

const sortList = (list) => {
  return list.sort((commentA, commentB) => {
    return commentA.no - commentB.no;
  }).map((comment) => comment.id);
};

const commentReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    case LOAD: {
      const allComments = {};
      action.list.forEach(comment => {
        allComments[comment.id] = comment;
      })
      return {
        ...allComments,
        ...state,
        list: sortList(action.list),
      };
    }
    case ADD_COMMENT:
      newState = Object.assign({}, state)
      action.payload.forEach((comment)=>{
        newState[comment.id] = comment
      })
      return newState
    case DELETE_COMMENT:
      newState = Object.assign({}, state)
      delete newState[action.payload.id]
      return newState
    default:
      return state
  }
}

export default commentReducer;
