# SISGEDOPRA backend

Sistema de Gestión Documental de Procesos Administrativos (SISGEDOPRA), es un software que permite modelar cualquier
proceso administrativo de una Institución. Este software fue desarrollado por 4 estudiantes de la Universidad Santiago de Chile.

  * Felipe Gaete
  * Hugo Saavedra
  * Braulio Castro Estay
  * Sebastián Iturra Valdés

En este repositorio encontrarás el back-end del Software desarrollado bajo las siguientes herramientas:

  * NodeJS + koa
  * Motor base de datos: MariaDB

Podrás encontrar una versión demo de la API en [http://18.213.206.200/health]

Mientras que el front-end del Software lo podrás encontrar en [https://github.com/siturra/SISGEDOPRA]


# Instalación y Mantención del Software back-end

## 1. Versiones Utilizadas

* NodeJS 9.2.1
* Koa 9.2.1
* MariaDB 10.1.34

## 2. Requerimientos

* Npm >= 6.2.0
* Node >= 2.2.2

## 3. Instalación

Se debe clonar el repositorio perteneciente al proyecto, este proyecto está bajo el software de control de versiones llamado github y hospedado en github.com, para clonar el repositorio se debe ejecutar el siguiente comando,

	git clone https://github.com/braulioUsach/ingeso-SISGEDOPRA-api

Una vez ejecutado el comando comenzara la clonación del repositorio. Este repositorio contiene el proyecto, sin las librerías externas de JavaScript utilizadas, por ende, se debe a proceder a instalarlas de la forma que se describe a continuación:

Cuando esté el repositorio clonado, se deberá ingresar a él. Está ubicado en el directorio SISGEDOPRA que se acabó de crear al ejecutar el comando anterior.

	cd ingeso-SISGEDOPRA-api

Luego se debe inicializar la app con el siguiente comando:

  make start

En caso de no ejecutarse el comando anterior, se debe proceder a ejecutar los siguientes comandos:

	- npm install
  - npm run start

### 3.1 Base de datos

  El artefacto por defecto se conecta a una base de datos alojada en la nube. Si se desea modificar la base de datos a conectar, se debe cambiar la configuración dentro del archivo de configuración ubicado en:

  /config/default.json

  Se adjunta modelo de base de datos con la que trabaja el artefacto a la fecha en la siguiente resulta

  /extras/schemeDefault.sql

## 4. Mantención

Si en un futuro el sistema es actualizado, deberás dirigirte al directorio donde se encuentra hospedado el proyecto, ejemplo:

	cd ingeso-SISGEDOPRA-api

Una vez dentro, deberás ejecutar el comando para actualizar el repositorio

	git pull

Instalar las librerías nuevas de JavaScript (JS) en caso de que existieran:

	npm install

## 5. Soporte

Si a pesar de todo resulta algún error y no lo puedes solucionar, contacta a:

Sebastián Iturra <sebastian.iturra@usach.cl>, Braulio Castro <braulio.castro@usach.cl>, Felipe Gaete <felipe.gaete@usach.cl> o Hugo Saavedra <hugo.saavedra@usach.cl>
