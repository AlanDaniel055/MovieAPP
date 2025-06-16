Para abrir el programa se requiere:
1. Instalar Node JS para angular e instalar angular client
2. Instalar Ionic client
3. Descargar los archivos y copiarlos al Usuario de tu PC
4. Abrir la carpeta con visual studio code y en la terminal ejecutar npm install para las dependencias del proyecto
5. Una vez instalado ir al archivo src/app/services/movie.service.ts (aqui se ponen las llaves como la llave de la api de the movie db, la url de the movie db y la url de imagenes de the movie db)
6. Usar ionic serve para ver el programa en en navegador
Para generar el apk usar android studio, instalar las dependencias de jdk de java en android studio generar las variables de entorno y una vez creadas:
1. Dentro del codigo en visual studio ejecutar el comando ionic build para la carpeta de produccion
2. Luego ejecutar el comando ionic capacitor add android
3. Despues ionic capacitor sync
4. Por ultimo ionic capacitor open android esto abrira android studio.
5. En android studio dar click en build y generar al apk 
