import express from 'express';
import axios from 'axios';
import authenticateJWT from '../../../../middleware/authMiddleware.js';
import md5 from 'md5';

const router = express.Router();


router.get('/dashboard', authenticateJWT, async (req, res) => {
    const marvelApi = process.env.MARVEL_API_URL;
    const endpointComics = process.env.REQUEST_COMICS;
    const timeStamp = 1;
    const publicKey = process.env.MARVEL_PUBLIC_APIKEY;
    const toHash = `${timeStamp}${process.env.MARVEL_PRIVATE_APIKEY}${publicKey}`;
    const md5HashedKey = md5(toHash);
    const url = `${marvelApi}${endpointComics}?ts=${timeStamp}&apikey=${publicKey}&hash=${md5HashedKey}`;
    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Error al obtener los datos de Marvel: ' + error.message);
    }
});

router.get('/dashboard/:comic_id', authenticateJWT, async (req, res) => {
    const { comic_id } = req.params;
    const router = express.Router();
    const marvelApi = process.env.MARVEL_API_URL;
    const endpointComics = process.env.REQUEST_COMICS;
    const timeStamp = 1;
    const publicKey = process.env.MARVEL_PUBLIC_APIKEY;
    const toHash = `${timeStamp}${process.env.MARVEL_PRIVATE_APIKEY}${publicKey}`;
    const md5HashedKey = md5(toHash);
    const url = `${marvelApi}${endpointComics}/${comic_id}?ts=${timeStamp}&apikey=${publicKey}&hash=${md5HashedKey}`;
    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Error al obtener los datos de Marvel: ' + error.message);
    }
});

export default router;
