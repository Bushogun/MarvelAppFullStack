'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setError } from '@/redux/features/comic-slice';
import styles from './comic-details.module.scss';
import useApi from '@/configuration/useApi';
import { IComicCard } from '@/app/Components/Comics-list/interfaces/iComicCard';

const ComicDetails = () => {
    const [comicDetails, setComicDetails] = useState<IComicCard | null>(null);
    const { get } = useApi<IComicCard>(process.env.NEXT_PUBLIC_BACKEND_NODE_API || '');
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.comic.token);
    const pathname = usePathname();

    const extractComicIdFromPathname = (pathname: string) => {
        const parts = pathname.split('/');
        return parts[parts.length - 1];
    };

    const id = extractComicIdFromPathname(pathname);

    const fetchComicDetails = async (comicId: string) => {
        try {
            const response = await get(`${process.env.NEXT_PUBLIC_BACKEND_DASHBOARD}/${comicId}`, { Authorization: `Bearer ${token}` });
            setComicDetails(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(setError('Ha ocurrido un error en el servidor'));
        }
    };

    useEffect(() => {
        if (id) {
            fetchComicDetails(id);
        }
    }, [id]);

    return (
        <div className={styles['details']}>
            {comicDetails && (
                <div className={styles['container-details']}>
                    <div className={styles['container-img']}>
                        <img
                            className={styles['card-img']}
                            src={`${comicDetails.data.results[0].thumbnail.path}.${comicDetails.data.results[0].thumbnail.extension}`}
                            alt={comicDetails.data.results[0].title}
                            title={comicDetails.data.results[0].title}
                        />
                    </div>

                    <div className={styles['container-data']}>
                        <h2 className={styles['title']}>{comicDetails.data.results[0].title}</h2>
                        <p className={styles['description']}>{comicDetails.data.results[0].description || 'No description available'}</p>
                        <div className={styles['category-container']}>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComicDetails;
