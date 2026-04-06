import z from "zod/v4";
import { zString } from "@/utils/zod.utils";

const ProfileSchema = z
  .strictObject({
    fullName: zString("Full Name")
      .transform((value) =>
        value
          .trim()
          .split(" ")
          .filter(Boolean)
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" "),
      )
      .optional(),
  })
  .partial()
  .strip();

export default ProfileSchema;
