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
        <v-flex xs2>
          <v-subheader>{{ $t('account.shops') }}</v-subheader>
        </v-flex>
        <v-flex xs10>
          <v-select
            v-model="selectedShops"
            :items="shops"
            item-text="title"
            item-value="id"
            clearable
            multiple
          >
          </v-select>
        </v-flex>
        <v-flex xs2>

        </v-flex>
        <v-flex xs10>
          <v-btn color="rgba(255, 295, 0, 0.5)" @click="exportData">{{ $t('account.exportButtonText') }}</v-btn>
          <v-btn color="rgba(0, 188, 255, 0.5)" @click="importData">{{ $t('account.importButtonText') }}</v-btn>
          <v-btn color="rgba(255, 0, 61, 0.5)" @click="deleteAccount">{{ $t('account.deleteButtonText') }}</v-btn>
        </v-flex>
        <v-btn color="primary" @click="saveSettings">{{ $t('save') }}</v-btn>
      </v-layout>
    </v-container>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { EventBus } from '@/event-bus'
  import { http } from '@/http-client'
  import { SnackbarMessage } from '@/models/SnackbarMessage'
  import router from '@/router'
  import fileDownload from 'js-file-download'

  @Component
  export default class Account extends Vue {
    userCountry = {} as Country
    countries: Country[] = [
      {
        code: 'AF',
        name: 'Afghanistan',
      },
      {
        code: 'AL',
        name: 'Albania',
      },
      {
        code: 'DZ',
        name: 'Algeria',
      },
      {
        code: 'AS',
        name: 'American Samoa',
      },
      {
        code: 'AD',
        name: 'Andorra',
      },
      {
        code: 'AO',
        name: 'Angola',
      },
      {
        code: 'AI',
        name: 'Anguilla',
      },
      {
        code: 'AQ',
        name: 'Antarctica',
      },
      {
        code: 'AG',
        name: 'Antigua and Barbuda',
      },
      {
        code: 'AR',
        name: 'Argentina',
      },
      {
        code: 'AM',
        name: 'Armenia',
      },
      {
        code: 'AW',
        name: 'Aruba',
      },
      {
        code: 'AU',
        name: 'Australia',
      },
      {
        code: 'AT',
        name: 'Austria',
      },
      {
        code: 'AZ',
        name: 'Azerbaijan',
      },
      {
        code: 'BS',
        name: 'Bahamas',
      },
      {
        code: 'BH',
        name: 'Bahrain',
      },
      {
        code: 'BD',
        name: 'Bangladesh',
      },
      {
        code: 'BB',
        name: 'Barbados',
      },
      {
        code: 'BY',
        name: 'Belarus',
      },
      {
        code: 'BE',
        name: 'Belgium',
      },
      {
        code: 'BZ',
        name: 'Belize',
      },
      {
        code: 'BJ',
        name: 'Benin',
      },
      {
        code: 'BM',
        name: 'Bermuda',
      },
      {
        code: 'BT',
        name: 'Bhutan',
      },
      {
        code: 'BO',
        name: 'Bolivia, Plurinational State of',
      },
      {
        code: 'BQ',
        name: 'Bonaire, Sint Eustatius and Saba',
      },
      {
        code: 'BA',
        name: 'Bosnia and Herzegovina',
      },
      {
        code: 'BW',
        name: 'Botswana',
      },
      {
        code: 'BV',
        name: 'Bouvet Island',
      },
      {
        code: 'BR',
        name: 'Brazil',
      },
      {
        code: 'IO',
        name: 'British Indian Ocean Territory',
      },
      {
        code: 'BN',
        name: 'Brunei Darussalam',
      },
      {
        code: 'BG',
        name: 'Bulgaria',
      },
      {
        code: 'BF',
        name: 'Burkina Faso',
      },
      {
        code: 'BI',
        name: 'Burundi',
      },
      {
        code: 'KH',
        name: 'Cambodia',
      },
      {
        code: 'CM',
        name: 'Cameroon',
      },
      {
        code: 'CA',
        name: 'Canada',
      },
      {
        code: 'CV',
        name: 'Cape Verde',
      },
      {
        code: 'KY',
        name: 'Cayman Islands',
      },
      {
        code: 'CF',
        name: 'Central African Republic',
      },
      {
        code: 'TD',
        name: 'Chad',
      },
      {
        code: 'CL',
        name: 'Chile',
      },
      {
        code: 'CN',
        name: 'China',
      },
      {
        code: 'CX',
        name: 'Christmas Island',
      },
      {
        code: 'CC',
        name: 'Cocos (Keeling) Islands',
      },
      {
        code: 'CO',
        name: 'Colombia',
      },
      {
        code: 'KM',
        name: 'Comoros',
      },
      {
        code: 'CG',
        name: 'Congo',
      },
      {
        code: 'CD',
        name: 'Congo, the Democratic Republic of the',
      },
      {
        code: 'CK',
        name: 'Cook Islands',
      },
      {
        code: 'CR',
        name: 'Costa Rica',
      },
      {
        code: 'HR',
        name: 'Croatia',
      },
      {
        code: 'CU',
        name: 'Cuba',
      },
      {
        code: 'CW',
        name: 'Curaçao',
      },
      {
        code: 'CY',
        name: 'Cyprus',
      },
      {
        code: 'CZ',
        name: 'Czech Republic',
      },
      {
        code: 'CI',
        name: 'Côte d\'Ivoire',
      },
      {
        code: 'DK',
        name: 'Denmark',
      },
      {
        code: 'DJ',
        name: 'Djibouti',
      },
      {
        code: 'DM',
        name: 'Dominica',
      },
      {
        code: 'DO',
        name: 'Dominican Republic',
      },
      {
        code: 'EC',
        name: 'Ecuador',
      },
      {
        code: 'EG',
        name: 'Egypt',
      },
      {
        code: 'SV',
        name: 'El Salvador',
      },
      {
        code: 'GQ',
        name: 'Equatorial Guinea',
      },
      {
        code: 'ER',
        name: 'Eritrea',
      },
      {
        code: 'EE',
        name: 'Estonia',
      },
      {
        code: 'ET',
        name: 'Ethiopia',
      },
      {
        code: 'FK',
        name: 'Falkland Islands (Malvinas)',
      },
      {
        code: 'FO',
        name: 'Faroe Islands',
      },
      {
        code: 'FJ',
        name: 'Fiji',
      },
      {
        code: 'FI',
        name: 'Finland',
      },
      {
        code: 'FR',
        name: 'France',
      },
      {
        code: 'GF',
        name: 'French Guiana',
      },
      {
        code: 'PF',
        name: 'French Polynesia',
      },
      {
        code: 'TF',
        name: 'French Southern Territories',
      },
      {
        code: 'GA',
        name: 'Gabon',
      },
      {
        code: 'GM',
        name: 'Gambia',
      },
      {
        code: 'GE',
        name: 'Georgia',
      },
      {
        code: 'DE',
        name: 'Germany',
      },
      {
        code: 'GH',
        name: 'Ghana',
      },
      {
        code: 'GI',
        name: 'Gibraltar',
      },
      {
        code: 'GR',
        name: 'Greece',
      },
      {
        code: 'GL',
        name: 'Greenland',
      },
      {
        code: 'GD',
        name: 'Grenada',
      },
      {
        code: 'GP',
        name: 'Guadeloupe',
      },
      {
        code: 'GU',
        name: 'Guam',
      },
      {
        code: 'GT',
        name: 'Guatemala',
      },
      {
        code: 'GG',
        name: 'Guernsey',
      },
      {
        code: 'GN',
        name: 'Guinea',
      },
      {
        code: 'GW',
        name: 'Guinea-Bissau',
      },
      {
        code: 'GY',
        name: 'Guyana',
      },
      {
        code: 'HT',
        name: 'Haiti',
      },
      {
        code: 'HM',
        name: 'Heard Island and McDonald Islands',
      },
      {
        code: 'VA',
        name: 'Holy See (Vatican City State)',
      },
      {
        code: 'HN',
        name: 'Honduras',
      },
      {
        code: 'HK',
        name: 'Hong Kong',
      },
      {
        code: 'HU',
        name: 'Hungary',
      },
      {
        code: 'IS',
        name: 'Iceland',
      },
      {
        code: 'IN',
        name: 'India',
      },
      {
        code: 'ID',
        name: 'Indonesia',
      },
      {
        code: 'IR',
        name: 'Iran, Islamic Republic of',
      },
      {
        code: 'IQ',
        name: 'Iraq',
      },
      {
        code: 'IE',
        name: 'Ireland',
      },
      {
        code: 'IM',
        name: 'Isle of Man',
      },
      {
        code: 'IL',
        name: 'Israel',
      },
      {
        code: 'IT',
        name: 'Italy',
      },
      {
        code: 'JM',
        name: 'Jamaica',
      },
      {
        code: 'JP',
        name: 'Japan',
      },
      {
        code: 'JE',
        name: 'Jersey',
      },
      {
        code: 'JO',
        name: 'Jordan',
      },
      {
        code: 'KZ',
        name: 'Kazakhstan',
      },
      {
        code: 'KE',
        name: 'Kenya',
      },
      {
        code: 'KI',
        name: 'Kiribati',
      },
      {
        code: 'KP',
        name: 'Korea, Democratic People\'s Republic of',
      },
      {
        code: 'KR',
        name: 'Korea, Republic of',
      },
      {
        code: 'KW',
        name: 'Kuwait',
      },
      {
        code: 'KG',
        name: 'Kyrgyzstan',
      },
      {
        code: 'LA',
        name: 'Lao People\'s Democratic Republic',
      },
      {
        code: 'LV',
        name: 'Latvia',
      },
      {
        code: 'LB',
        name: 'Lebanon',
      },
      {
        code: 'LS',
        name: 'Lesotho',
      },
      {
        code: 'LR',
        name: 'Liberia',
      },
      {
        code: 'LY',
        name: 'Libya',
      },
      {
        code: 'LI',
        name: 'Liechtenstein',
      },
      {
        code: 'LT',
        name: 'Lithuania',
      },
      {
        code: 'LU',
        name: 'Luxembourg',
      },
      {
        code: 'MO',
        name: 'Macao',
      },
      {
        code: 'MK',
        name: 'Macedonia, the Former Yugoslav Republic of',
      },
      {
        code: 'MG',
        name: 'Madagascar',
      },
      {
        code: 'MW',
        name: 'Malawi',
      },
      {
        code: 'MY',
        name: 'Malaysia',
      },
      {
        code: 'MV',
        name: 'Maldives',
      },
      {
        code: 'ML',
        name: 'Mali',
      },
      {
        code: 'MT',
        name: 'Malta',
      },
      {
        code: 'MH',
        name: 'Marshall Islands',
      },
      {
        code: 'MQ',
        name: 'Martinique',
      },
      {
        code: 'MR',
        name: 'Mauritania',
      },
      {
        code: 'MU',
        name: 'Mauritius',
      },
      {
        code: 'YT',
        name: 'Mayotte',
      },
      {
        code: 'MX',
        name: 'Mexico',
      },
      {
        code: 'FM',
        name: 'Micronesia, Federated States of',
      },
      {
        code: 'MD',
        name: 'Moldova, Republic of',
      },
      {
        code: 'MC',
        name: 'Monaco',
      },
      {
        code: 'MN',
        name: 'Mongolia',
      },
      {
        code: 'ME',
        name: 'Montenegro',
      },
      {
        code: 'MS',
        name: 'Montserrat',
      },
      {
        code: 'MA',
        name: 'Morocco',
      },
      {
        code: 'MZ',
        name: 'Mozambique',
      },
      {
        code: 'MM',
        name: 'Myanmar',
      },
      {
        code: 'NA',
        name: 'Namibia',
      },
      {
        code: 'NR',
        name: 'Nauru',
      },
      {
        code: 'NP',
        name: 'Nepal',
      },
      {
        code: 'NL',
        name: 'Netherlands',
      },
      {
        code: 'NC',
        name: 'New Caledonia',
      },
      {
        code: 'NZ',
        name: 'New Zealand',
      },
      {
        code: 'NI',
        name: 'Nicaragua',
      },
      {
        code: 'NE',
        name: 'Niger',
      },
      {
        code: 'NG',
        name: 'Nigeria',
      },
      {
        code: 'NU',
        name: 'Niue',
      },
      {
        code: 'NF',
        name: 'Norfolk Island',
      },
      {
        code: 'MP',
        name: 'Northern Mariana Islands',
      },
      {
        code: 'NO',
        name: 'Norway',
      },
      {
        code: 'OM',
        name: 'Oman',
      },
      {
        code: 'PK',
        name: 'Pakistan',
      },
      {
        code: 'PW',
        name: 'Palau',
      },
      {
        code: 'PS',
        name: 'Palestine, State of',
      },
      {
        code: 'PA',
        name: 'Panama',
      },
      {
        code: 'PG',
        name: 'Papua New Guinea',
      },
      {
        code: 'PY',
        name: 'Paraguay',
      },
      {
        code: 'PE',
        name: 'Peru',
      },
      {
        code: 'PH',
        name: 'Philippines',
      },
      {
        code: 'PN',
        name: 'Pitcairn',
      },
      {
        code: 'PL',
        name: 'Poland',
      },
      {
        code: 'PT',
        name: 'Portugal',
      },
      {
        code: 'PR',
        name: 'Puerto Rico',
      },
      {
        code: 'QA',
        name: 'Qatar',
      },
      {
        code: 'RO',
        name: 'Romania',
      },
      {
        code: 'RU',
        name: 'Russian Federation',
      },
      {
        code: 'RW',
        name: 'Rwanda',
      },
      {
        code: 'RE',
        name: 'Réunion',
      },
      {
        code: 'BL',
        name: 'Saint Barthélemy',
      },
      {
        code: 'SH',
        name: 'Saint Helena, Ascension and Tristan da Cunha',
      },
      {
        code: 'KN',
        name: 'Saint Kitts and Nevis',
      },
      {
        code: 'LC',
        name: 'Saint Lucia',
      },
      {
        code: 'MF',
        name: 'Saint Martin (French part)',
      },
      {
        code: 'PM',
        name: 'Saint Pierre and Miquelon',
      },
      {
        code: 'VC',
        name: 'Saint Vincent and the Grenadines',
      },
      {
        code: 'WS',
        name: 'Samoa',
      },
      {
        code: 'SM',
        name: 'San Marino',
      },
      {
        code: 'ST',
        name: 'Sao Tome and Principe',
      },
      {
        code: 'SA',
        name: 'Saudi Arabia',
      },
      {
        code: 'SN',
        name: 'Senegal',
      },
      {
        code: 'RS',
        name: 'Serbia',
      },
      {
        code: 'SC',
        name: 'Seychelles',
      },
      {
        code: 'SL',
        name: 'Sierra Leone',
      },
      {
        code: 'SG',
        name: 'Singapore',
      },
      {
        code: 'SX',
        name: 'Sint Maarten (Dutch part)',
      },
      {
        code: 'SK',
        name: 'Slovakia',
      },
      {
        code: 'SI',
        name: 'Slovenia',
      },
      {
        code: 'SB',
        name: 'Solomon Islands',
      },
      {
        code: 'SO',
        name: 'Somalia',
      },
      {
        code: 'ZA',
        name: 'South Africa',
      },
      {
        code: 'GS',
        name: 'South Georgia and the South Sandwich Islands',
      },
      {
        code: 'SS',
        name: 'South Sudan',
      },
      {
        code: 'ES',
        name: 'Spain',
      },
      {
        code: 'LK',
        name: 'Sri Lanka',
      },
      {
        code: 'SD',
        name: 'Sudan',
      },
      {
        code: 'SR',
        name: 'Suriname',
      },
      {
        code: 'SJ',
        name: 'Svalbard and Jan Mayen',
      },
      {
        code: 'SZ',
        name: 'Swaziland',
      },
      {
        code: 'SE',
        name: 'Sweden',
      },
      {
        code: 'CH',
        name: 'Switzerland',
      },
      {
        code: 'SY',
        name: 'Syrian Arab Republic',
      },
      {
        code: 'TW',
        name: 'Taiwan, Province of China',
      },
      {
        code: 'TJ',
        name: 'Tajikistan',
      },
      {
        code: 'TZ',
        name: 'Tanzania, United Republic of',
      },
      {
        code: 'TH',
        name: 'Thailand',
      },
      {
        code: 'TL',
        name: 'Timor-Leste',
      },
      {
        code: 'TG',
        name: 'Togo',
      },
      {
        code: 'TK',
        name: 'Tokelau',
      },
      {
        code: 'TO',
        name: 'Tonga',
      },
      {
        code: 'TT',
        name: 'Trinidad and Tobago',
      },
      {
        code: 'TN',
        name: 'Tunisia',
      },
      {
        code: 'TR',
        name: 'Turkey',
      },
      {
        code: 'TM',
        name: 'Turkmenistan',
      },
      {
        code: 'TC',
        name: 'Turks and Caicos Islands',
      },
      {
        code: 'TV',
        name: 'Tuvalu',
      },
      {
        code: 'UG',
        name: 'Uganda',
      },
      {
        code: 'UA',
        name: 'Ukraine',
      },
      {
        code: 'AE',
        name: 'United Arab Emirates',
      },
      {
        code: 'GB',
        name: 'United Kingdom',
      },
      {
        code: 'US',
        name: 'United States',
      },
      {
        code: 'UM',
        name: 'United States Minor Outlying Islands',
      },
      {
        code: 'UY',
        name: 'Uruguay',
      },
      {
        code: 'UZ',
        name: 'Uzbekistan',
      },
      {
        code: 'VU',
        name: 'Vanuatu',
      },
      {
        code: 'VE',
        name: 'Venezuela, Bolivarian Republic of',
      },
      {
        code: 'VN',
        name: 'Viet Nam',
      },
      {
        code: 'VG',
        name: 'Virgin Islands, British',
      },
      {
        code: 'VI',
        name: 'Virgin Islands, U.S.',
      },
      {
        code: 'WF',
        name: 'Wallis and Futuna',
      },
      {
        code: 'EH',
        name: 'Western Sahara',
      },
      {
        code: 'YE',
        name: 'Yemen',
      },
      {
        code: 'ZM',
        name: 'Zambia',
      },
      {
        code: 'ZW',
        name: 'Zimbabwe',
      },
      {
        code: 'AX',
        name: 'Åland Islands',
      },
    ]

    selectedShops: string[] = []
    shops = [
      {
        id: 'game2',
        title: '2game',
      },
      {
        id: 'allyouplay',
        title: 'AllYouPlay',
      },
      {
        id: 'amazonus',
        title: 'Amazon',
      },
      {
        id: 'chrono',
        title: 'Chrono.gg',
      },
      {
        id: 'dlgamer',
        title: 'DLGamer',
      },
      {
        id: 'direct2drive',
        title: 'Direct2Drive',
      },
      {
        id: 'dreamgame',
        title: 'Dreamgame',
      },
      {
        id: 'bundlestars',
        title: 'Fanatical',
      },
      {
        id: 'gamebillet',
        title: 'GameBillet',
      },
      {
        id: 'gamersgate',
        title: 'GamersGate',
      },
      {
        id: 'gamesplanetde',
        title: 'GamesPlanet DE',
      },
      {
        id: 'gamesplanetfr',
        title: 'GamesPlanet FR',
      },
      {
        id: 'gamesplanet',
        title: 'GamesPlanet UK',
      },
      {
        id: 'gamesplanetus',
        title: 'GamesPlanet US',
      },
      {
        id: 'gamesrepublic',
        title: 'GamesRepublic',
      },
      {
        id: 'greenmangaming',
        title: 'GreenManGaming',
      },
      {
        id: 'humblestore',
        title: 'Humble Store',
      },
      {
        id: 'humblewidgets',
        title: 'Humble Widgets',
      },
      {
        id: 'indiegalastore',
        title: 'IndieGala Store',
      },
      {
        id: 'lbostore',
        title: 'LBOstore',
      },
      {
        id: 'macgamestore',
        title: 'MacGameStore',
      },
      {
        id: 'newegg',
        title: 'Newegg',
      },
      {
        id: 'nuuvem',
        title: 'Nuuvem',
      },
      {
        id: 'playism',
        title: 'Playism',
      },
      {
        id: 'savemi',
        title: 'Savemi',
      },
      {
        id: 'silagames',
        title: 'SilaGames',
      },
      {
        id: 'squenix',
        title: 'Square Enix',
      },
      {
        id: 'steam',
        title: 'Steam',
      },
      {
        id: 'voidu',
        title: 'Voidu',
      },
      {
        id: 'wingamestore',
        title: 'WinGameStore',
      },
    ]

    savingError = false

    mounted() {
      http.get('/account')
        .then((res) => {
          this.userCountry = res.data.country as Country
          this.selectedShops = res.data.shops
        })
    }

    private saveSettings() {
      this.savingError = false

      const selectedShops: string[] = Object.assign([], this.selectedShops).filter((obj) => obj !== '')

      if (selectedShops.length <= 0) {
        selectedShops.push('steam')
        this.selectedShops.push('steam')
      }

      const data = {
        country: this.userCountry,
        shops: selectedShops,
      }

      http.patch('/account', data)
        .then(async () => {
          await this.$store.dispatch('country', this.userCountry.code)
        })
        .catch(() => this.savingError = true)
        .finally(() => EventBus.$emit('show-snackbar', this.savingData()))
    }

    private deleteAccount() {
      this.$swal({
        buttonsStyling: false,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'v-btn theme--dark secondary',
        confirmButtonText: this.$t('account.deleteButtonText') as string,
        cancelButtonClass: 'v-btn theme--dark',
        cancelButtonText: this.$t('account.deleteDialogCancel') as string,
        title: this.$t('account.deleteDialogTitle') as string,
        text: this.$t('account.deleteDialogMessage') as string,
      }).then((result) => {
        if (result.value) {
          this.$swal({
            type: 'warning',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonClass: 'v-btn theme--dark secondary',
            confirmButtonText: this.$t('account.deleteButtonText') as string,
            cancelButtonClass: 'v-btn theme--dark',
            cancelButtonText: this.$t('account.deleteDialogCancel') as string,
            title: this.$t('account.deleteDialogTitleConfirm') as string,
            text: this.$t('account.deleteDialogMessageConfirm') as string,
            preConfirm: () => {
              http.delete('/account')
                .then(async () => {
                  const snack = {
                    message: this.$t('account.deleteDialogDone') as string,
                    color: 'success',
                  } as SnackbarMessage

                  await this.$store.dispatch('gameList', 0)
                  await this.$store.dispatch('token', '')
                  router.push('home')

                  EventBus.$emit('show-snackbar', snack)
                })
                .catch(() => {
                  const snack = {
                    message: this.$t('account.saveError') as string,
                    color: 'error',
                  } as SnackbarMessage

                  EventBus.$emit('show-snackbar', snack)
                })
            },
          })
        }
      })
    }

    private exportData() {
      http.get('/export', {responseType: 'blob'})
        .then((res) => {
          fileDownload(res.data, 'pressurizer_export.json')
        })
        .catch(() => {
          const snack = {
            message: this.$t('account.exportError') as string,
            color: 'error',
          } as SnackbarMessage

          EventBus.$emit('show-snackbar', snack)
        })
    }

    private async importData() {
      const {value: file} = await this.$swal({
        confirmButtonClass: 'v-btn theme--dark primary',
        title: this.$t('account.importDialogTitle') as string,
        input: 'file',
        inputAttributes: {
          accept: 'application/json',
        },
      })

      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        http.post('/import',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            const snack = {
              message: this.$t('account.importSuccess') as string,
              color: 'success',
            } as SnackbarMessage

            EventBus.$emit('show-snackbar', snack)
          })
          .catch(() => {
            const snack = {
              message: this.$t('account.importError') as string,
              color: 'error',
            } as SnackbarMessage

            EventBus.$emit('show-snackbar', snack)
          })
      }

    }

    private savingData(): SnackbarMessage {
      if (this.savingError) {
        return {
          message: this.$t('account.saveError') as string,
          color: 'error',
        } as SnackbarMessage
      } else {
        return {
          message: this.$t('account.saved') as string,
          color: 'success',
        } as SnackbarMessage
      }
    }
  }
</script>
