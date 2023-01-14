import { SizeTable } from "./constants";

export type SlideType = {
  content: string;
  subSlideCount: number;
  markdown?: React.ReactNode;
  notes: string[];
  title?: string;
  size?: keyof typeof SizeTable;
};
