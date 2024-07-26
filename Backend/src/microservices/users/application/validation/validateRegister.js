import Joi from 'joi';

const schema = Joi.object({
    nombre: Joi.string().max(100).required(),
    correo: Joi.string().email().max(100).required(),
    identificacion: Joi.string().max(50).required(),
    pswrd: Joi.string().min(3).required()
});

const validateRegister = (data) => {
    return schema.validate(data);
};

export default validateRegister;
