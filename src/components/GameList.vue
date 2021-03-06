<template>
  <main>
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12>
          <v-card>
            <v-container fluid v-if="games.length !== 0">
              <v-layout row wrap align-space-between justify-space-around fill-height text-xs-center>
                <div><h2 class="stats-line">{{ toCurrency(stats.avgCostTime) }}/h</h2>
                  <p>{{ $t('table.statsAverageCostTime') }}</p></div>
                <div><h2 class="stats-line">{{ toCurrency(stats.avgCost) }}</h2>
                  <p>{{ $t('table.statsAverageCost') }}</p></div>
                <div><h2 class="stats-line">{{ toCurrency(stats.totalCost) }}</h2>
                  <p>{{ $t('table.statsTotalCost') }}</p></div>
                <div><h2 class="stats-line">{{ parseStatsTime(stats.avgTime) }}</h2>
                  <p>{{ $t('table.statsAverageTime') }}</p></div>
                <div><h2 class="stats-line">{{ parseStatsTime(stats.totalTime) }}</h2>
                  <p>{{ $t('table.statsTotalTime') }}</p></div>
              </v-layout>
              <v-divider/>
            </v-container>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="games"
              :search="search"
              :loading="isLoading"
              :rows-per-page-items="rowsPerPage"
              :pagination.sync="pagination"
              class="elevation-1"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              sort-icon="mdi-menu-down"
            >
              <v-progress-linear slot="progress" color="blue" indeterminate />
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="mdi-alert">
                  {{ $t('table.noGames') }}
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <td>
                  <img
                    :src="`https://steamcdn-a.akamaihd.net/steam/apps/${props.item.appId}/capsule_sm_120.jpg`"
                    height="45px"/>
                </td>
                <td>{{ props.item.title }}</td>
                <td>
                  <v-edit-dialog
                    :return-value="props.item.cost"
                    large
                    dark
                    :cancel-text="closeText"
                    :save-text="saveText"
                    @save="updateCost(props.item.appId, props.item.title, props.item.cost)"
                  >
                    {{ toCurrency(props.item.cost) }}
                    <v-text-field
                      :key="props.item.appId"
                      :rules="[minValue]"
                      class="input-price"
                      slot="input"
                      v-model="props.item.cost"
                      type="number"
                      min="0"
                      max="999999999"
                      step="0.01"
                      :suffix="currency"
                      required
                      color="secondary">
                    </v-text-field>
                  </v-edit-dialog>
                </td>
                <td>{{ parseTime(props.item.timePlayed) }}</td>
                <td>{{ toCurrency(props.item.costHours) }}</td>
                <td>
                  <v-checkbox
                    v-model="props.item.finished"
                    @change="updateFinished(props.item.appId, props.item.title, props.item.finished)"
                    hide-details />
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script lang="ts">
  import * as LocaleCurrency from 'locale-currency'
  import { Component, Vue } from 'vue-property-decorator'
  import { EventBus } from '@/event-bus'
  import { http } from '@/http-client'
  import { Game } from '@/models/Game'
  import { GamesWithStats } from '@/models/GamesWithStats'
  import { SnackbarMessage } from '@/models/SnackbarMessage'
  import { Stats } from '@/models/Stats'

  @Component
  export default class GameList extends Vue {
    games: Game[] = []
    stats: Stats = {} as Stats

    saveText = this.$root.$t('save')
    closeText = this.$root.$t('close')

    headers = [
      { value: 'image', sortable: false },
      { text: this.$root.$t('table.header.title'), value: 'title', width: '50%' },
      { text: this.$root.$t('table.header.cost'), value: 'cost', width: '15%' },
      { text: this.$root.$t('table.header.hours'), value: 'timePlayed', width: '10%' },
      { text: this.$root.$t('table.header.costHours'), value: 'costHours', width: '15%' },
      { text: this.$root.$t('table.header.finished'), value: 'finished', width: '10%' },
    ]
    search = ''
    isLoading = true
    rowsPerPage = [
      50,
      100,
      150,
      300,
      500,
      1000,
      {
        text: '$vuetify.dataIterator.rowsPerPageAll',
        value: -1,
      },
    ]

    pagination = {sortBy: 'timePlayed', descending: true}

    minValue = (c: number) => (c >= 0 && c <= 999999999) || this.$root.$t('errors.priceOutOfBounds') as string

    mounted() {
      http.get('/games')
        .then((res) => {
          const gws = res.data as GamesWithStats
          this.games = gws.games
          this.stats = gws.stats
          this.isLoading = false
        })
    }

    private async updateFinished(appId: string, title: string, finished: boolean) {
      const data = {
        appId,
        finished,
      }
      http.patch('/games', data)
        .then(async () => {
          const msg: SnackbarMessage = {
            message: finished ? this.$t('table.gameMarkedAsFinished', {title}) as string
              : this.$t('table.gameMarkedAsNotFinished', {title}) as string,
            color: 'success',
          }

          EventBus.$emit('show-snackbar', msg as SnackbarMessage)
        })
    }

    private async updateCost(appId: string, title: string, cost: number) {
      const data = {
        appId,
        cost,
      }
      http.patch('/games', data)
        .then(async () => {
          const msg: SnackbarMessage = {
            message: this.$t('table.gameUpdatedCost', {title, cost}) as string,
            color: 'success',
          }

          EventBus.$emit('show-snackbar', msg as SnackbarMessage)
        })
    }

    private parseTime(time: number): string {
      return `${Math.floor(time / 60)}` + 'h ' + ('0' + time % 60).slice(-2) + 'm'
    }

    private parseStatsTime(time: number): string {
      const minutes = time % 60
      const hours = Math.floor(time / 60 % 24)
      const days = Math.floor(time / 24 / 60)

      return days + 'd ' + hours + 'h ' + ('0' + minutes).slice(-2) + 'm'
    }

    private toCurrency(cost: number): string {
      if (cost !== undefined) {
        return cost.toLocaleString(this.country, {
          style: 'currency',
          currency: LocaleCurrency.getCurrency(this.country),
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      } else {
        return ''
      }
    }

    private get country() {
      return this.$store.getters.country
    }
  }
  </script>

<style lang="stylus">
  .input-price input::-webkit-outer-spin-button,
  .input-price input::-webkit-inner-spin-button
    -webkit-appearance none
    margin 0
  .input-price input[type=number]
    -moz-appearance textfield
  .stats-line
    font-family 'Comfortaa', cursive !important
  h1
    font-size 3.75em
  h2
    font-size 2em
</style>
