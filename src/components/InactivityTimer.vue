<template>
  <div v-if="showWarning" class="inactivity-warning">
    <p>You will be logged out due to inactivity in {{ remainingTime }} seconds.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth';
const router = useRouter();
const authStore = useAuthStore();
// const remainingTime = ref(1200); // 10 minutes in seconds
const showWarning = ref(false);
let timeout;
const customer = localStorage.getItem('role')
const remainingTime = ref(customer === 'customer' ? 3600 : 600); // 1 hour for customer, 10 minutes for others
const startTimer = () => {
  timeout = setTimeout(logout, remainingTime.value * 1000);
};

const resetTimer = () => {
  clearTimeout(timeout);
  startTimer();
};

const logout = () => {
  console.log('CHECK KARRRRRRRRR RE BABABA',customer)
  if(customer){
  if(customer != 'customer'){
    console.log('KARRRRRRRRR RE BABABA',customer)
    showWarning.value = false; 
    authStore.logout()
    sessionStorage.setItem('logout', true);
  }
  else{
    localStorage.clear();
    sessionStorage.setItem('logout', true);
    router.push('/vlocator/thanksOrder');
  }
  }
  
  
};

onMounted(() => {
  startTimer();
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('keydown', resetTimer);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', resetTimer);
  window.removeEventListener('keydown', resetTimer);
  clearTimeout(timeout);
});
</script>
