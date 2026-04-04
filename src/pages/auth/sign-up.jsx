import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Heading } from "@/components/ui/Headings";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/providers/AuthProvider";
import SignUpSchema from "@/schema/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

function SignUp() {
  const { signUp } = useAuth();

  const signUpForm = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    signUp(data);
  };

  return (
    <Card className="max-w-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 rounded-lg">
      <CardHeader>
        <Heading size="h5" className={"font-medium"}>
          Hey there, welcome! 👋
        </Heading>
        <Heading size="p">Sign up for a new account to get started.</Heading>
      </CardHeader>

      <CardContent>
        <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Controller
                name="fullName"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <InputGroup {...field}>
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                      <InputGroupInput placeholder="Harshit Jain" />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="email"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputGroup {...field}>
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                      <InputGroupInput
                        type="email"
                        placeholder="example@example.com"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="password"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup {...field}>
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                      <InputGroupInput
                        type="password"
                        placeholder="••••••••••"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit">Sign Up</Button>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
