import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWpAPIStore = defineStore('wpAPI', () => {
  const url = 'https://christinaneal.me/wp-json/wp/v2'
  const songsUrl = '/songs'
  const postsUrl = '/posts'

  const posts = ref()
  const songs = ref()
  const details = ref()

  const getDetails = async () => {
    try {
      const response = await fetch(`${url}`)
      details.value = await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  const getPosts = async () => {
    try {
      const response = await fetch(`${url}${postsUrl}`)
      posts.value = await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  const getSongs = async () => {
    try {
      const response = await fetch(`${url}${songsUrl}`)
      songs.value = await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  return {
    url,
    songsUrl,
    postsUrl,
    posts,
    songs,
    details,
    getDetails,
    getPosts,
    getSongs
  }
})
