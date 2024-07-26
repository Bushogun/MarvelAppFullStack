INSERT INTO usuario
    (nombre, correo, identificacion, pswrd)
VALUES
    ('Juan Perez', 'juan.perez@gmail.com', 'ID123456', 'hash_password_1234'),
    ('Ana Lopez', 'ana.lopez@gmail.com', 'ID654321', 'hash_password_5678'),
    ('Luis Gomez', 'luis.gomez@gmail.com', 'ID987654', 'hash_password_91011'),
    ('Maria Martinez', 'maria.martinez@gmail.com', 'ID456789', 'hash_password_1213'),
    ('Carlos Rodriguez', 'carlos.rodriguez@gmail.com', 'ID789456', 'hash_password_1415');

INSERT INTO comic
    (id, titulo)
VALUES
    (1, 'Spider-Man: Homecoming'),
    (2, 'Avengers: Endgame'),
    (3, 'Batman: The Dark Knight Returns'),
    (4, 'Superman: Red Son'),
    (5, 'Wonder Woman: Warbringer');

INSERT INTO usuario_comic_favorito
    (usuario_id, comic_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 1),
    (5, 3);
