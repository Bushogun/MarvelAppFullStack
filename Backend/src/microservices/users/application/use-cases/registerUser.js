import bcrypt from 'bcrypt';
import SQLUsuarioRepository from '../../infraestructure/repositories/sqlUsuarioRepository.js';
import Usuario from '../../domain/entities/usuario.js';

class RegisterUser {
    constructor() {
        this.usuarioRepository = new SQLUsuarioRepository();
    }

    async execute({ nombre, correo, identificacion, pswrd }) {
        const existingUser = await this.usuarioRepository.findByEmail(correo) && this.usuarioRepository.findById(identificacion);
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe por su correo o identificación', status: res.status });
            // throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(pswrd, 10);
        const usuario = new Usuario(null, nombre, correo, identificacion, hashedPassword);
        return this.usuarioRepository.create(usuario);
    }
}

export default RegisterUser;
