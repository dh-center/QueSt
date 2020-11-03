import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStoragePlugin from 'i18next-react-native-async-storage';
import * as RNLocalize from 'react-native-localize';

/**
 * Imports translations
 */
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

/**
 * Creates resource pack for i18next plugin
 */
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

/**
 * Detects system language for the first launch
 */
const systemLanguage = RNLocalize.getLocales()[0].languageCode;

/**
 * Checks system language. If it isn't russian language, sets english default
 */
const fallbackLanguage = systemLanguage === 'ru' ? 'ru' : 'en';

/**
 * Configures i18next plugin
 */
i18n
  .use(initReactI18next)
  .use(AsyncStoragePlugin(fallbackLanguage))
  .init({
    // debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
