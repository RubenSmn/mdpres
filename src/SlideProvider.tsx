import React, { createContext, useContext, useReducer } from "react";
import slideReducer, {
  SlideStateType,
  SlideActionType,
} from "./reducers/slideReducer";

interface SlideProviderProps {
  children: React.ReactNode;
}

type SlidesContextType = {
  currentSlideIndex: number;
  subSlideIndex: number;
  dispatch: React.Dispatch<SlideActionType>;
};

export const SlideContext = createContext<SlidesContextType>({
  currentSlideIndex: 0,
  subSlideIndex: 0,
  dispatch: () => console.warn("No SlideProvider"),
});

const initialState: SlideStateType = {
  currentSlideIndex: 0,
  subSlideIndex: 0,
};

const SlideProvider: React.FC<SlideProviderProps> = ({ children }) => {
  const [{ currentSlideIndex, subSlideIndex }, dispatch] = useReducer(
    slideReducer,
    initialState,
  );

  const value = {
    currentSlideIndex,
    subSlideIndex,
    dispatch,
  };

  return (
    <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
  );
};

export default SlideProvider;

export const useSlideContext = () => {
  return useContext(SlideContext);
};
