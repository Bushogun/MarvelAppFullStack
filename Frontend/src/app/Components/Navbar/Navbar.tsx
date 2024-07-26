'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/components/navbar/navbar.module.scss';
import UserProfile from '@/app/Components/UserProfile/UserProfile';
/// <reference types="react" />
/// <reference types="react-dom" />

export const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <Image
                    src="/crab-image.png"
                    alt="Crab Space Invaders"
                    title="Logo FakeCompany"
                    width="60"
                    height="45"
                    priority={true}
                />
            </Link>
            <ul>
                <li>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <UserProfile />
                </li>
            </ul>
        </nav >
    );
};
