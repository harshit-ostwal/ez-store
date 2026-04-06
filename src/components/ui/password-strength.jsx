import * as React from "react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./headings";
import { Progress } from "./progress";
import { X } from "lucide-react";

function PasswordStrength({ password = "" }) {
    const requirements = useMemo(() => {
        return [
            {
                label: "At least 6 characters",
                met: password.length >= 6,
            },
            {
                label: "At least 1 number",
                met: /\d/.test(password),
            },
            {
                label: "At least 1 lowercase letter",
                met: /[a-z]/.test(password),
            },
            {
                label: "At least 1 uppercase letter",
                met: /[A-Z]/.test(password),
            },
            {
                label: "At least 1 special character",
                met: /[^a-zA-Z0-9]/.test(password),
            },
        ];
    }, [password]);

    const strength = useMemo(() => {
        const metCount = requirements.filter((req) => req.met).length;
        return (metCount / requirements.length) * 100;
    }, [requirements]);

    const getStrengthColor = () => {
        if (strength === 0) return "bg-muted";
        if (strength <= 20) return "bg-destructive";
        if (strength <= 40) return "bg-orange-500";
        if (strength <= 60) return "bg-yellow-500";
        if (strength <= 80) return "bg-lime-500";
        return "bg-green-500";
    };

    const getStrengthLabel = () => {
        if (strength === 0) return "Too Weak";
        if (strength <= 20) return "Weak";
        if (strength <= 40) return "Fair";
        if (strength <= 60) return "Good";
        if (strength <= 80) return "Strong";
        return "Very Strong";
    };

    if (password.length === 0) {
        return null;
    }

    return (
        <div className={"flex flex-col gap-3"}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <Heading
                        size="p"
                        className={"text-muted-foreground md:text-base"}
                    >
                        Password Strength
                    </Heading>
                    <Heading
                        size="p"
                        className={cn(
                            "font-medium md:text-base",
                            strength === 0 && "text-muted-foreground",
                            strength > 0 &&
                                strength <= 20 &&
                                "text-destructive",
                            strength > 20 &&
                                strength <= 40 &&
                                "text-orange-500",
                            strength > 40 &&
                                strength <= 60 &&
                                "text-yellow-500",
                            strength > 60 && strength <= 80 && "text-lime-500",
                            strength > 80 && "text-green-500"
                        )}
                    >
                        {getStrengthLabel()}
                    </Heading>
                </div>

                <Progress
                    value={strength}
                    indicatorClassName={cn(getStrengthColor())}
                />
            </div>

            {strength < 100 && (
                <div className="flex flex-col gap-2">
                    <Heading
                        size="p"
                        className="text-muted-foreground md:text-base"
                    >
                        Password must contain:
                    </Heading>
                    <div className="flex flex-col gap-1.5">
                        {requirements
                            .filter((req) => !req.met)
                            .map((req, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <X className="text-muted-foreground size-4 shrink-0" />
                                    <Heading
                                        size="p"
                                        className={cn(
                                            "text-muted-foreground md:text-base transition-colors"
                                        )}
                                    >
                                        {req.label}
                                    </Heading>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export { PasswordStrength };
