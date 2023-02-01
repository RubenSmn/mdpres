import React, { createContext, useContext, useReducer } from "react";
import slideReducer, {
  SlideStateType,
  SlideActionType,
} from "../reducers/slideReducer";

const initialState: SlideStateType = {
  currentSlideIndex: 0,
  subSlideIndex: 0,
};

interface SlideProviderProps {
  children: React.ReactNode;
}

type SlideContextType = {
  currentSlideIndex: number;
  subSlideIndex: number;
};

type SlideDispatchContext = {
  dispatch: React.Dispatch<SlideActionType>;
};

export const SlideContext = createContext<SlideContextType>({
  currentSlideIndex: 0,
  subSlideIndex: 0,
});

export const SlideDispatchContext = createContext<SlideDispatchContext>({
  dispatch: () => console.warn("No SlideProvider"),
});

const SlideProvider: React.FC<SlideProviderProps> = ({ children }) => {
  const [{ currentSlideIndex, subSlideIndex }, dispatch] = useReducer(
    slideReducer,
    initialState,
  );

  const value = {
    currentSlideIndex,
    subSlideIndex,
  };

  return (
    <SlideDispatchContext.Provider value={{ dispatch }}>
      <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
    </SlideDispatchContext.Provider>
  );
};

export default SlideProvider;

export const useSlideContext = () => {
  return useContext(SlideContext);
};

export const useSlideDispatch = () => {
  return useContext(SlideDispatchContext);
};
