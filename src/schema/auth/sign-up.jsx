import { zEmail, zPassword, zString } from "@/utils/zod.utils";
import z from "zod/v4";

const SignUpSchema = z.strictObject({
  fullName: zString("Full Name").transform((value) =>
    value
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
  ),
  email: zEmail(),
  password: zPassword(),
});

export default SignUpSchema;
