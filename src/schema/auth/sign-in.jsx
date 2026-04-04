import { zEmail, zPassword } from "@/utils/zod.utils";
import z from "zod/v4";

const SignInSchema = z.strictObject({
  email: zEmail(),
  password: zPassword(),
});

export default SignInSchema;
