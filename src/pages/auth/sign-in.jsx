import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeDollarSign, Eye, EyeOff, Lock, Mail, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
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
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useAuth } from "@/providers/AuthProvider";
import SignInSchema from "@/schema/auth/sign-in";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const signInForm = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setFocus } = signInForm;

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    const onSubmit = async (data) => {
        setLoading(true);
        setTimeout(async () => {
            if (await signIn(data)) {
                navigate("/");
            }
            signInForm.reset();
            setFocus("email");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <BadgeDollarSign
                size={64}
                className="p-4 bg-foreground text-background rounded-xl"
            />
            <div className="flex flex-col gap-2">
                <Heading size="h5">
                    <span className="font-normal">Welcome back to</span>{" "}
                    <b>EzStore</b>
                </Heading>
                <Heading size="h6" className="text-muted-foreground">
                    Securely access your account and manage your store with
                    ease.
                </Heading>
            </div>
            <form
                onSubmit={signInForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FieldGroup>
                    <Controller
                        name="email"
                        control={signInForm.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <Mail />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="email"
                                        type="email"
                                        placeholder="abc@example.com"
                                        {...field}
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
                        control={signInForm.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Link
                                        to="/auth/reset-password"
                                        className="text-muted-foreground font-medium hover:text-primary duration-300 hover:transition-colors active:text-primary decoration-wavy underline-offset-4 hover:underline active:underline"
                                    >
                                        Reset Password?
                                    </Link>
                                </div>
                                <InputGroup>
                                    <InputGroupInput
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="•••••••••"
                                        {...field}
                                    />
                                    <InputGroupAddon>
                                        {!showPassword ? <Lock /> : <Unlock />}
                                    </InputGroupAddon>
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            size="icon"
                                            variant="none"
                                            aria-label="Toggle Password Visibility"
                                            title="Toggle Password Visibility"
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword ? (
                                                <Eye />
                                            ) : (
                                                <EyeOff />
                                            )}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <PasswordStrength password={signInForm.watch("password")} />
                </FieldGroup>
                <Button isLoading={loading} disabled={loading} type="submit">
                    Sign In with Email
                </Button>
            </form>

            <Heading size="p" className="text-center">
                New to EzStore?{" "}
                <Link
                    to="/auth/sign-up"
                    className="text-primary font-medium decoration-wavy underline-offset-4 hover:underline active:underline"
                >
                    Create an account
                </Link>
            </Heading>
        </div>
    );
}

export default SignIn;
