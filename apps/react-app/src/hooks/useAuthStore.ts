import { useDispatch } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';
import { InventoryBackend } from '../api/Index';
import type { SignInFormDataInterface } from '../Interfaces/singin.interface';
import { useAppSelector } from './useAppDispatch';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useAppSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }:SignInFormDataInterface) => {
        dispatch( onChecking() );
        try {
            const { data } = await InventoryBackend.post('/auth/login',{ email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem("token-init-date", new Date().getTime().toString());
            dispatch( onLogin({ username: data.user.username, email: data.user.email }) );
            
        } catch (error) {
            dispatch( onLogout('Invalid Credentials') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const OAuth2Login = async() => {
        dispatch( onChecking() );
        try {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            console.log(`Code ${code}`)
            const { data } = await InventoryBackend.get('/auth/google');
            localStorage.setItem('token', data.token );
            localStorage.setItem("token-init-date", new Date().getTime().toString());
            dispatch( onLogin({ username: data.user.username, email: data.user.email }) );
            
        } catch (error) {
            dispatch( onLogout('Invalid Credentials') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const oauthLogin = async({ email }:SignInFormDataInterface) => {
        dispatch( onChecking() );
        try {
            const { data } = await InventoryBackend.post('/auth/oauth',{ email });
            localStorage.setItem('token', data.token );
            localStorage.setItem("token-init-date", new Date().getTime().toString());
            dispatch( onLogin({ username: data.user.username, email: data.user.email }) );
            
        } catch (error) {
            dispatch( onLogout('Invalid Credentials') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await InventoryBackend.get('auth/renew',{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(data)
            localStorage.setItem('token', data.token );
            localStorage.setItem("token-init-date", new Date().getTime().toString());

            dispatch( onLogin({ username: "shalaka" }) );

        } catch (error) {
            console.log(error)
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const getAuthUrl = () => {
  window.location.href = 'http://localhost:3000/api/auth/google'; // Or whatever your backend route is
};

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        getAuthUrl,
        oauthLogin,
        OAuth2Login
    }

}