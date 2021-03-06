export default {
  close: 'Cerrar',
  save: 'Guardar',
  hours: '{h} hora | {h} horas',
  minutes: '{m} minuto | {m} minutos',
  gamesNew: '{n} juego nuevo | {n} juegos nuevos',
  gamesUpdated: '{u} juego actualizado | {u} juegos actualizados',
  toolbar: {
    account: 'Cuenta',
    login: 'Acceder',
    logout: 'Salir',
    update: 'Actualizar juegos',
    wishlist: 'Lista de deseados',
  },
  landing: {
    subtitle: '¿Cuánto he gastado en Steam?',
    wallet: {
      title: 'Controla tu cartera',
      desc: 'Asegúrate de que es necesario comprar el juego que quieres. Obtenga estadísticas basadas en ' +
        'sus juegos y tiempo de juego.',
    },
    stats: {
      title: 'Números reales',
      desc: 'Usted actualiza los costos reales para que Pressurizer pueda proporcionar una visión precisa ' +
        'del valor que obtiene de los juegos.',
    },
    fast: {
      title: 'Realmente rápido',
      desc: 'Pressurizer es rápido. Procese su biblioteca en menos de siete minutos. ' +
        '(Estimación para una biblioteca de 1200 juegos).',
    },
  },
  table: {
    header: {
      title: 'Nombre',
      cost: 'Coste',
      hours: 'Horas',
      costHours: 'Coste/Horas',
      finished: '¿Finalizado?',
    },
    noGames: 'Lo siento, no hay nada que mostrar aquí :(',
    gameMarkedAsFinished: '{title} ha sido marcado como finalizado.',
    gameMarkedAsNotFinished: '{title} ha sido marcado como no finalizado.',
    gameUpdatedCost: '{title} ahora cuesta {cost}',
    gameListUpdated: '{0} y {1}.',
    statsAverageCost: 'Coste medio',
    statsTotalCost: 'Coste total',
    statsAverageTime: 'Tiempo jugado medio',
    statsTotalTime: 'Tiempo jugado total',
    statsAverageCostTime: 'Media coste / horas',
  },
  errors: {
    priceOutOfBounds: 'El valor debe de estar entre 0 y 999999999.',
    waitHours: 'Debes esperar {0} y {1} antes de volver a actualizar tu biblioteca de nuevo.',
  },
  wishlist: {
    notYet: 'No disponible aún.',
    updated: 'Lista de deseados actualizada.',
    updateError: 'Error al actualizar la lista de deseados.',
    emptyWishlistTitle: 'Lista de deseados vacía',
    emptyWishlistMessage: 'No se han encontrado ningún juego en la lista de deseados. ' +
      'Inicia una nueva búsqueda con el botón de abajo.',
    updateWishlistButton: 'Actualizar lista de deseados',
  },
  account: {
    saved: 'Ajustes guardados.',
    saveError: 'Error al guardar los ajustes.',
    country: 'Selecciona tu país',
    shops: 'Seleccionar tiendas',
    exportButtonText: 'Exportar datos',
    exportError: 'Error al exportar tus datos, prueba de nuevo.',
    importButtonText: 'Importar datos',
    importError: 'Error al importar tus datos. El fichero puede que esté corrupto.',
    importSuccess: 'Se han importado correctamente los datos.',
    importDialogTitle: 'Selecciona el fichero de datos exportado',
    deleteButtonText: 'Eliminar cuenta',
    deleteDialogTitle: '¿Eliminar cuenta?',
    deleteDialogTitleConfirm: '¿Estás seguro?',
    deleteDialogMessage: 'Si eliminas tu cuenta, toda la información se borrará para siempre. ' +
      '¿Estás seguro de que quieres continuar?',
    deleteDialogMessageConfirm: 'Esta acción no se puede deshacer. Considera antes exportar tus datos.',
    deleteDialogCancel: 'Cancelar',
    deleteDialogDone: 'Cuenta eliminada.',
    deleteDialogError: 'Error al eliminar la cuenta.',
  },
}
