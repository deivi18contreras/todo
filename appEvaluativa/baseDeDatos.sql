tabla usuarios 
-----------------------+------+-----+-------------------+-------------------+
| Field            | Type                      | Null | Key | Default           | Extra             |
+------------------+---------------------------+------+-----+-------------------+-------------------+
| id               | int                       | NO   | PRI | NULL              | auto_increment    |
| nombre           | varchar(100)              | NO   |     | NULL              |                   |
| email            | varchar(100)              | NO   | UNI | NULL              |                   |
| fecha_nacimiento | date                      | YES  |     | NULL              |                   |
| estado           | enum('activo','inactivo') | YES  |     | inactivo          |                   |
| fecha_registro   | timestamp                 | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------------+---------------------------+------+-----+---------------------------------------+

tabla pagos 

+-------------------+--------------------------------------------+------+-----+---------+----------------+
| Field             | Type                                       | Null | Key | Default | Extra          |
+-------------------+--------------------------------------------+------+-----+---------+----------------+
| id                | int                                        | NO   | PRI | NULL    | auto_increment |
| usuario_id        | int                                        | NO   | MUL | NULL    |                |
| monto             | decimal(10,2)                              | NO   |     | NULL    |                |
| fecha_pago        | date                                       | NO   |     | NULL    |                |
| fecha_vencimiento | date                                       | NO   |     | NULL    |                |
| metodo            | enum('tarjeta','efectivo','transferencia') | NO   |     | NULL    |                |
+-------------------+--------------------------------------------+------+-----+---------+----------------+

tabla lecturas

-----------------+-------------------+
| Field         | Type                       | Null | Key | Default           | Extra             |
+---------------+----------------------------+------+-----+-------------------+-------------------+
| id            | int                        | NO   | PRI | NULL              | auto_increment    |
| usuario_id    | int                        | NO   | MUL | NULL              |                   |
| tipo          | enum('principal','diaria') | NO   |     | NULL              |                   |
| contenido     | text                       | YES  |     | NULL              |                   |
| fecha_lectura | timestamp                  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+----------------------------+------+-----+-------------------+-------------------+