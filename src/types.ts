import { SizeTable } from "./constants";

export type SlideType = {
  content: string;
  subSlideCount: number;
  markdown?: React.ReactNode;
  title?: string;
  notes: string[];
  size: keyof typeof SizeTable;
};
