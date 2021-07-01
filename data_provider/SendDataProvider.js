/* eslint-disable prettier/prettier */
import React, { useState, createContext } from 'react';

export const SendDataContext = createContext();

export const SendDataProvider = ({ children }) => {
    const [data, setData] = useState([
        // {
        //     id: 1,
        //     username: 'djsn98',
        //     name: 'Dennis Jason',
        //     photo: 'https://api-skripsi-digital-signature.herokuapp.com/photo_profiles/djsn98.jpg',
        //     docs: [
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //         {
        //             name: 'Ijazah.pdf',
        //             uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-djsn98.pdf'
        //         },
        //     ]
        // },
        // {
        //     id: 2,
        //     username: 'sheila97',
        //     name: 'Sheila Mawarni',
        //     photo: 'https://api-skripsi-digital-signature.herokuapp.com/photo_profiles/sheila97.jpeg',
        // docs: [
        //     {
        //         id: 1,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        //     {
        //         id: 2,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        //     {
        //         id: 3,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        //     {
        //         id: 4,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        //     {
        //         id: 5,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        //     {
        //         id: 6,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        //     {
        //         id: 7,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        //     {
        //         id: 8,
        //         name: 'Ijazah.pdf',
        //         uri: 'https://api-skripsi-digital-signature.herokuapp.com/signed_files/KP-sheila97.pdf'
        //     },
        // ]
        // },
    ])

    return (
        <SendDataContext.Provider value={[data, setData]}>
            {children}
        </SendDataContext.Provider>
    );
};