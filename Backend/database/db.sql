CREATE TABLE usuario
(
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    identificacion NVARCHAR(50) UNIQUE NOT NULL,
    pswrd NVARCHAR(255) NOT NULL
);

CREATE TABLE comic
(
    id INT PRIMARY KEY,
    titulo NVARCHAR(255) NOT NULL,
);

CREATE TABLE usuario_comic_favorito
(
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    comic_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (comic_id) REFERENCES comic(id),
    UNIQUE (usuario_id, comic_id)
);
