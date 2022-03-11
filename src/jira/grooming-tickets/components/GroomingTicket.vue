<template>
  <div class="p-10 overflow-auto h-screen">
    <div
      v-if="!ticket && !groomingSuccessful"
      class="flex flex-col items-center"
    >
      <img
        src="https://64.media.tumblr.com/tumblr_ljkn5yjPkO1qixleeo1_400.gifv"
        alt="No ticket selected"
        class="rounded mt-4 drop-shadow"
      />
      <h3 class="text-xl font-bold text-center">Waiting on a ticket...</h3>
    </div>

    <GroomingSuccess v-if="groomingSuccessful" />

    <div
      v-if="ticket && !groomingSuccessful"
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

        <div class="pt-5">
          <label class="font-bold">Choose your points</label>
          <div class="flex flex-wrap">
            <div
              v-for="(point, index) in pointOptions"
              :key="index"
              :class="`point-card rounded point-card-${point}`"
              :style="calculatePointCardPositioning(index)"
              @click="pointIt(point)"
            ></div>
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
          <div class="flex flex-wrap">
            <div
              v-for="user in usersPointed()"
              :key="user.name"
              class="font-semibold"
            >
              {{ user.name }}

              <div
                v-if="repointRequired"
                :class="`point-card rounded point-card-${user.points}`"
                :style="
                  calculatePointCardPositioning(
                    pointOptions.indexOf(user.points)
                  )
                "
              ></div>
            </div>
          </div>

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
import GroomingSuccess from '@/jira/grooming-tickets/components/GroomingSuccess'

export default {
  props: [
    'ticket',
    'pointSubmitted',
    'session',
    'repointRequired',
    'groomingSuccessful'
  ],
  components: {
    GroomingSuccess
  },
  data() {
    return {
      points: 1,
      pointOptions: [1, 2, 3, 5, 8, 13, 20, 40]
    }
  },
  methods: {
    pointIt(points) {
      this.points = points
      this.pointSubmitted(this.points)
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
    },
    calculatePointCardPositioning(cardNumber) {
      const isSecondRow = cardNumber < 5
      const rightPositioningMultiplier = isSecondRow
        ? cardNumber
        : cardNumber - 5
      const baseLine = isSecondRow ? 166 : 15
      const increase = 76
      const rightPositioning = rightPositioningMultiplier * increase + baseLine
      const topPositioning = isSecondRow ? 164 : 278

      return {
        backgroundPosition: `-${rightPositioning}px -${topPositioning}px`
      }
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

.point-card {
  width: 73px;
  height: 111px;
  background-image: url(~@/jira/grooming-tickets/images/points-cards.png);
  background-size: 550px;
  cursor: pointer;
  transition: transform ease-in 0.1s;
}

.point-card:hover {
  transform: scale(0.9);
}
</style>
