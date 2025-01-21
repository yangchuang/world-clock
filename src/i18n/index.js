import { createI18n } from 'vue-i18n';

const messages = {
  'zh-CN': {
    title: '世界时钟',
    china: {
      title: '中国时间',
      timezone: '北京时间',
      utc: '(UTC+8)'
    },
    us: {
      title: '美国时间',
      eastern: {
        name: '东部时间',
        utc: '(UTC-4)'
      },
      central: {
        name: '中部时间',
        utc: '(UTC-5)'
      },
      mountain: {
        name: '山地时间',
        utc: '(UTC-6)'
      },
      pacific: {
        name: '太平洋时间',
        utc: '(UTC-7)'
      }
    }
  },
  'en-US': {
    title: 'World Clock',
    china: {
      title: 'China Time',
      timezone: 'Beijing Time',
      utc: '(UTC+8)'
    },
    us: {
      title: 'US Time',
      eastern: {
        name: 'Eastern Time',
        utc: '(UTC-4)'
      },
      central: {
        name: 'Central Time',
        utc: '(UTC-5)'
      },
      mountain: {
        name: 'Mountain Time',
        utc: '(UTC-6)'
      },
      pacific: {
        name: 'Pacific Time',
        utc: '(UTC-7)'
      }
    }
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'zh-CN',
  messages
});