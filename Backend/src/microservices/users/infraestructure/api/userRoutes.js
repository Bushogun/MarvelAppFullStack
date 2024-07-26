import { Router } from 'express';
import RegisterUser from '../../application/use-cases/registerUser.js';
import LoginUser from '../../application/use-cases/loginUser.js';
import validateRegister from '../../application/validation/validateRegister.js';
import authenticateJWT from '../../../../middleware/authMiddleware.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const registerUser = new RegisterUser();
    try {
        const user = await registerUser.execute(req.body);
        return res.status(201).json({ message: 'Registro exitoso', status: res.status, usuarioCreado: user });
    } catch (err) {
        return res.status(400).json({ error: 'Datos inválidos', status: res.status });
    }
});

router.post('/login', async (req, res) => {
    const { correo, pswrd } = req.body;
    const loginUser = new LoginUser();
    try {
        const result = await loginUser.execute({ correo, pswrd });
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Usuario no encontrado' || error.message === 'Contraseña incorrecta') {
            res.status(401).json({ error: 'Error de inicio de sesión: ' + error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor: ' + error.message });
        }
    }
});

export default router;
