import { reactive } from 'vue';

export const userStore = reactive({
  user: null,
  setUser(newUser) {
    this.user = newUser;

    localStorage.setItem('user', JSON.stringify(this.user))

    console.log('setting user in store')
  },
  clearUser() {
    this.user = null;
  },
});