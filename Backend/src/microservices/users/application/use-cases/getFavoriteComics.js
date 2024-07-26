import SQLUsuarioComicFavoritoRepository from '../../infraestructure/repositories/sqlUsuarioComicFavoritoRepository.js';
import SQLComicRepository from '../../infraestructure/repositories/sqlComicRepository.js';

class GetFavoriteComics {
    constructor() {
        this.usuarioComicFavoritoRepository = new SQLUsuarioComicFavoritoRepository();
        this.comicRepository = new SQLComicRepository();
    }

    async execute(usuario_id) {
        const favoriteComicsIds = await this.usuarioComicFavoritoRepository.findComicsByUserId(usuario_id);

        const favoriteComics = await Promise.all(favoriteComicsIds.map(async (comicId) => {
            return await this.comicRepository.findById(comicId);
        }));

        return favoriteComics;
    }
}

export default GetFavoriteComics;
