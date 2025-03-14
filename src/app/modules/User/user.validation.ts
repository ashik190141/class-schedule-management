import { Gender } from "@prisma/client";
import { z } from "zod";

const createAdminSchema = z.object({
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  admin: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    contactNumber: z
      .string({
        required_error: "contact number is required",
      })
      .regex(/^\d+$/, "Contact number must be digits only")
      .min(11, "Required 11 digits"),
    gender: z.nativeEnum(Gender, {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either 'MALE' or 'FEMALE'",
    }),
  }),
});

const createTraineeSchema = z.object({
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  trainee: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    contactNumber: z
      .string({
        required_error: "contact number is required",
      })
      .regex(/^\d+$/, "Contact number must be digits only")
      .min(11, "Required 11 digits"),
    gender: z.nativeEnum(Gender, {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either 'MALE' or 'FEMALE'",
    }),
  }),
});

const createTrainerSchema = z.object({
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  trainer: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    contactNumber: z
      .string({
        required_error: "contact number is required",
      })
      .regex(/^\d+$/, "Contact number must be digits only")
      .min(11, "Required 11 digits"),
    gender: z.nativeEnum(Gender, {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either 'MALE' or 'FEMALE'",
    }),
  }),
});

const updateProfileSchema = z
  .object({
    name: z.string().optional(),

    contactNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{10,15}$/.test(val), {
        message: "Contact number must be between 10-15 digits.",
      }),

    gender: z
      .nativeEnum(Gender, {
        invalid_type_error: "Gender must be either 'MALE' or 'FEMALE'.",
      })
      .optional(),
  });

export const userValidation = {
  createAdminSchema,
  createTraineeSchema,
  createTrainerSchema,
  updateProfileSchema,
};
