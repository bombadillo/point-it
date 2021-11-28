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
            Reported by <a>{{ ticket.reportedBy }}a</a>
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
              <label class="points-label" for="points">Points</label>
              <input
                v-model="points"
                name="points"
                type="text"
                class="points"
              />
            </div>
          </div>

          <div class="pure-g">
            <div class="pure-u-1">
              <button @click="pointIt" class="button-success pure-button">
                Point it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ticket', 'pointSubmitted'],
  data() {
    return {
      points: 0
    }
  },
  methods: {
    pointIt() {
      if (this.points) {
        console.log(this.points)
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
.points {
  width: 30px;
  margin-left: 10px;
}

.points-label {
  font-weight: bold;
}
</style>
