<template>
  <div class="p-10">
    <div v-if="!ticket" class="">
      <div class="pure-u-1">
        <h3>Waiting on a ticket</h3>
        <img
          src="https://64.media.tumblr.com/tumblr_ljkn5yjPkO1qixleeo1_400.gifv"
          alt="No ticket selected"
        />
      </div>
    </div>

    <div
      v-if="ticket"
      id="main"
      class="p-5 bg-white rounded border-black-800 drop-shadow-2xl"
    >
      <div class="">
        <div class="">
          <h1 class="text-xl font-bold">{{ ticket.summary }}</h1>
          <p class="font-semibold">
            Reported by
            <span class="text-indigo-500">{{ ticket.reportedBy }}</span>
          </p>
        </div>

        <div class="pt-5">
          <p>
            {{ ticket.description }}
          </p>
        </div>

        <div class="flex flex-col pt-5">
          <div class="">
            <select
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              v-model="points"
            >
              <option v-for="point in pointOptions" :key="point">
                {{ point }}
              </option>
            </select>
          </div>
          <div class="pt-4">
            <button
              @click="pointIt"
              class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50"
            >
              Point it!
            </button>
          </div>
        </div>

        <div class="flex flex-col pt-5">
          <h1 class="text-xl font-bold text-gray-500">Not pointed</h1>
          <ul>
            <li
              v-for="user in usersYetToPoint()"
              :key="user.name"
              class="font-semibold"
            >
              {{ user.name }}
            </li>
          </ul>

          <h1 class="text-xl font-bold text-indigo-500 pt-3">Pointed</h1>
          <ul>
            <li
              v-for="user in usersPointed()"
              :key="user.name"
              class="font-semibold"
            >
              {{ user.name }}
            </li>
          </ul>

          <h2 v-if="!usersPointed().length">Patiently waiting for points</h2>
        </div>

        <div v-if="repointRequired" class="">
          <div class="">
            <p>User pointing is not unanimous. Repoint!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ticket', 'pointSubmitted', 'session', 'repointRequired'],
  data() {
    return {
      points: 1,
      pointOptions: [1, 2, 3, 5, 8, 13, 20, 40, 100]
    }
  },
  methods: {
    pointIt() {
      if (this.points) {
        this.pointSubmitted(this.points)
      }
    },
    usersPointed() {
      return this.session.users.filter(user => {
        return user.points
      })
    },
    usersYetToPoint() {
      return this.session.users.filter(user => {
        return !user.points
      })
    }
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 20px;
}

.points-label {
  font-weight: bold;
  margin-right: 10px;
}

.points {
  display: inline-block;
  margin-left: 10px;
}

.message {
  padding: 10px;
  background-color: #1f8dd6;
  color: white;
  font-size: 1.125em;
  text-align: center;
}
</style>
