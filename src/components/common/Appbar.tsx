import { Container } from "@mui/material";
import logo from '../../assets/logo.png'
export function Appbar() {
    return (
        <>
            <Container style={
                {
                    paddingBlock:'22px',
                    paddingInline:'22px'
                }
            }>
                    <img src={logo} alt="logo" style={{
                        maxWidth:'90px'
                    }} />
            </Container>
        </>
    )
}