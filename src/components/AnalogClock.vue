<template>
  <div class="clock w-28 h-28 rounded-full border-2 border-gray-600 relative bg-white shadow-lg transform hover:scale-105 transition-all duration-300">
    <!-- 时钟刻度 -->
    <div v-for="i in 60" :key="i" class="absolute w-full h-full">
      <div
        class="absolute top-0 left-1/2 h-full"
        :style="{ transform: `rotate(${i * 6}deg)` }"
      >
        <div
          :class="[
            'absolute top-0 left-1/2 transform -translate-x-1/2',
            i % 5 === 0
              ? 'w-1 h-2.5 bg-gray-600'
              : 'w-0.5 h-1.5 bg-gray-400'
          ]"
        ></div>
      </div>
    </div>
    <!-- 数字 -->
    <div v-for="i in 12" :key="i" class="absolute w-full h-full">
      <div
        class="absolute inset-0 flex items-center justify-center"
        :style="{ transform: `rotate(${i * 30}deg)` }"
      >
        <span
          class="text-xs font-medium text-gray-600"
          :style="{ transform: `rotate(-${i * 30}deg)` }"
        >{{ i }}</span>
      </div>
    </div>
    <!-- 时针 -->
    <div
      class="absolute w-1 h-8 bg-gray-700 rounded-full left-1/2 bottom-1/2 origin-bottom transform -translate-x-1/2 transition-transform duration-200"
      :style="{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }"
    ></div>
    <!-- 分针 -->
    <div
      class="absolute w-0.5 h-10 bg-gray-600 rounded-full left-1/2 bottom-1/2 origin-bottom transform -translate-x-1/2 transition-transform duration-200"
      :style="{ transform: `translateX(-50%) rotate(${minuteDegrees}deg)` }"
    ></div>
    <!-- 秒针 -->
    <div
      class="absolute w-0.5 h-12 bg-red-400 rounded-full left-1/2 bottom-1/2 origin-bottom transform -translate-x-1/2 transition-transform duration-200"
      :style="{ transform: `translateX(-50%) rotate(${secondDegrees}deg)` }"
    ></div>
    <!-- 中心点 -->
    <div class="absolute w-3 h-3 bg-red-400 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-600"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  timezone: {
    type: String,
    required: true
  }
});

const hourDegrees = ref(0);
const minuteDegrees = ref(0);
const secondDegrees = ref(0);

const updateClock = () => {
  const now = new Date();
  const localTime = new Date(now.toLocaleString('en-US', { timeZone: props.timezone }));
  
  const hours = localTime.getHours() % 12;
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();

  hourDegrees.value = (hours * 30) + (minutes / 2);
  minuteDegrees.value = (minutes * 6) + (seconds / 10);
  secondDegrees.value = seconds * 6;
};

let intervalId;

onMounted(() => {
  updateClock();
  intervalId = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>