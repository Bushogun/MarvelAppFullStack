import { sql, poolPromise } from '../models/db.js';
import Comic from '../../domain/entities/comic.js';

class SQLComicRepository {
    async create({ id, titulo }) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('titulo', sql.NVarChar, titulo)
            .query('INSERT INTO comic (id, titulo) VALUES (@id, @titulo)');
        return result.recordset;
    }

    async findById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM comic WHERE id = @id');
        if (result.recordset.length === 0) return null;
        const comic = result.recordset[0];
        return new Comic(comic.id, comic.titulo);
    }
}

export default SQLComicRepository;
