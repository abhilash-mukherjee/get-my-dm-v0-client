import { Button, CircularProgress, Typography } from '@mui/material';
import { Appbar } from '../common/Appbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextInput, TextInputProps} from '../common/FormInput';
import '../common/common-styles/containers.css'
import '../common/common-styles/formInput.css'
import { useState } from 'react';
import axios from 'axios'
import { BASE_URL, FOLLOWER_TOKEN, IS_FOLLOWER_SIGNED_UP_ONCE } from '../../helpers/strings';
import { authenticationSuccessResponseSchema } from '../../helpers/zodSchemas';
import { handleHTTPError } from '../../helpers/errorHandler';
export function FollowerSignup() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const influencerSlug = searchParams.get('influencer-slug');
    const [isLoading, setIsLoading] = useState(false);
    const [inputValueState, setInputValues] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues({ ...inputValueState, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Appbar />
            <div className='parent-container'>
                <h2 style={{ textAlign: 'center' }}>Send DMs to your favourite professionals</h2>
                <form onSubmit={handleFollowerSignupSubmit}>
                    {textInputData.map((textInput) => (<TextInput {...textInput} onChange={onChange} />))}
                    <Button variant='contained' type='submit'>
                        {!isLoading? 'Signup': <CircularProgress size={18}/>}
                    </Button>
                </form>
                <Typography textAlign={'center'}>Already have an account? <u><b
                    onClick={() => {
                        navigate(`../login?influencer-slug=${influencerSlug}`)
                    }}
                    style={{
                        cursor: 'pointer'
                    }}
                >Login</b></u></Typography>
            </div>
        </>
    )
    async function handleFollowerSignupSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/follower/signup`, { ...inputValueState });
            const parsedResponse = authenticationSuccessResponseSchema.safeParse(response.data);
            if (!parsedResponse.success){
                localStorage.removeItem(FOLLOWER_TOKEN);
                 return alert('An unknown error occured while signing up');
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