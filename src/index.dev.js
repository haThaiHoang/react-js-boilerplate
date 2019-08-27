import './app/bootstrap'

if (module.hot) {
  module.hot.accept('./app/bootstrap', () => {
    require('./app/bootstrap')
  })

  module.hot.addStatusHandler((status) => {
    // eslint-disable-next-line
    if (status === 'prepare') console.clear()
  })
}
