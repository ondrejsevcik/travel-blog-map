export const SEARCH_TEXT_CHANGED = 'SEARCH_TEXT_CHANGED';
export const searchTextChanged = text => ({
  type: SEARCH_TEXT_CHANGED,
  text
})

export const SEARCH_TEXT_CLEAR = 'SEARCH_TEXT_CLEAR';
export const searchTextClear = () => ({
  type: SEARCH_TEXT_CLEAR
})
