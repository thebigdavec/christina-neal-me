<script setup>
import { useWpAPIStore } from './stores/wpAPI'
import { storeToRefs } from 'pinia'
import { decode } from 'html-entities'
import { reactive, ref } from 'vue'

const wpAPI = useWpAPIStore()

const { posts, songs, details } = storeToRefs(wpAPI)

const soloMode = ref(true)

const isShowing = reactive({
  posts: false,
  songs: false,
  details: false
})

const fetchPosts = async () => {
  if (soloMode.value) {
    isShowing.songs = false
    isShowing.details = false
  }
  isShowing.posts = true

  if (posts.value?.length) return
  await wpAPI.getPosts()
}

const fetchSongs = async () => {
  if (soloMode.value) {
    isShowing.posts = false
    isShowing.details = false
  }
  isShowing.songs = true
  if (songs.value?.length) return
  await wpAPI.getSongs()
}

const fetchDetails = async () => {
  if (soloMode.value) {
    isShowing.posts = false
    isShowing.songs = false
  }
  isShowing.details = true
  if (details?.value) return
  await wpAPI.getDetails()
}
</script>

<template>
  <div class="container">
    <h1>Let's start using Vue</h1>
    <h2>to view your WordPress for you</h2>
    <div class="data-area">
      <button v-if="!isShowing.posts" @click="fetchPosts">Fetch posts</button>
      <div v-else>
        <div class="close">
          <button @click="isShowing.posts = false">Hide Posts</button>
        </div>
        <p v-if="!posts?.length">Loading...</p>
        <ul v-else>
          <li v-for="post in posts">
            <details>
              <summary>
                <a :href="post.link" target="_blank">
                  {{ decode(post.title.rendered) }}
                </a>
              </summary>
              <div
                class="post-excerpt"
                v-html="decode(post.excerpt.rendered)"
              ></div>
            </details>
          </li>
        </ul>
      </div>
      <button v-if="!isShowing.songs" @click="fetchSongs">Fetch songs</button>
      <div v-else>
        <div class="close">
          <button v-if="isShowing.songs" @click="isShowing.songs = false">
            Hide songs
          </button>
        </div>
        <p v-if="!songs?.length">Loading...</p>
        <ul v-else>
          <li v-for="song in songs">
            <details>
              <summary>
                <a :href="song.link" target="_blank">
                  {{ decode(song.title.rendered) }}
                </a>
              </summary>
              <div
                class="lyrics"
                v-html="decode(song['acm_fields'].lyrics)"
              ></div>
            </details>
          </li>
        </ul>
      </div>
      <button v-if="!isShowing.details" @click="fetchDetails">
        Fetch API details
      </button>
      <div v-else>
        <div class="close">
          <button v-if="isShowing.details" @click="isShowing.details = false">
            Hide API Details
          </button>
        </div>
        <p v-if="!details">Loading...</p>
        <div v-else>
          {{ Object.keys(details.routes).length }}
        </div>
      </div>
    </div>
    <div style="text-align: right">
      <input type="checkbox" v-model="soloMode" id="solo-switch" />
      <label for="solo-switch">Solo Mode</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  justify-items: center;
  border: 1px solid #444;
  border-top-color: #887;
  padding: 3em 3.5em 2em;
  border-radius: 1em;
  box-shadow: 0px 12px 14px -12px #022;
  background-color: var(--clr-bg-card-light, var(--clr-bg-card));

  input[type='checkbox'] {
    cursor: pointer;
  }
  .data-area {
    display: grid;
    text-align: left;
    gap: 1em;
    padding: 1em;
    ul {
      padding: 0;
      list-style: none;
      display: grid;
      gap: 1em;
      details {
        .lyrics {
          margin-inline-start: 2em;
        }
      }
    }
    button {
      justify-self: center;
    }
  }
  .close {
    display: flex;
    button {
      margin-inline: auto;
    }
  }
}
</style>
