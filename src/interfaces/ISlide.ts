import { SizeTable } from "../constants";

export interface ISlide {
  content: string;
  subSlideCount: number;
  markdown?: React.ReactNode;
  title?: string;
  notes: string[];
  size: keyof typeof SizeTable;
}
