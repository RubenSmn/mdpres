import React, { createContext, useContext, useState } from "react";

interface SlideProviderProps {
  children: React.ReactNode;
}

type SlidesContextType = {
  subSlideIndex: number;
  setSubSlideIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const SlidesContext = createContext<SlidesContextType>({
  subSlideIndex: 0,
  setSubSlideIndex: () => console.warn("No Slide Provider"),
});

const SlideProvider: React.FC<SlideProviderProps> = ({ children }) => {
  const [subSlideIndex, setSubSlideIndex] = useState<number>(0);

  return (
    <SlidesContext.Provider value={{ subSlideIndex, setSubSlideIndex }}>
      {children}
    </SlidesContext.Provider>
  );
};

export default SlideProvider;

export const useSlideContext = () => {
  return useContext(SlidesContext);
};
