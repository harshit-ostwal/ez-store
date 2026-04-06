import z from "zod/v4";

const zString = (fieldName, minLength = 2, maxLength = 255) => {
    return z
        .string({ error: "Invalid string" })
        .min(minLength, {
            error: `${fieldName} must be at least ${minLength} characters long`,
        })
        .max(maxLength, {
            error: `${fieldName} must be at most ${maxLength} characters long`,
        });
};

const zEmail = (minLength = 2) => {
    return z
        .email({ pattern: z.regexes.email, error: "Invalid email address" })
        .toLowerCase()
        .trim()
        .min(minLength, {
            error: `Email must be at least ${minLength} characters long`,
        })
        .max(255, { error: "Email must be at most 255 characters long" });
};

const zNumber = (fieldName, minLength = 1, maxLength = 15) => {
    return z
        .number({ error: `Invalid ${fieldName}` })
        .min(minLength, `${fieldName} must be at least ${minLength}`)
        .max(maxLength, `${fieldName} must be at most ${maxLength}`);
};

const zUUID = (fieldName) => {
    return z
        .uuid({ error: `Invalid ${fieldName} format` })
        .min(36, `${fieldName} must be at least 36 characters long`)
        .max(36, `${fieldName} must be at most 36 characters long`);
};

const zPassword = (fieldName = "Password") => {
    return z
        .string({ error: `Invalid ${fieldName}` })
        .min(6, { error: `${fieldName} must be at least 6 characters long` })
        .max(128, { error: `${fieldName} must be at most 128 characters long` })
        .regex(/[a-z]/, {
            error: `${fieldName} must contain at least one lowercase letter`,
        })
        .regex(/[A-Z]/, {
            error: `${fieldName} must contain at least one uppercase letter`,
        })
        .regex(/[0-9]/, {
            error: `${fieldName} must contain at least one number`,
        })
        .regex(/[^a-zA-Z0-9]/, {
            error: `${fieldName} must contain at least one special character`,
        });
};

const zArray = (
    fieldName,
    itemSchema = z.any(),
    minLength = 1,
    maxLength = 100,
    defaultValue = []
) => {
    return z
        .array(itemSchema, { error: `Invalid ${fieldName}` })
        .min(minLength, {
            error: `${fieldName} must contain at least ${minLength} items`,
        })
        .max(maxLength, {
            error: `${fieldName} must contain at most ${maxLength} items`,
        })
        .default(defaultValue);
};

const zBoolean = (fieldName) => {
    return z.boolean({ error: `Invalid ${fieldName}` });
};

const zDate = (fieldName) => {
    return z.date({ error: `Invalid ${fieldName}` });
};

const zTimeStamp = (fieldName) => {
    return z.iso.datetime({ error: `Invalid ${fieldName}` });
};

const zUrl = (fieldName, minLength = 2, maxLength = 255) => {
    return z
        .url({ error: `Invalid ${fieldName}` })
        .min(minLength, {
            error: `${fieldName} must be at least ${minLength} characters long`,
        })
        .max(maxLength, {
            error: `${fieldName} must be at most ${maxLength} characters long`,
        });
};

const zEnum = (fieldName, values) => {
    return z.enum(values, { error: `Invalid ${fieldName}.` });
};

export {
    zArray,
    zBoolean,
    zDate,
    zEmail,
    zEnum,
    zNumber,
    zPassword,
    zString,
    zTimeStamp,
    zUrl,
    zUUID,
};
