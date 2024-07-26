"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from '@/app/auth/login/login.module.scss'
import useApi from '@/configuration/useApi';
import { useRouter } from 'next/navigation';
import { setIsLogged, setToken, setUserID } from '@/redux/features/comic-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type responseLogin = {
    message: string,
    token: string
}

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { post } = useApi<FormData>(process.env.NEXT_PUBLIC_BACKEND_NODE_API || '');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit = handleSubmit(async data => {
        try {
            const response: any = await post(process.env.NEXT_PUBLIC_BACKEND_LOGIN || '', data);
            console.log(response)
            if (response.status == 200) {
                dispatch(setIsLogged(true));
                router.push('/dashboard');
                dispatch(setToken(response.data.token));
                dispatch(setUserID(response.data.usuario.id));

            } else {
                throw new Error(response.error || 'Error desconocido');
            }
        } catch (err: any) {
            alert(`Inténtalo de nuevo: credenciales inválidas`);
        }
    });

    return (
        <div className={styles['container-page']}>
            <div className={styles.container}>
                <h1>Iniciar Sesión</h1>
                <div className={styles['form-control']}>
                    <form action="" onSubmit={onSubmit}>
                        <div className={styles['input-container']}>
                            <input
                                className={styles['input-group']}
                                type='email'
                                placeholder=" "
                                {...(register("correo", { required: { value: true, message: "El correo es requerido" } }))}
                            />
                            {errors.correo && (
                                <span>{errors.correo.message as string}</span>
                            )}
                            <label htmlFor='correo' className={styles['label']}>Correo Electrónico: </label>
                        </div>
                        <div className={styles['input-container']}>
                            <input
                                className={styles['input-group']}
                                type='password'
                                placeholder=" "
                                {...(register("pswrd", { required: { value: true, message: "La contraseña es requerida" } }))}
                            />
                            {errors.pswrd && (
                                <span>{errors.pswrd.message as string}</span>
                            )}
                            <label htmlFor='pswrd' className={styles['label']}>Contraseña: </label>
                        </div>
                        <button className={styles['btn-register']}>Inicia Sesión</button>
                        <div>
                            <p>¿No tienes cuenta?
                                <br />
                                <a href='/auth/register'>Crea una cuenta</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage