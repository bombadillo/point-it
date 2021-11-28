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

        <div class="pure-g">
          <div class="pure-u-1">
            <button class="button-success pure-button">Point it!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ticket']
}
</script>
