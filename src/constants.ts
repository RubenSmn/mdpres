import { defaultSchema } from "rehype-sanitize";

export const sanitizeSchema: Partial<typeof defaultSchema> = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), ["className"], ["data"]],
  },
};

export const SizeTable = {
  xs: 320,
  sm: 768,
  md: 992,
  lg: 1224,
  xl: 1824,
};
