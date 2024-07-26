import express from 'express';
import AddFavoriteComic from '../../application/use-cases/addFavoriteComic.js';
import GetFavoriteComics from '../../application/use-cases/getFavoriteComics.js';

const router = express.Router();

router.post('/add-favorite', async (req, res) => {
    const { usuario_id, comic_id, comic_titulo } = req.body;
    const addFavoriteComic = new AddFavoriteComic();
    try {
        const result = await addFavoriteComic.execute({ usuario_id, comic_id, comic_titulo });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send('Error al agregar a favoritos: ' + error.message);
    }
});

router.get('/favorites/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const getFavoriteComics = new GetFavoriteComics();
    try {
        const result = await getFavoriteComics.execute(usuario_id);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send('Error al obtener los cómics favoritos: ' + error.message);
    }
});

export default router;
