import { Typography, Button, CircularProgress } from '@mui/material';
import { Appbar } from '../common/Appbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TextInputProps, TextInput } from '../common/FormInput';
import axios from 'axios';
import { BASE_URL, FOLLOWER_TOKEN, IS_FOLLOWER_SIGNED_UP_ONCE } from '../../helpers/strings';
import { authenticationSuccessResponseSchema } from '../../helpers/zodSchemas';
import { handleHTTPError } from '../../helpers/errorHandler';
export function FollowerLogin() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const influencerSlug = searchParams.get('influencer-slug');
    const [inputValueState, setInputValues] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues({ ...inputValueState, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Appbar />
            <div className='parent-container'>
                <h2 style={{ textAlign: 'center' }}>Welcome Back!</h2>
                <form onSubmit={handleFollowerLoginSubmit}>
                    {textInputData.map((textInput) => (<TextInput {...textInput} onChange={onChange} />))}
                    <Button variant='contained' type='submit'>
                        {!isLoading? 'Login': <CircularProgress size={18}/>}
                    </Button>
                </form>
                <Typography textAlign={'center'}>Don't have an account? <u><b
                    onClick={() => {
                        navigate(`../signup?influencer-slug=${influencerSlug}`)
                    }}
                    style={{
                        cursor: 'pointer'
                    }}
                >Signup</b></u></Typography>
            </div>
        </>
    )
    async function handleFollowerLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/follower/login`, { ...inputValueState });
            const parsedResponse = authenticationSuccessResponseSchema.safeParse(response.data);
            if (!parsedResponse.success){
                localStorage.removeItem(FOLLOWER_TOKEN);
                return alert('An unknown error occured while loggin in');
            }
            localStorage.setItem(FOLLOWER_TOKEN, parsedResponse.data.token);
            localStorage.setItem(IS_FOLLOWER_SIGNED_UP_ONCE, 'true');
            navigate(`../../${influencerSlug}`);
        }
        catch (e) {
            localStorage.removeItem(FOLLOWER_TOKEN);
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