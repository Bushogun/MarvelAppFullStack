import bcrypt from 'bcrypt';
import SQLUsuarioRepository from '../../infraestructure/repositories/sqlUsuarioRepository.js';
import jwt from 'jsonwebtoken';

class LoginUser {
    constructor() {
        this.usuarioRepository = new SQLUsuarioRepository();
    }

    async execute({ correo, pswrd }) {
        const usuario = await this.usuarioRepository.findByEmail(correo);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = await bcrypt.compare(pswrd, usuario.pswrd);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }
        const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { message: 'Inicio de sesión exitoso', token, usuario };
    }
}

export default LoginUser;