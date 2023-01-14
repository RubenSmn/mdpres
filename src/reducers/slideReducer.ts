export enum ACTION_TYPES {
  CHANGE_CURRENT_TO_VALUE = "CHANGE_CURRENT_TO_VALUE",
  CHANGE_SUB_TO_VALUE = "CHANGE_SUB_TO_VALUE",
  CHANGE_CURRENT_BY_VALUE = "CHANGE_CURRENT_BY_VALUE",
  CHANGE_SUB_BY_VALUE = "CHANGE_SUB_BY_VALUE",
}

export type SlideStateType = {
  currentSlideIndex: number;
  subSlideIndex: number;
};

export type SlideActionType = {
  type: ACTION_TYPES;
  payload: number;
};

const slideReducer = (state: SlideStateType, action: SlideActionType) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_CURRENT_TO_VALUE: {
      return {
        ...state,
        currentSlideIndex: action.payload,
      };
    }
    case ACTION_TYPES.CHANGE_SUB_TO_VALUE: {
      return {
        ...state,
        subSlideIndex: action.payload,
      };
    }
    case ACTION_TYPES.CHANGE_CURRENT_BY_VALUE: {
      return {
        ...state,
        currentSlideIndex: state.currentSlideIndex + action.payload,
      };
    }
    case ACTION_TYPES.CHANGE_SUB_BY_VALUE: {
      return {
        ...state,
        subSlideIndex: state.subSlideIndex + action.payload,
      };
    }
    default:
      return state;
  }
};

export default slideReducer;

export const changeCurrentSlideToValue = (value: number) => {
  return {
    type: ACTION_TYPES.CHANGE_CURRENT_TO_VALUE,
    payload: value,
  };
};

export const changeSubSlideToValue = (value: number) => {
  return {
    type: ACTION_TYPES.CHANGE_SUB_TO_VALUE,
    payload: value,
  };
};

export const changeCurrentSlideByValue = (value: number) => {
  return {
    type: ACTION_TYPES.CHANGE_CURRENT_BY_VALUE,
    payload: value,
  };
};

export const changeSubSlideByValue = (value: number) => {
  return {
    type: ACTION_TYPES.CHANGE_SUB_BY_VALUE,
    payload: value,
  };
};
