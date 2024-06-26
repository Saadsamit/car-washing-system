import { z } from 'zod';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const slotSchemaValidation = z.object({
  body: z.object({
    service: z.string().trim(),
    date: z.string().refine((val) => datePattern.test(val), {
      message: 'Invalid date format, expected YYYY-MM-DD',
    }),
    startTime: z.string().refine((val) => timePattern.test(val), {
      message: 'Ensures the time is in HH:MM format (24-hour)',
    }),
    endTime: z.string().refine((val) => timePattern.test(val), {
      message: 'Ensures the time is in HH:MM format (24-hour)',
    }),
  }),
});

export default slotSchemaValidation;
