import { sql, poolPromise } from '../models/db.js';
import UsuarioComicFavorito from '../../domain/entities/usuarioComicFavorito.js';
import UsuarioComicFavoritoRepository from '../../domain/repositories/usuarioComicFavoritoRepository.js';

class SQLUsuarioComicFavoritoRepository extends UsuarioComicFavoritoRepository {
    async create(usuarioComicFavorito) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('usuario_id', sql.Int, usuarioComicFavorito.usuario_id)
            .input('comic_id', sql.Int, usuarioComicFavorito.comic_id)
            .query('INSERT INTO usuario_comic_favorito (usuario_id, comic_id) VALUES (@usuario_id, @comic_id)');
        return result.recordset;
    }

    async findByUserIdAndComicId(usuario_id, comic_id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('usuario_id', sql.Int, usuario_id)
            .input('comic_id', sql.Int, comic_id)
            .query('SELECT * FROM usuario_comic_favorito WHERE usuario_id = @usuario_id AND comic_id = @comic_id');
        if (result.recordset.length === 0) return null;
        const favorito = result.recordset[0];
        return new UsuarioComicFavorito(favorito.id, favorito.usuario_id, favorito.comic_id);
    }

    async deleteByUserIdAndComicId(usuario_id, comic_id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('usuario_id', sql.Int, usuario_id)
            .input('comic_id', sql.Int, comic_id)
            .query('DELETE FROM usuario_comic_favorito WHERE usuario_id = @usuario_id AND comic_id = @comic_id');
        return result.rowsAffected[0] > 0;
    }

    async findComicsByUserId(usuario_id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('usuario_id', sql.Int, usuario_id)
            .query('SELECT comic_id FROM usuario_comic_favorito WHERE usuario_id = @usuario_id');
        return result.recordset.map(row => row.comic_id);
    }
}

export default SQLUsuarioComicFavoritoRepository;
