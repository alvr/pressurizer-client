<template>
  <v-menu attach bottom left offset-y>
    <v-btn slot="activator" class="change-language" flat>
      <v-icon>mdi-web</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile
        v-for="language in languages"
        :key="language.locale"
        @click="changeLanguage(language.locale)">
        <v-list-tile-title
          v-text="language.name"
          :class="activeLanguage(language.locale)" />
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { i18n } from '@/locale/i18n'

  @Component
  export default class LangSelector extends Vue {
    languages = [
      { locale: 'en', name: 'English' },
      { locale: 'es', name: 'Español' },
    ]

    private async changeLanguage(language: string) {
      await this.$store.dispatch('language', language)
      i18n.locale = language
    }

    private activeLanguage(language: string) {
      if (language === i18n.locale) {
        return 'font-weight-bold'
      }
    }
  }
</script>

<style scoped lang="stylus">
  .change-language
    min-width: 48px
</style>
