'use client'
import React, { useEffect } from 'react'
import styles from "@/app/page.module.scss";
import { useAppSelector } from '@/redux/hooks';
import LoadingSpinner from '@/app/Components/loading-spinner/loading-spinner';
import ErrorComponent from '../Components/error-component/error-component';
import ComicsList from '../Components/Comics-list/comics-list';
import { useRouter } from 'next/navigation';

function marvelApp() {
    const loading = useAppSelector(state => state.comic.loading);
    const error = useAppSelector(state => state.comic.error);
    const router = useRouter();
    if (loading) { return <LoadingSpinner />; }
    if (error) { return <ErrorComponent error={error} />; }

    const isLogged = useAppSelector(state => state.comic.isLogged);
    const token = useAppSelector(state => state.comic.token);


    useEffect(() => {
        if (!isLogged) {
            router.push('/auth/login')
        }
    }, [isLogged, token]);

    return (
        <div className={styles['container-page']}>
            <div className={styles['container-body']}>
                {/* <div className={styles['filters-container']}>
                    <Categories />
                </div> */}
                <div className={styles['cards-container']}>
                    <ComicsList />
                </div>
            </div>
        </ div >
    )
}

export default marvelApp