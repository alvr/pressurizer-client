<template>
  <main>
    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs2>
          <v-subheader>{{ $t('account.country') }}</v-subheader>
        </v-flex>
        <v-flex xs10>
          <v-combobox
            v-model="userCountry"
            :items="countries"
            item-text="name"
            item-value="code"
            persistent-hint
            single-line
            return-object
          ></v-combobox>
        </v-flex>
        <v-btn @click="updateCountry">{{ $t('save') }}</v-btn>
      </v-layout>
    </v-container>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SnackbarMessage } from '@/models/SnackbarMessage'
import { EventBus } from '@/event-bus'

@Component
export default class Account extends Vue {
  countries: Country[] = []
  userCountry = {} as Country

  mounted() {
    this.$http.get('/countries')
      .then((res) => {
        this.countries = res.data.countries as Country[]
        this.userCountry = res.data.country as Country
      })
  }

  updateCountry() {
    try {
      const country = this.userCountry.code

      if (typeof country === 'string') {
        this.$http.patch('/updateCountry', {code: country})
          .then(() => {
            const data: SnackbarMessage = {
              message: this.$t('account.saved') as string,
              color: 'success',
            }

            EventBus.$emit('show-snackbar', data as SnackbarMessage)
          })
      } else {
        const data: SnackbarMessage = {
          message: this.$t('account.saveError') as string,
          color: 'error',
        }

        EventBus.$emit('show-snackbar', data as SnackbarMessage)
      }
    } catch (e) {
      const data: SnackbarMessage = {
        message: this.$t('account.saveError') as string,
        color: 'error',
      }

      EventBus.$emit('show-snackbar', data as SnackbarMessage)
    }
  }
}
</script>
