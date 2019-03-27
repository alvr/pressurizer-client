export default {
  close: 'Close',
  save: 'Save',
  hours: '{h} hour | {h} hours',
  minutes: '{m} minute | {m} minutes',
  gamesNew: '{n} new game | {n} new games',
  gamesUpdated: '{u} game updated | {u} games updated',
  toolbar: {
    account: 'Account',
    login: 'Login',
    logout: 'Logout',
    update: 'Update games',
    wishlist: 'Wishlist',
  },
  landing: {
    subtitle: 'How much have I spent on Steam?',
    wallet: {
      title: 'Control your wallet',
      desc: 'Be sure if it is necessary to buy that game you want. Get statistics based on your games and play time.',
    },
    stats: {
      title: 'Real numbers',
      desc: 'You update actual costs so Pressurizer can provide an accurate view of the value you get from games.',
    },
    fast: {
      title: 'Blazing fast',
      desc: 'Pressurizer is fast. Get your library processed in under five minutes. ' +
        '(Estimate for a library of 1200 games).',
    },
  },
  table: {
    header: {
      title: 'Title',
      cost: 'Cost',
      hours: 'Hours',
      costHours: 'Cost/Hours',
      finished: 'Finished?',
    },
    noGames: 'Sorry, nothing to display here :(',
    gameMarkedAsFinished: '{0} has been marked as finished',
    gameMarkedAsNotFinished: '{0} has been marked as not finished',
    gameUpdatedCost: '{title} now cost {cost}',
    gameListUpdated: '{0} and {1}.',
  },
  errors: {
    priceOutOfBounds: 'The value must be between 0 and 999999999.',
    waitHours: 'You should wait {0} and {1} before updating your library again.',
  },
  wishlist: {
    notYet: 'Not yet available.',
    updated: 'Wishlist updated.',
    updateError: 'Error when updating wishlist.',
  },
  account: {
    saved: 'Settings saved.',
    saveError: 'Error when saving settings.',
    country: 'Select your country',
    shops: 'Select shops',
  },
}
