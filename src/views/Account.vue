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
    <v-snackbar v-model="snack" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">{{ $t('close') }}</v-btn>
    </v-snackbar>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Account extends Vue {
  countries: Country[] = []
  userCountry = {} as Country

  snack = false
  snackColor = ''
  snackText = ''

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
            this.snack = true
            this.snackText = this.$t('account.saved') as string
            this.snackColor = 'success'
          })
      } else {
        this.snack = true
        this.snackText = this.$t('account.saveError') as string
        this.snackColor = 'error'
      }
    } catch (e) {
      this.snack = true
      this.snackText = this.$t('account.saveError') as string
      this.snackColor = 'error'
    }
  }
}
</script>
