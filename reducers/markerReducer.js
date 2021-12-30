export const markerReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIST_MARKERS':
      return action.payload;
    case 'ADD_MARKER':
      return [...state, action.payload];
    case 'DELETE_MARKER':
      return state.filter((marker) => marker.id !== action.payload);
    case 'EDIT_MARKER':
      console.log(state[0].id, action.payload.id);
      return state.map((marker) => {
        return marker.id === action.payload.id
          ? {
              ...marker,
              notes: action.payload.notes,
              title: action.payload.title,
            }
          : marker;
      });
    default:
      return state;
  }
};
