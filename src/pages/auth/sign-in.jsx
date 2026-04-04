import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/Headings";
import { useAuth } from "@/providers/AuthProvider";
import SignInSchema from "@/schema/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function SignIn() {
  const { signIn } = useAuth();

  const signInForm = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {};

  return (
    <Card className="max-w-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 rounded-lg">
      <CardHeader>
        <Heading size="h5" className={"font-medium"}>
          Hey there, welcome back! 👋
        </Heading>
        <Heading size="p">Sign in to your account to continue.</Heading>
      </CardHeader>

      <CardContent>
        <form></form>
      </CardContent>
    </Card>
  );
}

export default SignIn;
