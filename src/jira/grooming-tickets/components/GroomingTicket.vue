<template>
  <div v-if="!ticket" class="pure-g">
    <div class="pure-u-1">
      <h3>Waiting on a ticket</h3>
      <img
        src="https://64.media.tumblr.com/tumblr_ljkn5yjPkO1qixleeo1_400.gifv"
        alt="No ticket selected"
      />
    </div>
  </div>

  <div v-if="ticket" id="main" class="pure-u-1">
    <div class="email-content">
      <div class="email-content-header pure-g">
        <div class="pure-u-1">
          <h1 class="email-content-title">{{ ticket.summary }}</h1>
          <p class="email-content-subtitle">
            Reported by <a>{{ ticket.reportedBy }}</a>
          </p>
        </div>
      </div>

      <div class="email-content-body">
        <p>
          {{ ticket.description }}
        </p>
      </div>

      <div class="email-content-footer pure-g">
        <div class="pure-u-1">
          <div class="pure-g form">
            <div class="pure-u-1">
              <label class="points-label">Points</label>
              <div v-for="option in pointOptions" :key="option" class="points">
                <label :for="'points-' + option" class="pure-radio">
                  <input
                    type="radio"
                    :id="'points-' + option"
                    v-model="points"
                    :value="option"
                  />
                  {{ option }}
                </label>
              </div>
            </div>
          </div>

          <div class="pure-g">
            <div class="pure-u-1">
              <button @click="pointIt" class="button-success pure-button">
                Point it!
              </button>
            </div>
          </div>

          <div class="pure-g">
            <div class="pure-u-1">
              <ul>
                <li v-for="user in session.users" :key="user.name">
                  <b>{{ user.name }}</b>
                  {{ user.points ? `${user.points} points` : 'not pointed' }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ticket', 'pointSubmitted', 'session'],
  data() {
    return {
      points: 0,
      pointOptions: [1, 2, 3, 5, 8, 13, 20, 40, 100]
    }
  },
  methods: {
    pointIt() {
      if (this.points) {
        this.pointSubmitted(this.points)
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
</style>
