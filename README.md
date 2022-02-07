# Diseño web para datos georreferenciados

## Práctica profesional 

## Semana 1 : 03/01/22 al 07/01/22

En primer lugar, se realiza un recorrido dentro del recinto para conocer las instalaciones y al personal. Luego, ya en el puesto de trabajo asignado se definen objetivos: investigación de las posibilidades para mostrar datos geográficos (plataformas de desarrollo), forma de tratar los datos (nivel de temperatura, luz y humedad obtenidos desde los sensores de las tachas) y su volumen.
Se descubre la opción Leaflet.js , la cual corresponde a una librería JavaScript para mostrar mapas y diversas formas de tratamiento, dada su flexibilidad se decide complementar su uso junto con React.js, framework diseñado para la generación de interfaces de usuario de manera sencilla. 
Una vez pensado el proceso de ejecución (de forma general), se decide continuar con Leaflet.js dado que evita las complicaciones producidas al utilizar una API (como la de Google Maps),  se lee su documentación junto con guías de aprendizaje pensadas para nuevos usuarios.
Se busca un proyecto con objetivos similares dentro de foros y comunidades dedicados al desarrollo web para obtener una base desde la cual ejecutar la implementación. Se escoge uno reciente y con buena documentación.
Se genera el proyecto base, considerando aspectos del ejemplo encontrado. Se procede a georreferenciar un conjunto de datos para comprobar (exitosamente) el correcto funcionamiento del código generado.
Finalmente, se comienza a buscar información para implementar una capa dentro del mapa que represente un “mapa de calor” de acuerdo con el nivel de temperatura.

## Semana 2 : 10/01/22 al 14/01/22

Se resuelve la creación del “mapa de calor”, codificando en colores los rangos de temperatura. De esta forma a cada nodo se le es asignado un color (verde, amarillo o rojo) dependiendo de la temperatura que detecta su sensor. Por otra parte, se añade a la visualización una capa para representar el nivel de humedad del sensor de la tacha siguiendo la misma lógica que el “mapa de calor”, cambiando únicamente los colores de la visualización (esquema de colores azules). Además, se incorpora un mapa en blanco y negro para simplificar la observación de los datos en caso de ser necesario.
Con la plataforma en un nivel avanzado se decide subir el proyecto a un host gratuito (Google Firebase en este caso) para ser presentado al cliente, se obtiene una buena aceptación por parte de éste.
Se crea un diagrama de bloques para representar de forma sencilla las etapas en el lado del cliente que se están siendo implementadas:

![image](https://user-images.githubusercontent.com/68484788/150660621-2931f8fa-2750-40ac-a05d-9a84cc0d2b32.png)

Se comienza a trabajar en la implementación de la arquitectura en el lado del servidor para enviar los datos desde las tachas hacia la página web. Se genera el siguiente diagrama de bloques:

![image](https://user-images.githubusercontent.com/68484788/150660632-c819ad6f-eade-4355-8d56-e300379a5829.png)

## Semana 3 : 17/01/22 al 21/01/22

Se incorpora totalmente la base de datos RealTime Database de Firebase para realizar pruebas enviando información simulada en formato JSON desde la base de datos a la página web. A partir de la simulación se comprendió la necesidad de tener a disposición tres bases de datos: una que almacene los datos más actualizados de cada tacha, una que contenga las posiciones de cada tacha instalada y una última base de datos que incorpore la información histórica de cada tacha.
Se comienza a investigar sobre cómo incorporar un mecanismo que permita al usuario de la interfaz web cambiar el color de una tacha instalada en particular a través de una solicitud POST (mediante https).
Se comienza a planificar sobre posibles características que incrementarían la funcionalidad de la página web, tales como una leyenda que indique los diferentes niveles de temperatura, humedad y aceleración que experimenta cada tacha en un instante dado.

## Semana 4 : 24/01/22 al 28/01/22

Se decide controlar el color de la luz que emiten las tachas usando como intermediario la base de datos de Firebase, en otras palabras, crear un conjunto de datos que represente el color que debe tener cada tacha instalada según lo que se ingrese a un menú que envié dicha elección a la base de datos. Este menú está compuesto por dos partes, la primera corresponde a una entrada de texto donde el usuario tiene dos opciones: ingresar las id’s de las tachas separadas por comas (esto en caso de que la cantidad de tachas a manipular sea reducida) o ingredar un rango de id’s utilizando un guión (si lo que se desea es cambiar un gran número de tachas rápidamente). Luego, por parte de la plataforma ChirpStack se lee la información que está en la base de datos cada cierto intervalo de tiempo para actualizar el color de luz que emite cada tacha. Una vez implementado la interfaz de usuario se procede a realizar la decoración de ésta, con un enfoque en la simplicidad del diseño, utilizando además los colores principales de la empresa.
Finalmente, para comprobar que el sistema implementado funcionase, se utiliza la plataforma de streaming Twitch para monitorear una tacha simulada con una protoboard y luces led, la que se controla a distancia con la interfaz creada. A partir de lo observado, el sistema funciona perfectamente.

## Semana 5 : del 31/01/22 al 04/02/22

Se mejoran aspectos de la interfaz de usuario con respecto al diseño de ésta, tales como cambiar el tipo de fuente, colores y la implementación de una leyenda para identificar rápidamente los rangos en los que se ubican las variables que miden las tachas.
Se añade un nuevo tipo de visualización, la cual corresponde a segmentos de recta unidos por sus extremos, donde cada segmento representaría una tacha y su color al valor de cierto parámetro de dicha tacha (desde ese punto de vista funciona igual que la visualización utilizando círculos).
Se comienza a implementar una pestaña dentro de la página web que permite visualizar información relevante usando gráficos, por otra parte, la misma idea se implementó dentro de los pop-ups de cada tacha para, por ejemplo, ver la evolución temporal de la temperatura que midió esa tacha.
Se comienza a investigar sobre cómo incorporar una base de datos relacional con la plataforma desarrollada, dado que es ésta la forma con la cual opera el cliente.






