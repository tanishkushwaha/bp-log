import { z } from 'zod';

const BPDataSchema = z.object({
  date: z.string(),
  bp_sys: z.number(),
  bp_dia: z.number(),
  pr: z.number(),
});

const BPDataArraySchema = z.array(BPDataSchema);

export default (readings: any): { error: any | null } => {
  try {
    BPDataArraySchema.parse(readings);
    return { error: null };
  } catch (e: any) {
    return { error: e };
  }
};
