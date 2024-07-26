'use client'
import React, { useEffect, useState } from 'react'
import Card from '@/app/Components/Comics-list/Comic-card/comic-card'
import { IComicCard, Result } from './interfaces/iComicCard';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import ErrorComponent from '../error-component/error-component';
import styles from './comic-list.module.scss';
import useApi from '@/configuration/useApi';

function ComicsList() {
    const { get } = useApi<IComicCard>(process.env.NEXT_PUBLIC_BACKEND_NODE_API || '');
    const { post } = useApi<FormData>(process.env.NEXT_PUBLIC_BACKEND_NODE_API || '');
    const token = useAppSelector(state => state.comic.token);
    const userID = useAppSelector(state => state.comic.userID);
    const [comics, setComics] = useState<Result[]>();
    const [savedComicIds, setSavedComicIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await get(`${process.env.NEXT_PUBLIC_BACKEND_DASHBOARD}`, { Authorization: `Bearer ${token}` });
                if (response && response.data.data && response.data.data.results) {
                    setComics(response.data.data.results);
                    const favoriteResponse = await get(`${process.env.NEXT_PUBLIC_BACKEND_FAVORITE_COMICS}/${userID}`);
                    if (favoriteResponse && favoriteResponse.data) {
                        setSavedComicIds(favoriteResponse.data.map((comic: any) => comic.id));
                    } else {
                        console.error('No results found in API response for favorite comics');
                    }
                } else {
                    console.error('No results found in API response');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchComics();
    }, []);

    const handleHeartClick = async (comicId: number, comicTitle: string) => {
        setSavedComicIds(prevIds => {
            if (prevIds.includes(comicId)) {
                return prevIds.filter(id => id !== comicId);
            } else {
                return [...prevIds, comicId];
            }
        });

        try {
            const isSaved = savedComicIds.includes(comicId);
            await post(process.env.NEXT_PUBLIC_BACKEND_FAVORITE || '', {
                usuario_id: String(userID),
                comic_id: comicId,
                comic_titulo: comicTitle,
            });
        } catch (error) {
            console.error('Error updating favorites:', error);
            setSavedComicIds(prevIds => {
                if (prevIds.includes(comicId)) {
                    return prevIds.filter(id => id !== comicId);
                } else {
                    return [...prevIds, comicId];
                }
            });
        }
    };
    return (
        <>
            <div className={styles['card-list-title']}>Marvel Comics List</div>
            <div className={styles['cards-container']}>
                {comics ? (
                    comics.map((comic) => (
                        <Card
                            key={comic.id}
                            comic={comic}
                            onHeartClick={() => handleHeartClick(comic.id, comic.title)}
                            isSaved={savedComicIds.includes(comic.id)}
                        />
                    ))
                ) : (
                    <LoadingSpinner />

                )}
            </div>
        </>
    )
}

export default ComicsList