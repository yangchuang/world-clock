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
  const milliseconds = localTime.getMilliseconds();

  // 添加毫秒计算以实现平滑过渡
  // 确保指针的角度始终递增，避免跨越整点时的逆时针问题
  const prevHourDegrees = hourDegrees.value;
  const prevMinuteDegrees = minuteDegrees.value;
  const prevSecondDegrees = secondDegrees.value;
  const newHourDegrees = (hours * 30) + (minutes / 2);
  const newMinuteDegrees = (minutes * 6) + (seconds / 10);
  const newSecondDegrees = (seconds * 6) + (milliseconds * 0.006);

  // 如果新角度小于旧角度，说明跨越了整点，需要加上360度
  hourDegrees.value = newHourDegrees < prevHourDegrees ? newHourDegrees + 360 : newHourDegrees;
  minuteDegrees.value = newMinuteDegrees < prevMinuteDegrees ? newMinuteDegrees + 360 : newMinuteDegrees;
  secondDegrees.value = newSecondDegrees < prevSecondDegrees ? newSecondDegrees + 360 : newSecondDegrees;
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