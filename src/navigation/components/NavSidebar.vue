<template>
  <div>
    <div
      class="h-20 bg-gray-200 flex flex-row content-center border-r border-gray-300 drop-shadow-lg"
    >
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
          @click="openMenu"
        />
      </div>
    </div>
  </div>

  <div
    v-if="open || !mobileView"
    class="flex flex-row flex-col h-screen md:h-100 fixed md:relative top-0 right-0 w-4/5 md:w-full bg-gray-200 border-r border-gray-300 drop-shadow-lg"
  >
    <div class="relative md:hidden">
      <img
        alt="close"
        src="https://img.icons8.com/stickers/2x/circled-chevron-right.png"
        class="w-1/6 absolute top-2 -left-7 cursor-pointer"
        @click="closeMenu"
      />
    </div>

    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </div>
</template>

<script>
import NavLogo from '@/navigation/components/NavLogo'
export default {
  components: { NavLogo },
  data() {
    return { open: false, mobileView: this.isMobile() }
  },
  methods: {
    openMenu() {
      this.open = true
    },
    closeMenu() {
      this.open = false
    },
    isMobile() {
      if (screen.width <= 640) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
