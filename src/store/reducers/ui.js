import { TYPES } from '@/store/actions'

const INIT_STATE = {
  isSideBarOpen: true
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.TOGGLE_SIDE_BAR:
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen
      }
    default:
      return state
  }
}
