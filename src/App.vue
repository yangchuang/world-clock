<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AnalogClock from './components/AnalogClock.vue';

const { t, locale } = useI18n();

const toggleLocale = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN';
};

const currentTime = ref(new Date());

// 每秒更新时间
setInterval(() => {
  currentTime.value = new Date();
}, 1000);

const formatDate = (timezone) => {
  return currentTime.value.toLocaleDateString(locale.value, {
    timeZone: timezone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
};

const formatTime = (timezone) => {
  return currentTime.value.toLocaleTimeString(locale.value, {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// 每秒更新时间
setInterval(() => {
  ref(new Date());
}, 1000);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
    <div class="container mx-auto px-6">
      <button
        @click="toggleLocale"
        class="fixed top-6 right-6 w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:rotate-180 border-2 border-blue-500/20"
      >
        <span class="text-lg">{{ locale === 'zh-CN' ? '🇺🇸' : '🇨🇳' }}</span>
      </button>
      <h1 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{{ t('title') }}</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- 中国时区 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">🇨🇳 {{ t('china.title') }}</h2>
          <div class="flex items-center justify-between gap-8">
            <div class="text-lg space-y-2 flex-1 max-w-[60%]">
              <p class="text-gray-600 font-medium">{{ t('china.timezone') }} {{ t('china.utc') }}</p>
              <p class="text-gray-800 font-medium">{{ formatDate('Asia/Shanghai') }}</p>
              <p class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">{{ formatTime('Asia/Shanghai') }}</p>
            </div>
            <AnalogClock timezone="Asia/Shanghai" />
          </div>
        </div>

        <!-- 美国时区 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">🇺🇸 {{ t('us.title') }}</h2>
          <div class="grid grid-cols-1 gap-6">
            <!-- 东部时区 -->
            <div class="p-6 bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
              <div class="flex items-center justify-between gap-8">
                <div class="space-y-2 flex-1 max-w-[60%]">
                  <p class="text-gray-600 font-medium">{{ t('us.eastern.name') }} {{ t('us.eastern.utc') }}</p>
                  <p class="text-gray-800 font-medium">{{ formatDate('America/New_York') }}</p>
                  <p class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">{{ formatTime('America/New_York') }}</p>
                </div>
                <AnalogClock timezone="America/New_York" />
              </div>
            </div>
            <!-- 中部时区 -->
            <div class="p-6 bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
              <div class="flex items-center justify-between gap-8">
                <div class="space-y-2 flex-1 max-w-[60%]">
                  <p class="text-gray-600 font-medium">{{ t('us.central.name') }} {{ t('us.central.utc') }}</p>
                  <p class="text-gray-800 font-medium">{{ formatDate('America/Chicago') }}</p>
                  <p class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">{{ formatTime('America/Chicago') }}</p>
                </div>
                <AnalogClock timezone="America/Chicago" />
              </div>
            </div>
            <!-- 山地时区 -->
            <div class="p-6 bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
              <div class="flex items-center justify-between gap-8">
                <div class="space-y-2 flex-1 max-w-[60%]">
                  <p class="text-gray-600 font-medium">{{ t('us.mountain.name') }} {{ t('us.mountain.utc') }}</p>
                  <p class="text-gray-800 font-medium">{{ formatDate('America/Denver') }}</p>
                  <p class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">{{ formatTime('America/Denver') }}</p>
                </div>
                <AnalogClock timezone="America/Denver" />
              </div>
            </div>
            <!-- 太平洋时区 -->
            <div class="p-6 bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
              <div class="flex items-center justify-between gap-8">
                <div class="space-y-2 flex-1 max-w-[60%]">
                  <p class="text-gray-600 font-medium">{{ t('us.pacific.name') }} {{ t('us.pacific.utc') }}</p>
                  <p class="text-gray-800 font-medium">{{ formatDate('America/Los_Angeles') }}</p>
                  <p class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">{{ formatTime('America/Los_Angeles') }}</p>
                </div>
                <AnalogClock timezone="America/Los_Angeles" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
