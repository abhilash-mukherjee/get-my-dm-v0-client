import { useState } from 'react';
import '../common/common-styles/formInput.css'

export function TextInput(props: TextInputProps) {
    const [isFreshInput, setIsFreshInput] = useState(true);
    const { id, errorMessage,pattern,  ...inputProps } = props;
    return (
        <>
            <div className='input-container'>
                <input {...inputProps} pattern={pattern} 
                onBlur={()=>setIsFreshInput(false)}
                data-is-fresh-input ={isFreshInput.toString()}
                />
                <span className='error-message'> {errorMessage}</span>
            </div>
        </>
    )
}

export function TextArea(props: TextAreaProps) {
    const [isFreshInput, setIsFreshInput] = useState(true);
    const { id, errorMessage, ...inputProps } = props;
    return (
        <>
            <div className='input-container'>
                <textarea {...inputProps} 
                onBlur={()=>setIsFreshInput(false)}
                data-is-fresh-input ={isFreshInput.toString()}
                />
                <span className='error-message'> {errorMessage}</span>
            </div>
        </>
    )
}

export interface FormInputProps {
    id: number;
    name: string;
    placeholder: string;
    errorMessage: string;
    required: boolean;
    minLength: number,
    maxLength: number
}

export interface TextInputProps extends FormInputProps {
    type: string,
    pattern: string
    onChange?:  (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface TextAreaProps extends FormInputProps {
    rows: number,
    onChange?:  (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

