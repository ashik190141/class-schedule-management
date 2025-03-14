import { z } from "zod";

const classScheduleSchema = z.object({
  date: z
    .string({
      required_error: "Date is required",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message:
        "Invalid date format. Must be ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
    }),

  startTime: z
    .string({
      required_error: "Start time is required",
    })
    .regex(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)$/i,
      "Invalid time format. Must be in 'hh:mm AM/PM' format"
    ),
});

const assignTrainerSchema = z.object({
  trainerId: z.string({
    required_error: "Trainer ID is required",
  }),
});

const updateClassScheduleSchema = z.object({
    date: z.string().optional(),
    startTime: z.string().optional().refine(
        (val) => !val || /^(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)$/i.test(val),
        {
          message: "Invalid time format. Must be in 'hh:mm AM/PM' format",
        }
    ),
    trainerId: z.string().uuid('ID must be a uuid').optional()
})


export const classScheduleSchemaValidation = {
  classScheduleSchema,
  assignTrainerSchema,
  updateClassScheduleSchema,
};
