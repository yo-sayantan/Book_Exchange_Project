import React, { useState } from 'react';
import { Button, CircularProgress, Container, CssBaseline, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { COMMON_URL } from '../constants/URL';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/ActionCreator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        backgroundSize: 'cover',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        padding: useTheme().spacing(2),
        //background: '#FFFF',
        borderRadius: '8px',
        textAlign: 'center',
    },
    title: {
        marginBottom: useTheme().spacing(2),
    },
    input: {
        marginBottom: useTheme().spacing(2),
    },
    submitButton: {
        backgroundColor: '#FF8E53',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#FE6B8B',
        },
        marginBottom: useTheme().spacing(2),
    },
    blurBackground: {
        backdropFilter: 'blur(5px)', // Adjust the blur strength as needed
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the background color and opacity as needed
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: useTheme().zIndex.modal + 1, // Ensure this value is higher than other elements
    },
    or: {
        marginBottom: useTheme().spacing(2),
    },
    googleButton: {
        margin: 'auto',
        marginTop: useTheme().spacing(2), // Adjust spacing as needed
        backgroundColor: '#ffffff', // Change background color if needed
        border: '1px solid #cccccc', // Add border if needed
        '&:hover': {
            backgroundColor: '#eeeeee', // Change hover background color if needed
        },
    },
    googleIcon: {
        marginRight: useTheme().spacing(1), // Adjust spacing between icon and text
    },
}));

const SignUp = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    //const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [cookies, setCookie] = useCookies(['access_token']);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const actions = bindActionCreators(actionCreators, dispatch);

    const handleSignUp = async (e) => {
        if (email === '' || username === '' || password === '' || password2 === '') {
            toast.error('Username and password are required', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: '#fff' },
            });
            return;
        }
        if (password !== password2) {
            toast.error('Passwords does not match', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: '#fff' },
            });
            return;
        }
        if (!isValidEmail(email)) {
            toast.error('Invalid Email id', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: '#fff' },
            });
            return;
        }
        e.preventDefault();
        setIsLoading(true);
        try {
            const credentials = { email: email, username: username, password: password };
            const response = await axios.post(COMMON_URL + 'auth/signup', credentials);
            if (response.status === 200) {

                navigate('/login');
            }
            else {
                toast.error('Incorrect Username or password.', {
                    position: toast.POSITION.TOP_RIGHT,
                    style: { backgroundColor: 'red', color: '#fff' },
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Incorrect Username or password.', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: '#fff' },
            });
            setIsLoading(false);
        }
    };

    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    }

    const handleGoogleSignIn = () => {

    };

    return (
        <div className={classes.root}>
            {isLoading && <div className={classes.blurBackground}><CircularProgress /></div>}
            <Container component="main" maxWidth="xs" color='primary'>
                <CssBaseline />
                <div className={classes.form}>
                    <Typography variant="h5" className={classes.title}>
                        SignUp
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.input}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={classes.input}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.input}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Re-Password"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        className={classes.input}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        className={classes.submitButton}
                        onClick={handleSignUp}
                    >
                        SignUp
                    </Button>
                    <Typography>
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </div>
            </Container>
        </div>
    );
};

export default SignUp;
