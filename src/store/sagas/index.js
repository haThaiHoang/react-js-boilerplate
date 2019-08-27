import { all } from 'redux-saga/effects'

import account from './account'

export default function* sagas() {
  yield all([
    account()
  ])
}
