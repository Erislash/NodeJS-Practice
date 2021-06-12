CREATE TABLE users (
    id INT(11) NOT NULL UNIQUE AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT PK_users PRIMARY KEY (id)
)ENGINE=InnoDB;


INSERT INTO users
VALUES (NULL, "PingoMan", "Mi contraseña");

INSERT INTO users
VALUES (NULL, "ping", "pass");
