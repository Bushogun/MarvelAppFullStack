import SQLUsuarioComicFavoritoRepository from '../../infraestructure/repositories/sqlUsuarioComicFavoritoRepository.js';
import SQLComicRepository from '../../infraestructure/repositories/sqlComicRepository.js';
import SQLUsuarioRepository from '../../infraestructure/repositories/sqlUsuarioRepository.js';

class AddFavoriteComic {
    constructor() {
        this.usuarioComicFavoritoRepository = new SQLUsuarioComicFavoritoRepository();
        this.comicRepository = new SQLComicRepository();
        this.usuarioRepository = new SQLUsuarioRepository();
    }

    async execute({ usuario_id, comic_id, comic_titulo }) {
        let user = await this.usuarioRepository.findById(usuario_id);
        let comic = await this.comicRepository.findById(comic_id);

        if (!user) {
            throw new Error('El usuario no existe');
        }

        if (!comic) {
            await this.comicRepository.create({ id: comic_id, titulo: comic_titulo });
        }

        const existingFavorite = await this.usuarioComicFavoritoRepository.findByUserIdAndComicId(usuario_id, comic_id);
        if (existingFavorite) {
            await this.usuarioComicFavoritoRepository.deleteByUserIdAndComicId(usuario_id, comic_id);
            return { message: 'El cómic se ha eliminado de los favoritos del usuario' };
        }
        await this.usuarioComicFavoritoRepository.create({ usuario_id, comic_id });
        return { message: 'El cómic se ha añadido a los favoritos del usuario' };
    }
}

export default AddFavoriteComic;
