import { Button, CircularProgress, Typography } from '@mui/material';
import { Appbar } from '../../common/Appbar';
import { useNavigate } from 'react-router-dom';
import { TextInput, TextInputProps, TextAreaProps, TextArea } from '../../common/FormInput';
import '../../common/common-styles/containers.css'
import '../../common/common-styles/formInput.css'
import { useState } from 'react';
import axios from 'axios'
import { BASE_URL, TOKEN } from '../../../helpers/strings';
import { authenticationSuccessResponseSchema } from '../../../helpers/zodSchemas';
import { handleHTTPError } from '../../../helpers/errorHandler';
import { useAuthRedirect } from '../../../hooks/influencer-hooks/useAuthRedirect';
export function InfluencerSignup() {
    const { isAuthChecked } = useAuthRedirect('../chats');
    const [isLoading, setIsLoading] = useState(false);
    const [inputValueState, setInputValues] = useState({
        fullname: '',
        email: '',
        password: '',
        bio: '',
        defaultMessage: ''
    });
    const navigate = useNavigate();
    if (!isAuthChecked) {
        return (
            <>
            </>
        ) 
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues({ ...inputValueState, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Appbar />
            <div className='parent-container'>
                <h2 style={{ textAlign: 'center' }}>Manage All your DMs at One Place</h2>
                <form onSubmit={handleSubmit}>
                    {textInputData.map((textInput) => (<TextInput {...textInput} onChange={onChange} />))}
                    {textAreaData.map((textArea) => (<TextArea {...textArea} onChange={onChange} />))}
                    <Button variant='contained' type='submit'>
                        {!isLoading? 'Signup': <CircularProgress size={18}/>}
                    </Button>
                </form>
                <Typography textAlign={'center'}>Already have an account? <u><b
                    onClick={() => {
                        navigate('../login')
                    }}
                    style={{
                        cursor: 'pointer'
                    }}
                >Login</b></u></Typography>
            </div>
        </>
    )
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/influencer/signup`, { ...inputValueState });
            const parsedResponse = authenticationSuccessResponseSchema.safeParse(response.data);
            if (!parsedResponse.success){
                localStorage.removeItem(TOKEN);
                 return alert('An unknown error occured while signing up');
                }
            localStorage.setItem(TOKEN, parsedResponse.data.token);
            navigate(`../chats`);
        }
        catch (e) {
            localStorage.removeItem(TOKEN);
            handleHTTPError(e);
        }
        setIsLoading(false);
    }
}


const textInputData: TextInputProps[] = [
    {
        id: 1,
        name: 'fullName',
        type: 'text',
        placeholder: 'Full Name',
        errorMessage: 'FUll Name must contain alphabets and length between 2-30 characters',
        required: true,
        minLength: 2,
        maxLength: 30,
        pattern: ".{2,30}"
    },
    {
        id: 2,
        name: 'email',
        type: 'email',
        placeholder: 'youremail@example.com',
        errorMessage: 'Invalid Email',
        required: true,
        minLength: 5,
        maxLength: 40,
        pattern: "[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
    },
    {
        id: 3,
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        errorMessage: 'Password must be between 6-30 characters',
        required: true,
        minLength: 6,
        maxLength: 30,
        pattern: ".{2,30}"

    }
]

const textAreaData: TextAreaProps[] = [
    {
        id: 1,
        name: 'bio',
        placeholder: 'A Short Bio (30 characters)',
        errorMessage: 'Bio must be between 5-40 characters',
        required: true,
        rows: 1,
        minLength: 5,
        maxLength: 40
    },
    {
        id: 2,
        name: 'defaultMessage',
        placeholder: 'Type a Default Message to be shown to people sending you dms',
        errorMessage: 'Default messagemust be between 50-200 characters',
        required: true,
        rows: 3,
        minLength: 50,
        maxLength: 200
    },
]