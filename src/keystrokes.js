function isUndoKeyCombination(event) {
  return !event.shiftKey && (event.metaKey || (event.ctrlKey && !event.altKey)) && event.keyCode === 90;
}

function isRedoKeyCombination(event) {
  return event.shiftKey && (event.metaKey || (event.ctrlKey && !event.altKey)) && event.keyCode === 90;
}

export {
  isUndoKeyCombination,
  isRedoKeyCombination
};
