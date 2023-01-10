import React, { createContext, useContext, useState } from "react";

interface SlideProviderProps {
  children: React.ReactNode;
  value: {
    subSlideIndex: number;
  };
}

type SlidesContextType = {
  subSlideIndex: number;
};

export const SlidesContext = createContext<SlidesContextType>({
  subSlideIndex: 0,
});

const SlideProvider: React.FC<SlideProviderProps> = ({ children, value }) => {
  return (
    <SlidesContext.Provider value={value}>{children}</SlidesContext.Provider>
  );
};

export default SlideProvider;

export const useSlideContext = () => {
  return useContext(SlidesContext);
};
