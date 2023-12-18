import { Typography, Button, CircularProgress } from '@mui/material';
import { Appbar } from '../../common/Appbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TextInputProps, TextInput } from '../../common/FormInput';
import { useAuthRedirect } from '../../../hooks/influencer-hooks/useAuthRedirect';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../../helpers/strings';
import { authenticationSuccessResponseSchema } from '../../../helpers/zodSchemas';
import { handleHTTPError } from '../../../helpers/errorHandler';
export function InfluencerLogin() {
    const {isAuthChecked} = useAuthRedirect();
    const [inputValueState, setInputValues] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
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
                <h2 style={{ textAlign: 'center' }}>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    {textInputData.map((textInput) => (<TextInput {...textInput} onChange={onChange} />))}
                    <Button variant='contained' type='submit'>
                        {!isLoading? 'Login': <CircularProgress size={18}/>}
                    </Button>
                </form>
                <Typography textAlign={'center'}>Don't have an account? <u><b
                    onClick={() => {
                        navigate('../signup')
                    }}
                    style={{
                        cursor: 'pointer'
                    }}
                >Signup</b></u></Typography>
            </div>
        </>
    )
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/influencer/login`, { ...inputValueState });
            const parsedResponse = authenticationSuccessResponseSchema.safeParse(response.data);
            if (!parsedResponse.success) return alert('An unknown error occured while loggin in');
            localStorage.setItem(TOKEN, parsedResponse.data.token);
            navigate(`../chats`);
        }
        catch (e) {
            handleHTTPError(e);
        }
        setIsLoading(false);
    }
}



const textInputData: TextInputProps[] = [
    {
        id: 1,
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
        id: 2,
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        errorMessage: "Pasword is incorrect. Can't exceed30 characters",
        required: true,
        minLength: 0,
        maxLength: 30,
        pattern: ".{0,30}"

    }
]