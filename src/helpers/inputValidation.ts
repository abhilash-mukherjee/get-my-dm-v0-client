
export function validateFullName(name: string): ValidatedInput {
    if (name.length < 2)
        return { isValid: false, errorMessage: 'Name should be atleast 2 characters long' }
    if (name.length > 30)
        return { isValid: false, errorMessage: 'Name can have 30 characters at max' }
    return {isValid:true, errorMessage:''}
}

export function validateEmail(email: string): ValidatedInput {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    if (!emailRegex.test(email)) {
        return { isValid: false, errorMessage: 'Invalid email format' };
    }
    return { isValid: true, errorMessage: '' };
}

export function validatePassword(password: string): ValidatedInput {
    if (password.length < 6) {
        return { isValid: false, errorMessage: 'Password should be at least 6 characters long' };
    }
    if (password.length > 30) {
        return { isValid: false, errorMessage: 'Password can have 30 characters at max' };
    }
    return { isValid: true, errorMessage: '' };
}

export function validateBio(bio: string): ValidatedInput {
    if (bio.length < 5) {
        return { isValid: false, errorMessage: 'Bio should be at least 5 characters long' };
    }
    if (bio.length > 40) {
        return { isValid: false, errorMessage: 'Bio can have 40 characters at max' };
    }
    return { isValid: true, errorMessage: '' };
}

export function validateDefaultMessage(defaultMessage: string): ValidatedInput {
    if (defaultMessage.length < 50) {
        return { isValid: false, errorMessage: 'Default message should be at least 50 characters long' };
    }
    if (defaultMessage.length > 200) {
        return { isValid: false, errorMessage: 'Default message can have 200 characters at max' };
    }
    return { isValid: true, errorMessage: '' };
}

export interface ValidatedInput {
    isValid: boolean,
    errorMessage: string
}