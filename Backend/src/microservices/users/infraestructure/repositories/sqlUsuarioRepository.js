import UsuarioRepository from '../../domain/repositories/usuarioRepository.js';
import { sql, poolPromise } from '../models/db.js';
import Usuario from '../../domain/entities/usuario.js';

class SQLUsuarioRepository extends UsuarioRepository {
    async create(usuario) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('nombre', sql.NVarChar, usuario.nombre)
            .input('correo', sql.NVarChar, usuario.correo)
            .input('identificacion', sql.NVarChar, usuario.identificacion)
            .input('pswrd', sql.NVarChar, usuario.pswrd)
            .query('INSERT INTO usuario (nombre, correo, identificacion, pswrd) VALUES (@nombre, @correo, @identificacion, @pswrd)');
        return result.recordset;
    }

    async findByEmail(email) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('correo', sql.NVarChar, email)
            .query(`SELECT * FROM usuario WHERE correo = @correo`);
        if (result.recordset.length === 0) return null;
        const user = result.recordset[0];
        return new Usuario(user.id, user.nombre, user.correo, user.identificacion, user.pswrd);
    }

    async findById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('identificacion', sql.NVarChar, id)
            .query(`SELECT * FROM usuario WHERE identificacion = @id`);
        if (result.recordset.length === 0) return null;
        const user = result.recordset[0];
        return new Usuario(user.id, user.nombre, user.correo, user.identificacion, user.pswrd);
    }

    async findById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM usuario WHERE id = @id');
        if (result.recordset.length === 0) return null;
        const user = result.recordset[0];
        return new Usuario(user.id, user.nombre, user.correo, user.identificacion, user.pswrd);
    }
}

export default SQLUsuarioRepository;
