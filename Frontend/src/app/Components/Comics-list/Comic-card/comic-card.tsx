"use client"
import React from 'react';
import { Result } from '../interfaces/iComicCard';
import { useRouter } from 'next/navigation';
import { FaBookOpen } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import styles from './comic-card.module.scss';

interface CardProps {
    comic: Result;
    onHeartClick: (comicId: number) => void;
    isSaved: boolean;
}

function Card({ comic, onHeartClick, isSaved }: CardProps) {
    const router = useRouter();

    const selectedComicHandler = () => {
        // router.push(`/dashboard/${comicId}`);
    };

    const handleHeartClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onHeartClick(comic.id);
    };

    return (
        <div className={styles['card-container']} onClick={selectedComicHandler}>
            <figure className={styles['card-figure']}>
                <span className={styles['card-bottom-text']} title='Número de páginas'>
                    <FaBookOpen />
                    &nbsp;
                    {comic.pageCount}
                    <button
                        title='Marcar como favorito'
                        className={`${styles['heart-button']} ${isSaved ? styles['heart-button-saved'] : ''}`}
                        onClick={handleHeartClick}
                    >
                        <FaHeart />
                    </button>
                </span>
                <img
                    className={styles['card-img']}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    title={comic.title}
                />
            </figure>
            <p className={styles['card-container-info']}>
                <span className={styles['card-info-title']}>{comic.title}</span>
            </p>

        </div>
    );
}

export default Card;
