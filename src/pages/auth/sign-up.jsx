import { zodResolver } from "@hookform/resolvers/zod";
import {
    BadgeDollarSign,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Unlock,
    User,
} from "lucide-react";
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
import SignUpSchema from "@/schema/auth/sign-up";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const signUpForm = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const { setFocus } = signUpForm;

    useEffect(() => {
        setFocus("fullName");
    }, [setFocus]);

    const onSubmit = async (data) => {
        setLoading(true);
        setTimeout(async () => {
            if (await signUp(data)) {
                navigate("/auth/sign-in");
            }
            signUpForm.reset();
            setFocus("fullName");
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
                    <span className="font-normal">Create your </span>{" "}
                    <b>EzStore</b> account
                </Heading>
                <Heading size="h6" className="text-muted-foreground">
                    Start your journey with us and experience the best of
                    e-commerce solutions.
                </Heading>
            </div>
            <form
                onSubmit={signUpForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FieldSet className={"gap-4"}>
                    <FieldGroup>
                        <Controller
                            name="fullName"
                            control={signUpForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="fullName">
                                        Full Name
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <User />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            id="fullName"
                                            placeholder="Harshit Jain"
                                            {...field}
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <Mail />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            id="email"
                                            type="email"
                                            placeholder="example@example.com"
                                            {...field}
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="•••••••••"
                                            {...field}
                                        />
                                        <InputGroupAddon>
                                            {!showPassword ? (
                                                <Lock />
                                            ) : (
                                                <Unlock />
                                            )}
                                        </InputGroupAddon>
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                size="icon"
                                                variant="none"
                                                aria-label="Toggle Password Visibility"
                                                title="Toggle Password Visibility"
                                                onClick={() => {
                                                    setShowPassword(
                                                        !showPassword
                                                    );
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <PasswordStrength
                            password={signUpForm.watch("password")}
                        />
                    </FieldGroup>
                </FieldSet>
                <Button isLoading={loading} disabled={loading} type="submit">
                    Sign Up with Email
                </Button>
            </form>

            <Heading size="p" className="text-center">
                Already have an account?{" "}
                <Link
                    className="text-primary font-medium decoration-wavy underline-offset-4 hover:underline active:underline"
                    to="/auth/sign-in"
                >
                    Sign In
                </Link>
            </Heading>
        </div>
    );
}

export default SignUp;
