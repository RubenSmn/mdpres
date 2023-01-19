import React, { createContext, useContext, useState } from "react";

interface SubSlideProviderProps {
  children: React.ReactNode;
  value: {
    subSlideIndex: number;
  };
}

type SubSlidesContextType = {
  subSlideIndex: number;
};

export const SubSlideContext = createContext<SubSlidesContextType>({
  subSlideIndex: 0,
});

const SubSlideProvider: React.FC<SubSlideProviderProps> = ({
  children,
  value,
}) => {
  return (
    <SubSlideContext.Provider value={value}>
      {children}
    </SubSlideContext.Provider>
  );
};

export default SubSlideProvider;

export const useSlideContext = () => {
  return useContext(SubSlideContext);
};
