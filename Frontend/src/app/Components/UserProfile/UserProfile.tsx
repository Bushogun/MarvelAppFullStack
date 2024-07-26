'use client'
import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearToken, setIsLogged, setUserID, setUserName } from '@/redux/features/comic-slice';
import styles from '@/app/Components/UserProfile/userProfile.module.scss'

function UserProfile() {
    const dispatch = useAppDispatch();
    const [menuVisible, setMenuVisible] = useState(false);
    const userID = useAppSelector(state => state.comic.userID);
    const userName = useAppSelector(state => state.comic.userName);


    const handleToggleMenu = () => {
        setMenuVisible(!menuVisible)
    }

    const handleLogout = () => {
        dispatch(clearToken());
        dispatch(setIsLogged(false));
        dispatch(setUserID(0));
        dispatch(setUserName(''));
        setMenuVisible(false);
    }

    return (
        <div className={styles['contenedor-usuario']}>
            <div className={styles['contenedor-logo']} onClick={handleToggleMenu}>
                <FaUserCircle />
                <div className={styles['nombre-usuario']} onClick={handleToggleMenu}>
                    {/* Jonathan Soto */}
                    {userName || ''}
                </div>
            </div>
            {menuVisible && (
                <div className={styles['menu']}>
                    <div className={styles['menu-item']} onClick={handleLogout}> <MdOutlineLogin /> &nbsp; Cerrar Sesión</div>
                </div>
            )}
        </div>
    )
}

export default UserProfile