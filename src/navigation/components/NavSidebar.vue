<template>
  <div class="drop-shadow-lg bg-gray-300">
    <div class="h-20 flex flex-row justify-center">
      <div class="basis-1/4">
        <NavLogo />
      </div>
      <div
        class="basis-1/4 md:hidden flex flex-col content-center justify-center"
      >
        <img
          alt="Menu"
          src="https://img.icons8.com/stickers/2x/menu.png"
          class="w-11 cursor-pointer"
          @click="toggleMenu"
        />
      </div>
    </div>

    <div
      v-if="open || !mobileView"
      class="flex flex-row flex-col h-screen md:h-100 md:relative top-0 right-0 w-full bg-gray-300 z-10"
    >
      <div class="">
        <ul class="p-5">
          <li class="bg-violet-300 rounded p-2">
            <p>
              <span>🐱‍💻</span> Signed in as
              <span class="text-indigo-700 font-bold">{{ user.name }}</span>
            </p>
          </li>
          <li class="ml-4 p-2 mt-2 hover:bg-gray-200 hover:rounded">
            <a
              @click="menuItemSelected(onJoinSessionClicked)"
              href="javascript:void(0)"
              class=""
              >🤝 Join session</a
            >
          </li>
          <li class="ml-4 p-2 mt-1 hover:bg-gray-200 hover:rounded">
            <a
              @click="menuItemSelected(onCreateSessionClicked)"
              href="javascript:void(0)"
              class=""
              >🆕 Create new session</a
            >
          </li>
          <li class="ml-4 p-2 mt-1 hover:bg-gray-200 hover:rounded mb-3">
            <a @click="logout" href="javascript:void(0)" class="">👋 Logout</a>
          </li>
          <li v-if="session?.users" class="bg-violet-300 rounded p-2">
            <p class=""><span>👥</span> Users in session</p>
          </li>
          <li
            v-for="user in session?.users"
            :key="user.name"
            class="pl-4 font-bold text-gray-700"
          >
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavLogo from '@/navigation/components/NavLogo'
export default {
  props: [
    'user',
    'session',
    'logout',
    'onCreateSessionClicked',
    'onJoinSessionClicked'
  ],
  components: { NavLogo },
  data() {
    console.log(this.user)
    return { open: false, mobileView: this.isMobile() }
  },
  methods: {
    toggleMenu() {
      this.open = !this.open
    },
    isMobile() {
      if (screen.width <= 640) {
        return true
      } else {
        return false
      }
    },
    menuItemSelected(callback) {
      this.open = false
      callback()
    }
  }
}
</script>
