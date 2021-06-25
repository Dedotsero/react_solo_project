import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as albumActions from '../../store/albums'
import './CreateAlbum.css'
import { useHistory, useParams } from "react-router-dom"
import { csrfFetch } from '../../store/csrf'

export default function CreateAlbumComponent(){
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const sessionUser = useSelector(state => state.session.user)
  const userId = sessionUser.id

  const dispatch = useDispatch()
  let history = useHistory()

  const { id } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/albums');
    return dispatch(albumActions.createAlbum({ title, imageUrl, userId }))
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await csrfFetch(`/api/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        imageUrl,
        userId
      })
    })
    history.push('/albums');
    return res.json();
  }

  let correctForm;

  if(window.location.href === `http://localhost:3000/albums/${id}`){
    correctForm = (
      <form onSubmit={handleEdit}>
        <div>
          <div>
            <label>Album Title:</label>
          </div>
          <div>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label>Album Cover Art URL:</label>
          </div>
          <div>
            <input
              type='text'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Submit Changes</button>
      </form>
    )
  } else {
    correctForm = (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Album Title:</label>
          </div>
          <div>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label>Album Cover Art URL:</label>
          </div>
          <div>
            <input
              type='text'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">CreateAlbum</button>
      </form>
    )
  }
  return(
    <div className='background'>
      <div className='albumContainer'>
        {correctForm}
      </div>
    </div>
  )
}
