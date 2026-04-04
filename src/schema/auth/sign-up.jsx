import { zEmail, zPassword, zString } from "@/utils/zod.utils";
import z from "zod/v4";

const SignUpSchema = z.strictObject({
  fullName: zString("Fullname"),
  email: zEmail(),
  password: zPassword(),
});

export default SignUpSchema;
