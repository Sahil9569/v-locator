<template>
  <RouterView></RouterView>
  <inactivity-timer></inactivity-timer>
    <template v-if="notificatonVar">
      <div class="styleModalFixed">
          <div class="bg-lightprimary rounded-md pa-4">
              <div class="d-flex innrStyleModalFxd">
                  <div class="imageSideModalFxd">
                      <img src="@/assets/images/backgrounds/favicon.png"  class="d-block" style="margin:auto;">
                  </div>
                  <div class="contentFxdMdl">
                      <div class="font-weight-bold text-h5 pb-2">{{subject}}</div>
                      <p class="d-block font-weight-light text-h6">{{ content }}</p>
                  </div>
              </div>
          </div>
      </div>
    </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import socket from '@/stores/websocket';
import InactivityTimer from '../src/components/InactivityTimer.vue'; // Import the InactivityTimer component here

const notificatonVar = ref(false);
const subject = ref('');
const content = ref('');

onMounted(() => {
  socket.addEventListener('message', (event) => {
    console.log('SOCKET EVENT', event);
    const data = JSON.parse(event.data);
    if (data.type === 'pushnotification') {
      if (data.token === localStorage.getItem('authToken')) {
        pushnotification(data);
      }
    }
  });
});

const pushnotification = async (data: any) => {
  subject.value = data.notification;
  content.value = data.notification_con;
  setTimeout(function () {
    notificatonVar.value = true;
  }, 3000); // 5000 milliseconds = 5 seconds

  setTimeout(function () {
    notificatonVar.value = false;
  }, 10000); // 10000 milliseconds = 10 seconds
};
</script>