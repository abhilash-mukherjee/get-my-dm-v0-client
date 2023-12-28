import { Container } from "@mui/material";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
export function Appbar() {
    const navigate = useNavigate();
    return (
        <>
            <Container style={
                {
                    paddingBlock:'22px',
                    paddingInline:'22px'
                }
            }>
                    <img src={logo} alt="logo" style={{
                        maxWidth:'90px',
                        cursor:'pointer'
                    }} 
                    onClick={()=>{
                        navigate('../../../../');
                    }}
                    />
            </Container>
        </>
    )
}