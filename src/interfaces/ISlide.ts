export interface ISlide {
  content: string;
  subSlideCount: number;
  markdown?: React.ReactNode;
  title?: string;
  notes: string[];
}
