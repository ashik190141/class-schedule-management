import { z } from "zod";

const bookingClassSchema = z.object({
  classId: z
    .string({
      required_error: "classId is required",
    })
    .uuid("classId should be uuid"),
});

export const bookingSchemaValidation = {
    bookingClassSchema
}