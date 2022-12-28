import { defaultSchema } from "rehype-sanitize";

export const sanitizeSchema: Partial<typeof defaultSchema> = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), ["className"], ["data"]],
  },
};
