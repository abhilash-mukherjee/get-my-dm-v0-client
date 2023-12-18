export interface InputState<T>{
    input: T,
    isValid: boolean,
    errorMessage: string,
    isFreshInput?: boolean
}

export const defaultStringInputState : InputState<string> = {
    input: '',
    isValid: false,
    errorMessage: '',
    isFreshInput: true,
}