import z from "zod/v4";
import { zEmail, zPassword } from "@/utils/zod.utils";

const SignInSchema = z.strictObject({
    email: zEmail(),
    password: zPassword(),
});

export default SignInSchema;
