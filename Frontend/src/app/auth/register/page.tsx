"use client"
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/app/auth/register/register.module.scss';
import useApi from '@/configuration/useApi';
import { useRouter } from 'next/navigation';

type FormData = {
    nombre: string;
    correo: string;
    identificacion: number;
    pswrd: string;
    confirmPassword: string;
};

const RegisterPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { post } = useApi<FormData>(process.env.NEXT_PUBLIC_BACKEND_NODE_API || '');
    const router = useRouter();

    const onSubmit = handleSubmit(async data => {
        const { confirmPassword, ...formData } = data;
        if (data.pswrd === data.confirmPassword) {
            try {
                const response: any = await post(process.env.NEXT_PUBLIC_BACKEND_REGISTER || '', formData);
                console.log(response)
                if (response.status == 201) {
                    alert(`Registro exitoso: ${response.message}`);
                    router.push('/auth/login');
                } else {
                    throw new Error(response.error || 'Error desconocido');
                }
            } catch (err: any) {
                alert(`Error en el registro: El usuario ya existe`);
            }
        } else {
            alert("Las contraseñas no coinciden");
        }
    });

    return (
        <div className={styles['container-page']}>
            <div className={styles.container}>
                <h1>Regístrate</h1>
                <div className={styles['form-control']}>
                    <form onSubmit={onSubmit}>
                        <div className={styles['input-container']}>
                            <input
                                className={styles['input-group']}
                                type='text'
                                placeholder=" "
                                {...(register("nombre", { required: { value: true, message: "El nombre es requerido" } }))}
                            />
                            {errors.nombre && (
                                <span>{errors.nombre?.message as string}</span>
                            )}
                            <label htmlFor='name' className={styles['label']}>Nombre: </label>
                        </div>
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
                                type='number'
                                placeholder=" "
                                {...(register("identificacion", { required: { value: true, message: "El id es requerido" } }))}
                            />
                            {errors.identificacion && (
                                <span>{errors.identificacion.message as string}</span>
                            )}
                            <label htmlFor='identificacion' className={styles['label']}>Identificación: </label>
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
                            <label htmlFor='password' className={styles['label']}>Contraseña: </label>
                        </div>
                        <div className={styles['input-container']}>
                            <input
                                className={styles['input-group']}
                                type='password'
                                placeholder=" "
                                {...(register("confirmPassword", { required: { value: true, message: "Confirma la contraseña" } }))}
                            />
                            {errors.confirmPassword && (
                                <span>{errors.confirmPassword.message as string}</span>
                            )}
                            <label htmlFor='confirmPassword' className={styles['label']}>Confirmar Contraseña: </label>
                        </div>
                        <button type='submit' className={styles['btn-register']}>Registro</button>
                    </form>
                    <div>
                        <p>¿Ya tienes cuenta?
                            <br />
                            <a href='/auth/login'>Inicia Sesión</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
