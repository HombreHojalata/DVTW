<div align="center">
  <h1>LAME DUCK</h1>
  <img width="250" alt="Protagonista Pato" src="https://github.com/user-attachments/assets/e7bc0c12-45c8-4c63-8b11-6a5e42160929"/>
  <br>
  <i>"No tienes que ser un buen presidente. Solo tienes que parecerlo."</i>
</div>

---

# 1. Visión general
## 1.1. Descripción
**Lame Duck** es un juego de gestión de recursos y estrategía, en el que controlas al pato presidente de la ciudad de Quackington DC durante los últimos días de su mandato intentando contentar lo máximo posible a los ciudadanos para conseguir su apoyo en las elecciones venideras y ser reelegidos.

El juego muestra una visión aérea de un mapa de la ciudad dividida en sus respectivos distritos. Cada cierto tiempo, surgen misiones en el mapa y eventos que permiten conseguir subir la satisfacción de las zonas, lo que se traduce en votos. Las misiones tienen un coste de energía y otros recursos, y una vez terminadas todos los días, el jugador gana si ha conseguido más del 80% de la población a su favor.

A medida que la partida avanza se van desbloqueando nuevas formas de controlar la ciudad, como construyendo edificios o gestionando parámetros de los diferentes distritos.

## 1.2. Pilares de diseño
- **Gestión de recursos:** La idea es manejar varios recursos al mismo tiempo para conseguir manipular variables de satisfacción, recaudando así votos.
- **Sátira política:** El juego es muy crítico, de forma cómica, de la situación política de la actualidad. Está diseñado para que sea complicado ganar sin hacer ninguna acción corrupta, reflejando el comportamiento de los políticos de nuestra época.
- **Toma de decisiones:** Durante el desarrollo de las partidas se puede observar cómo surge una narrativa en las misiones y eventos que suceden. El jugador puede decidir que caminos tomar y qué medidas implantar para responder a la historias presentada.

## 1.3. Setting
> La ciudad de Quackington DC es una metrópolis moderna, habitada únicamente por animales. Cada especie representa intereses, problemas y opiniones distintas, pero todas comparten algo en común: están insatisfechos con la política de la ciudad.
Tú eres el presidente de la ciudad, un carismático pato que fuiste elegido por tus grandes promesas y eslóganes llamativos (además de por las grandes riquezas de su familia). Sin embargo, durante tu mandato, tu gestión de la ciudad ha dejado mucho que desear.
Ahora solo quedan unos pocos días para las nuevas elecciones. Las encuestas no son favorables, por lo que tu objetivo está claro: si quieres ser reelegido tendrás que ganarte el apoyo de tus habitantes.
*No tienes que ser un buen presidente. Solo tienes que parecerlo.*

# 2. Gameplay
## 2.1. Core loop
El *core loop* del juego se basa en gestionar los recursos de manera eficiente para manipular las variables sociales. La clave es buscar un equilibrio entre gasto inmediato en inversión a largo plazo. Cada partida está dividida en varios días individuales, actuando el primero como un tutorial de las mecánicas básicas, mientras que el resto va aumentando en dificultad a medida que se van desbloqueando opciones y desarrollando la historia.

Cada día se divide, más o menos, en el siguiente ciclo de juego:
1. Comienza la jornada con la barra de energía llena al máximo.
2. Surgen misiones y eventos que recompensan al jugador con satisfacción a cambio de recursos.
3. Si el evento, o la misión, ha causado alguna consecuencia, el jugador puede responder ajustando las variables construyendo edificios o modificando parámetros de distritos.
4. En caso de conseguir suficientes recursos, el jugador puede comprar mejoras.
5. Cuando la energía se reduce demasiado, se termina el día.

## 2.2. Desarrollo de la historia
La historia toma lugar a lo largo de los últimos días de mandato del presidente.

El **primer día** se usa como tutorial para enseñar al jugador los controles básicos de acceso a distritos y misiones, así como las misiones corruptas *(más información sobre las mecánicas en el apartado 3)*. El **segundo día** es donde se deja más libertad al jugador de probar los distintos sistemas; se introduce también la construcción de edificios y el Mercado Negro. Durante el **tercer día** se introduce al jugador a la gestión de parámetros de distritos y la mafia.

Este mismo día, también se seleccionará la *narrativa* que seguirá el jugador durante el resto de la partida, y mostrará las primeras pistas y misiones de esta a lo largo del día, desarrollándose más y más durante los siguientes días, hasta el **día final**, donde surgirá una *catástrofe* como desenlace de la narrativa llevada hasta el momento.

## 2.3 Narrativas y finales
Existen varias narrativas que dictaminan las misiones y eventos que surgen a lo largo de los últimos días, además de la *catástrofe* del día final:
- *El Caso de la Mafia:* Comienzas a recibir información acerca de los paraderos del jefe de la mafia local. Está en tus manos si decides desarmarla o unirte a ellos.
- *La Purga:* La criminalidad crece en la ciudad y los ricos exigen realizar una Purga. Te unas o no a su causa, llega el funesto día. Debes hacer algo al respecto.
$$\dots$$

En caso de que el jugador se quede sin recursos, o se vea envuelto en una situación inescapable de la narrativa, la partida terminará antes de que transcurran todos los días. En caso de conseguir superar todos los días, el jugador será victorioso si ha conseguido reunir un *80%* de los votos.

# 3. Mecánicas
## 3.1. Mapa de la ciudad
Durante el juego se observa al mapa de Quackington DC desde arriba. La ciudad está dividida en 6 distritos: El Nido, Nueva Pradera, Somosagua, Borrascal, Sahar y Guinea. Seleccionar un distrito muestra su nombre al jugador, y si este además selecciona la opción de “Información”, despliega una pantalla con los datos del distrito: una imagen de la zona, una descripción escrita, el nivel de satisfacción, el número de vecinos en el distrito, los parámetros manejables y los edificios (las últimas dos secciones empiezan bloqueadas y se van desbloqueando con el transcurso de los días).

## 3.2 Recursos y variables
### 3.2.1 Recursos del jugador
**Dinero:** Representa la economía de la ciudad. Esta se utiliza para una gran variedad de acciones: desde financiar misiones y sobornos, hasta construir edificios, pasando por comprar mejoras en el Mercado Negro.
- ***Obtención:*** Las fuentes más consistentes son la recaudación pasiva de impuestos, las cuales se pueden gestionar en cada distrito por separado; y, sobre todo, los edificios como hoteles, fábricas o tiendas. También se puede obtener mediante misiones o eventos, en especial si son corruptas (como sobornos de la mafia).
- ***Gestión:*** Si se termina un día con saldo negativo, puede provocar una crisis financiera que reduzca la popularidad del presidente. En caso de superar un umbral de deuda, la partida termina con el jugador siendo expulsado del cargo.

**Energía:** Actúa como el tiempo y esfuerzo del jugador. Esta limita la cantidad de misiones que se pueden hacer antes de terminar una jornada. La energía se recupera en su totalidad al empezar un nuevo día.
- ***Temporizador:*** La energía decrece a un ritmo lento pero constante durante el día, dificultando que el jugador simplemente se quede esperando a que surjan mejores misiones.
- ***Gestión:*** Cada misión aceptada requiere un pago inmediato de energía. El valor requerido varía dependiendo de la misión.
- ***Ciclos:*** La barra de energía está dividida en secciones. Cada vez que una de esas secciones se vacía por completo (por gasto pasivo o por hacer misiones) se completa un ciclo. Estos ciclos afectan a eventos pasivos, como la generación de ingresos por edificios o eventos de la historia.

### 3.2.2. Variables de gestión
**Opinión Pública:** La marca métrica global que determina la puntuación del jugador, y se muestra en todo momento en una barra en la parte superior de la pantalla. Representa la población total del Quackington DC dividida en tres segmentos:
- ***Afines:*** Ciudadanos que han decidido apoyar al jugador. El objetivo del juego es conseguir cierta cantidad de ciudadanos afines.
- ***Neutrales:*** Ciudadanos que aún no están politizados. El principal objetivo de las misiones es convertirlos.
- ***Opositores:*** Ciudadanos activamente en contra del jugador. Estos requieren medidas específicas para ser convencidos, y reducen la satisfacción obtenida en distritos donde se aglomeran.

**Satisfacción:** Cada distrito tiene un nivel de satisfacción independiente (del -100% al 100%). Este aumenta con al completar ciertas misiones de la zona o construir edificios de bienestar, y disminuye como resultado de acciones negativas contra el distrito. La satisfacción se puede ver en la pestaña de información de cada distrito.
- ***Conversión de votos:*** El porcentaje de satisfacción se traduce directamente en el porcentaje de vecinos del distrito *afines* al jugador (cada distrito tiene un número de población distinto).
- ***Umbral negativo:*** Si la satisfacción cae por debajo de 0, el distrito comienza a generar *opositores* de forma proporcional. Estos tienen un efecto pasivo en que reducen la obtención de satisfacción positiva porcentualmente según su cantidad (por ejemplo, si un distrito cuenta con un 20% de opositores en él, una misión que normalmente proporciona +10 de satisfacción, tan solo generará +8 de satisfacción). El jugador deberá hacer misiones específicas o subir por encima del 100% la satisfacción para convertir de vuelta a los *opositores*.

**Corrupción:** Es una variable que representa el grado de corrupción del jugador. Esta no se muestra de forma directa al jugador, pero si con pistas visuales (noticias, mensajes de la secretaria, eventos, etc). Esta valor aumenta cada vez que se lleva a cabo una *acción corrupta*.
- ***Aumento de corrupción:*** Cada vez que se aumente el valor de la corrupción, se comprobará si el presidente es “pillado”, subiendo la posibilidad cuanto más corrupción tenga. Si esto ocurre, repercutirá en una bajada generalizada de satisfacción en todos los distritos, además de otros posibles efectos dependiendo del nivel de corrupción al ser pillado.
- ***Blanqueo:*** Para reducir el nivel de corrupción se pueden hacer ciertas misiones, aunque la forma más efectiva es pagar a la prensa en el mercado negro para conseguirlo. El precio de esta compra irá en aumento exponencial para obligar al jugador a poder siempre librarse de las consecuencias de las elecciones corruptas.

## 3.3. Misiones
A lo largo del día van surgiendo misiones sobre el mapa de la ciudad. Pinchar en una muestra un texto explicativo que resume la misión, además de enseñar el coste que esta tiene. Todas las misiones cuestan *energía*, y la mayoría cuestan también dinero u otros recursos (alguna incluso cuestan satisfacción, en especial las corruptas). También se visualiza lo que la misión ofrece como recompensa, para que el jugador pueda recapacitar si le merece la pena la inversión.

Las misiones son elegidas aleatoriamente de una lista de misiones que varía dependiendo de la situación del jugador (sobretodo influye el día). Además, a las listas de misiones aleatorias genéricas se le añaden las misiones específicas de la narrativa que el jugador esté viviendo en ese momento. Una vez aparecen, comienzan a perder opacidad si son ignoradas, caducando al pasar un tiempo y desapareciendo.

Algunas misiones pertenecen a una **rama de misiones**, provocando que se añadan continuaciones de estas a la lista de misiones aleatorias.

Existen varios tipos distintos de misiones:
### 3.3.1. Misiones básicas
Las misiones básicas son una transacción sencilla: te proporcionan una recompensa a cambio de un gasto.
**Ejemplo:** *”Los castores de la presa hidráulica exigen un aumento de sueldo” Esta misión proporciona satisfacción de los vecinos a cambio de dinero.*
### 3.3.2. Misiones de probabilidad
Las misiones de probabilidad tienen un porcentaje de acierto que se muestra antes de aceptarla. Esto significa que puede ser que se pague lo exigido por la misión pero que no se consiga recompensa, e incluso que cause algún suceso negativo.
**Ejemplo:** *”Los detectives siguen el rastro de la mafia de las ratas hasta un viejo restaurante. ¿Enviar a los policías?” En caso de aceptarla, hay posibilidades de que arresten a los criminales consiguiendo satisfacción, pero también que sea una falsa alarma.*
### 3.3.3. Misiones de minijuegos
Las misiones de minijuegos presentan una pequeña tarea o desafío que debe superar el jugador para completar la misión. En caso de fallarlo, esta no dará recompensa. Suelen estar reservadas para misiones importantes de narrativas, pero también hay algunas genéricas.
**Ejemplo:** *”¡Controla la protesta frente al ayuntamiento!” Muestra un minijuego estilo matatopos.*
### 3.3.4. Misiones de elección
Las misiones de elección proporcionan más de una opción de resolverlas. Pueden contener elementos de otros tipos de misiones.
**Ejemplo:** *”Los reptiles te piden construir nuevas casas en Sahar.” Esta misión te da la opción de contratar a una empresa que desconoces que tal lo hará (probabilidad), o ir tú mismo a construirlas (minijuego).*
### 3.3.5. Misiones corruptas
Las misiones corruptas son menos comunes que el resto. Estas pueden ser de cualquier tipo, y prometen una recompensa mucho mayor a las misiones corrientes. A cambio, estas suelen venir con alguna penalización, normalmente en forma de bajar la satisfacción en algún distrito. Además, aceptar una misión corrupta subirá el nivel de *corrupción* general.

## 3.4. Eventos
Los eventos son misiones obligatorias. A lo largo del día y de forma aleatoria, aunque también surgen como respuesta a las acciones del jugador, aparecen eventos que frenan la acción y obligan al jugador a realizar una misión. Estas pueden ser de cualquier tipo: básicas, de probabilidad, de minijuegos, de elección y hasta corruptas.

En ocasiones, pueden surgir eventos que no tengan ningún beneficio, como una invasión, o una huelga. Estos sirven para asegurarse que el jugador nunca esté muy cómodo en su situación y tenga que reaccionar a esto. En contraposición, también existen eventos meramente positivos, como la inauguración de una nueva estatua que sube la satisfacción de su distrito.

## 3.5. Mercado Negro
En una pestaña en la parte inferior de la pantalla se encuentra el Mercado Negro. En él se pueden comprar ciertas mejoras que afectan a la jugabilidad: aumento de rango de aparición de misiones, disminuir el coste de algunos edificios, adquirir un comodín para pasar una misión de probabilidad, etc. Existe también la opción de comprar a la prensa para reducir la corrupción, pero el precio aumenta exponencialmente con cada compra para evitar que el jugador nunca tenga que lidiar con las consecuencias de sus acciones.

Algunas opciones del Mercado Negro se van desbloqueando al pasar los días, conseguir ciertos objetivos, o completar ramas de misiones específicas. También cuenta con compras específicas para ciertas narrativas.

## 3.6. Selección de narrativas
A partir del tercer día, se selecciona la narrativa que el jugador irá viviendo a lo largo de la partida. Diferentes narrativas causan diferentes efectos y misiones, empezando por cambios de comportamientos (por ejemplo, si se trata de una narrativa sobre la mafia, esta empezará a cobrar más protagonismo antes de comenzar a proponer misiones de sobre investigarla).

Todas la narrativas añaden una **catástrofe** al día final: un evento con causas negativas para poner a prueba la capacidad de adaptarse del jugador. Además, mientras dure la catástrofe, las misiones se reemplazarán por únicamente las de la narrativa. Durante este tiempo, el día no se puede saltar.

Cuando termine este evento, el jugador tendrá la posibilidad de hacer control de daños los últimos momentos del día final.

## 3.7. Final del día
Debajo de la barra de energía se muestra el botón de “Terminar el Día”. Este puede ser pulsado por el jugador en cualquier momento (si no está en medio de una catástrofe) para finalizar el día si así quiere. Si aún le queda energía restante, se muestra un mensaje preguntando si de verdad quiere finalizar el día antes de tiempo.

Una vez se termina una jornada, se presenta un resumen de lo hecho durante el día como si fuera un reportaje sobre el presidente. También aparecen noticias relacionadas con la narrativa o acciones tomadas.

## 3.8. Distritos
Los distritos de la ciudad de Quackington DC cuentan con diferencias mecánicas:
| Distrito | Característica |
| :--- | :--- |
| **El Nido** | Los Hoteles y Centros Comerciales son más efectivos, pero la suciedad causa más insatisfacción.  |
| **Nueva Pradera** | Es el distrito que empieza con más población, pero las casas cuestan más. |
| *Somosagua* | Las Fábricas no disminuyen tanto la satisfacción del distrito. |
| *Borrascal* | Tienen menos espacio para construir edificios, pero los parámetros del distrito tienen mayor efecto. |
| *Sahar* | Cuenta con mucho espacio para edificios y son más baratos, pero son menos efectivos y es el distrito que empieza con menor población. |
| *Guinea* | Los Hoteles y Parques son más efectivos, pero los parámetros del distrito tienen menor efecto. | ---

Cada distrito debe controlar su número de vecinos, así como su satisfacción, edificios y parámetros generales.

### 3.8.1. Edificios
Cada distrito tiene una cantidad específica de edificios que construir. Las opciones generales son las siguientes:
| Edificio | Coste de Construcción | Efecto | Impacto Social |
| :--- | :--- | :--- | :--- |
| **Gran Centro Comercial** | Muy Alto | Genera **Dinero** cada ciclo | Aumenta la **Satisfacción** |
| **Hotel de Lujo** | Alto | Genera **Dinero** cada ciclo | *Ninguno* |
| **Mega-Fábrica** | Alto | Genera mucho **Dinero** cada ciclo.  | Disminuye la **Satisfacción**, y puede provocar *Opositores* |
| **Hospital** | Alto | Aumenta un poco la **Satisfacción** | Reduce la pérdida de **Satisfacción** ante un crisis |
| **Colegio Público** | Medio | Aumenta la **Satisfacción** | *Ninguno* |
| **Comisaría** | Medio | Disminuye en número de *Opositores* | Aumenta la *Corrupción* |
|**Bloque de Viviendas**| Medio | Aumenta la población del distrito | Sube un poco la **Satisfacción** |
| **Parque Municipal** | Bajo | Aumenta un poco la **Satisfacción** | *Ninguno* | ---

Además, existen edificios específicos de cada distrito que se consiguen al aumentar la satisfacción de estos a cierto nivel:
| Distrito | Edificio | Coste de Construcción | Efecto |
| :--- | :--- | :--- | :--- |
| *El Nido* | **Club Nocturno VIP** | Alto | Duplica el efecto de los Hoteles y Centros Comerciales en el distrito |
| *Nueva Pradera* | **EnPAWire State** | Alto | Aumenta la efectividad de todos los edificios del distrito |
| *Somosagua* | **Petrolera Nemo** | Medio | Reduce mucho la **Satisfacción** del distrito, pero aumenta la efectividad de todas las Fábricas de la ciudad |
| *Borrascal* | **Instituto de Investigación Polar** | Alto | Reduce el coste de las mejoras del Mercado Negro |
| *Sahar* | **Casino “Cuerno Dorado”** | Medio | En cada ciclo tiene la posibilidad de aumentar un poco la **Satisfacción** de todos los distritos, y una pequeña posibilidad de bajarla en el distrito |
| *Guinea* | **Teatro Janeiro** | Alto | Reduce un poco la **Corrupción** en cada ciclo. Pan y circo. | ---

### 3.8.2. Parámetros
Tras un par de días, se desbloquea la opción de manejar los parámetros de cada distrito, manejando una serie de barras, presentando un coste por modificarlas:
1. **Impuestos (Fiscalidad):**
	 - **Pros:** Genera más dinero por día de forma pasiva.
	 - **Contras:** Reduce la satisfacción.

2. **Seguridad (Orden Público):**
	 - **Pros:** Mitiga eventos negativos y reduce el número opositores mínimamente cada ciclo.
	 - **Contras:** Aumenta el coste de dinero y sube la corrupción.

3. **Limpieza (Saneamiento):**
	 - **Pros:** Aumenta la satisfacción constante.
	 - **Contras:** Aumenta el coste de dinero.

4. **Jornada Laboral (Productividad):**
	 - **Pros:** Aumenta la efectividad de los edificios que generan dinero.
	 - **Contras:** Reduce la satisfacción y puede generar opositores.

5. **Propaganda (Comunicación):**
	 - **Pros:** Aumenta la satisfacción y disminuye mínimamente los opositores.
	 - **Contras:** Aumenta mucho el coste de dinero y sube mucho la corrupción.

### 3.9. Mafia
A lo largo de la partida un distrito elegido sin que el jugador lo sepa albergará a la mafia. Esta se dedicará a reducir la efectividad de la zona, pero puede aliarse con el presidente si el jugador la trata bien a costa de aumentar la corrupción. Algunas misiones o eventos especiales influenciarán a la actitud de la mafia con el jugador, pudiendo ayudarle o ir en su contra dependiendo del caso.

# 4. Interfaz
## 4.1. Controles y plataformas
El juego está pensado para jugarse con teclado y ratón. Las mayoría de interacciones se realizan haciendo click con el ratón o moviendo el cursor por la pantalla, con muy pocas ocasiones en las que únicamente se pueda usar el teclado (siendo en algunos minijuegos o al escribir cosas). También cuenta con atajos de teclado para abrir pestañas como el Mercado Negro o el menú de ajustes.

Debido a sus controles simples, existe la posibilidad de ser jugables tanto en dispositivos táctiles como con mandos, pero actualmente no son una prioridad.

## 4.2. HUD
### 4.2.1. HUD del mapa principal

<p align="center">
  <img width="700" alt="pantallaPrincipal" src="https://github.com/user-attachments/assets/45b65f7e-fdc5-4344-af28-d89faa40dff2">
  <br>
  <i>Boceto del HUD del mapa principal de Quackington DC</i>
</p>

En la pantalla principal se muestra el mapa de Quackington DC en el centro de la pantalla. Al tocar en un distrito, este se ilumina y queda seleccionado. Las misiones también surgen aquí.
En la parte superior se encuentra una barra dividida en tres segmentos representando la opinión pública: los habitantes afines en verde, los neutrales en gris, y los opositores en rojo. A la izquierda de esta barra se muestra una imagen del protagonista.
En la zona izquierda se muestra la barra de energía dividida en segmentos para representar los ciclos. Debajo de esta está el botón de “Terminar el Día”.
En la zona inferior izquierda se encuentra la cantidad de dinero que tiene el jugador en ese momento. En la zona derecha el botón para abrir el Mercado Negro y los ajutstes. Por último, en el centro inferior se encuentra el nombre del distrito seleccionado (si no hay ninguno por el momento muestra el nombre de la ciudad) y el botón de información.

<p align="center">
  <img width="700" alt="prototipoPrincipal" src="https://github.com/user-attachments/assets/820b75d8-eff9-4e7f-baeb-e90e50331770">
  <br>
  <i>Prototipo del HUD de la pantalla del mapa principal</i>
</p>

### 4.2.2. HUD de las misiones y eventos
<p align="center">
  <img width="700" alt="mision" src="https://github.com/user-attachments/assets/4e9b6739-6cdc-4fdf-ac44-52781c907d4b" />
  <br>
  <i>Boceto del HUD de las misiones en el mapa</i>
</p>

La pantalla muestra un título de la misión o el evento, acompañado de un texto descriptivo y una imagen relacionada. En la parte inferior, se encuentran los elementos interactuables de la misión, ya sean opciones a elegir, botón de aceptar o una previsualización del minijuego. Además, muestra las recompensas y costes que tiene (o puede tener) las distintas acciones del jugador. En la zona superior derecha hay un botón con una “X” para salir de la misión, pero los eventos no tienen esta opción.

Cuando se despliega este panel, este cubre el mapa principal y lo oscurece de fondo. La energía sigue pudiendo verse para que el jugador pueda recapacitar si le merece la pena gastarla, sin embargo, está no baja mientras haya una misión abierta.

<p align="center">
  <img width="700" alt="prototipoMision" src="https://github.com/user-attachments/assets/1adae534-1ea5-4a02-a133-2c2c21872dc2" />
  <br>
  <i>Prototipo del HUD de una misión en Sahar</i>
</p>

### 4.2.3. HUD de los distritos

El panel muestra una imágen del distrito escogido y una pequeña descripción de este. Además muestra el número de vecinos y la satisfacción debajo de la imagen. A la derecha, debajo del texto explicativo, se encuentra el panel de edificios construibles que se va rellenando con las construcciones que elija el jugador. Debajo de ese panel, se encuentran unas barras deslizantes para representar los parámetros del distrito, además de un botón de información que muestra una descripción del parámetro en cuestión al pasar el cursor por encima. Estos dos últimos paneles empiezan bloqueados y se van desbloqueando con el paso de los días.

<p align="center">
  <img width="700" alt="prototipoDistrito" src="https://github.com/user-attachments/assets/cfd0993f-e7c4-48f7-9bd6-59d4d5253c96" />
  <br>
  <i>Prototipo del HUD del distrito de Borrascal</i>
</p>

### 4.2.4. HUD del Mercado Negro

Muestra una lista ordenada de nombres de mejoras o productos junto a una pequeña descripción de estos. A su derecha se muestra el precio y un botón de “Comprar”. Las mejoras o productos que se puedan comprar más de una vez también muestran el nivel o cantidad de compra que lleva hasta el momento. No todos los productos están disponibles, y algunos se muestran bloqueados. En la zona superior se muestran la corrupción del jugador, y un botón informativo para recordarle lo que hace.

<p align="center">
  <img width="700" alt="prototipoMercado" src="https://github.com/user-attachments/assets/0bfd869d-7294-4b89-824f-c4751ed33ddb" />
  <br>
  <i>Prototipo del HUD del Mercado Negro</i>
</p>


# 5. Mundo del juego
## 5.1. Personajes
### 5.1.1. Presidente
El protagonista del juego: Donald J. Duck, el presidente pato. Es un pato blanco con plumas amarillas en la cabeza y una corbata. *En un futuro, puede existir la opción de tener más presidentes desbloqueables.*

<img width="100" alt="Protagonista Pato" src="https://github.com/user-attachments/assets/e7bc0c12-45c8-4c63-8b11-6a5e42160929"/>
<br clear="left"/>

### 5.1.2. Líder de la mafia
La mafia de ratas está liderada por don Bigotes Corleonne, un pequeño ratón que viste un traje morado. Este puede ser amistoso u hostil hacia el jugador dependiendo de sus acciones.

<img width="100" alt="RataMafiosa" src="https://github.com/user-attachments/assets/8915b6c9-d3d3-4256-8461-b52ce916115c" />
<br clear="left"/>

### 5.1.3. Secretaria
La secretaria del presidente es la encargada de hacer los tutoriales y comentarle ciertos eventos a este.

## 5.2. Ciudad

<img align="right" width="400" alt="mapa" src="https://github.com/user-attachments/assets/f5258648-e26f-4e59-8951-3cd9dffb928b" />

Cada distrito cuenta con un número de habitantes independiente, además de otras características:
- **El Nido:** Es la zona más prestigiosa de la ciudad y donde reside el ayuntamiento. Situada en el pico de la montaña central, esta zona es el hogar de los ciudadanos de primera clase compuestos por la mayoría de aves.
- **Nueva Pradera:** La zona de suburbios de clase media, llena de edificios y oficinas. Está habitada por animales de todos los tipos, en especial mamíferos como perros, leones o vacas. Es donde más ciudadanos residen.
- **Somosagua:** El distrito subacuático de la ciudad, caracterizado por su arquitectura de cúpulas para los mamíferos y una gran cantidad de edificios industriales. La fauna marina habita la zona casi por completo.
- **Borrascal:** Es famosa por el alto nivel tecnológico y por su clima helado. Animales árticos son los principales vecinos del lugar, y la mayoría de edificios son blancos y poco decorados por fuera, ya que pasan mucho tiempo en interiores.
- **Sahar:** Una gran explanada desértica bajo el sol. Los edificios no son demasiado altos, y están fabricados de materiales simples. A pesar de su enorme tamaño, no cuenta con tanta población debido al clima seco. Aquí solamente viven animales acostumbrados al desierto como reptiles o camellos.
- **Guinea:** Es una zona tropical famosa por sus festivales y fiestas. El turismo es la principal fuente de ingresos del lugar, y se nota, pues hay muchos colores llamativos para atraer a viajeros. Los principales vecinos son animales de jungla y pantanos (monos, cocodrilos, loros, etc).

## 6. Estética y contenido
*POR DISCUTIR*
La estética que vamos a implementar va a ser mixta:
- **Arte animado:** Para los personajes/NPC del juego, historietas/cutscenes, mercado negro, mapa del juego.
- **PixelArt: ** Para los iconos de los edificios construibles en cada distrito.

## 7. Experiencia de juego
*POR DISCUTIR*

## 8. Producción
### 8.1 Planificación
*POR DISCUTIR*

### 8.2 Evaluación
*POR VER*

## 9. Referencias
Los principales videojuegos que inspiran nuestro diseño son:
- **SimCity:** Por la funcionalidad de simular el control de una ciudad.
- **Profesor Layton:** Por los minijuegos sencillos de ciertas misiones.
- **This is the Police:** Por el sistema de misiones emergentes en un mapa.
- **Plague Inc.:** Por el gameloop de observar un mapa y aumentar tu influencia en él.
- **Overcooked:** Por el elemento caótico a medida que avanza el juego.
- **Papers, please:** Por la crítica política y los días unitarios conectados por una historia.
