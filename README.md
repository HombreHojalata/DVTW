# LAME DUCK

## 1. Resumen
### 1.1 Descripción
**Lame Duck** es un juego en el que controlaremos al presidente pato de una ciudad de animales durante los últimos *5 días* de su mandato. Tendremos que ir escuchando las propuestas de los habitantes de los distintos distritos de la ciudad para ganarnos su apoyo frente a las elecciones venideras y así volver a ser elegidos como presidente.

### 1.2 Género
Gestión de recursos, simulación de político, toma de decisión y parodia.

### 1.3 Setting
La ciudad de Quackington DC es una metrópolis moderna, habitada únicamente por animales. Cada especie representa intereses, problemas y opiniones distintas, pero todas comparten algo en común: están insatisfechos con la política de la ciudad.
Tú eres el presidente de la ciudad, un carismático pato que fuiste elegido por tus grandes promesas y eslóganes llamativos (además de por las grandes riquezas de su familia). Sin embargo, durante tu mandato, tu gestión de la ciudad ha dejado mucho que desear.
Ahora solo quedan unos pocos días para las nuevas elecciones. Las encuestas no son favorables, por lo que tu objetivo está claro: si quieres ser reelegido tendrás que ganarte el apoyo de tus habitantes.
*No tienes que ser un buen presidente. Solo tienes que parecerlo.*

### 1.4 Características principales
- El juego muestra una vista aérea de los distintos distritos del la ciudad.
- Cada día, recibes varias propuestas de misiones para contentar a los ciudadanos de los distintos distritos. Las misiones pueden ser de tomar una decisión o de hacer un minijuego, pero todas tienen algún coste (normalmente dinero).
- También tienes eventos que surgen como consecuencia de hacer ciertas misiones (protestas, debates políticos, etc).
- Algunas misiones se consideran "corruptas", ofreciendo mucha recompensa pero decreciendo tu opinión pública.
- Entre misiones, puedes gestionar cada distritos para intentar contentar aquellos a los que más te cuestan.
- Además, existe una tienda donde mejorar distintos atributos (rango de aparición de misiones, recompensas de estas, etc), y donde puedes comprar a la prensa para subir tu opinión pública.
- Cada día está limitado por la cantidad de energía que tienes.

## 2. Gameplay
### 2.1 Objetivo del juego
La principal misión es, una vez hayan pasado todos días, haber conseguido un número específico de votos a favor para ser reelegido como presidente.

Para esto, es importante mantener a los distritos satisfechos cumpliendo con sus demandas, pero teniendo en cuenta que muchas de estas serán conflictivas entre ellas.

El juego termina si: han pasado todos días, mostrando el resultado de nuestras acciones; en caso de quedarse sin dinero, donde la ciudad entrará en caos; o en otros escenarios de derrota, como un golpe de estado, una derrota política o una invasión de la ciudad.

## 2.2 Core loops
Cada día funciona de la siguiente manera:
1. Comienzas el día con toda tu barra de energía llena. Esta va decreciendo poco a poco si no haces ninguna misión (para evitar esperar infinitamente).
2. Surgen misiones, para las cuales necesitas, a parte de recursos, gastar energía para aceptarlas.
3. Durante el día, pueden ir surgiendo eventos que vayan desarrollando la historia.
4. Entre misiones, tienes la opción de gestionar los distritos por tu cuenta (construir edificios, cambiar propiedades, etc).
5. Se pueden comprar mejoras en la tienda, y se irán desbloqueando más opciones con el paso de los días y el avance en la historia.
6. Una vez se vacía la barra de energía, dejan de aparecer misiones y se puede finalizar el día.

# 3. Mecánicas
## 3.1 Mapa de la ciudad
El jugador observa desde arriba la ciudad de Quackington DC dividida en distintos distritos. Pinchar en cada uno de estos distritos muestra un menú con imágenes del lugar, información sobre sus tipos de habitantes, y datos útiles para el jugador, como la cantidad de vecinos satisfechos con tu mandato, o los gustos principales de distrito.

## 3.2 Barra de energía
Cada día se empieza con la barra de energía llena al máximo. La barra muestra siempre su valor numérico, para que el jugador se haga una mejor idea de cuanta energía restante le queda. La barra se va reduciendo poco a poco si el jugador no hace nada, para evitar así que las partidas puedan no terminar nunca.

## 3.3 Misiones
Durante el día, van apareciendo en el mapa de la ciudad distintas misiones propuestas por los habitantes. Pinchar en una misión muestra resumidamente lo que se pide con un texto explicativo. Además, también permite ver al jugador lo que conseguirá si completa la misión, así como el coste que esta pueda tener (por ejemplo, muchas misiones necesitarán dinero).  Algunas misiones provocarán que pierdas votantes en otros distritos, en especial las misiones corruptas.

Las misiones son aleatoriamente elegidas de una lista de misiones seleccionadas dependiendo de la situación del jugador (dependiendo del día, de su opinión pública, etc). Algunas misiones pertenecen a una rama de misiones, teniendo que haber realizado primero otras para que estas puedan aparecer, desarrollando así historias por la ciudad. Las misiones irán perdiendo opacidad si son ignoradas, caducando pasado un tiempo.

Existen varios tipos principales de misiones:
### 3.3.1 Misiones normales
Las misiones normales te propondrán darte ciertos apoyo o recursos a cambio de algo. Por ejemplo: "Los castores de la presa hidráulica exigen un aumento de sueldo", esta misión proporciona la satisfacción de los ciudadanos a cambio de dinero.
### 3.3.2 Misiones de probabilidad
Las misiones de probabilidad son misiones que tienen un porcentaje de acierto que se muestra antes de aceptarla. Esto significa que existe la posibilidad que pagues lo requerido para la misión, y no consigas el beneficio prometido. Por ejemplo: "Los detectives siguen el rastro de la mafia de las ratas hasta un viejo restaurante, ¿quieres enviar ahí al cuerpo de policías?", en caso de aceptar la misión hay posibilidades de que arrestes a los criminarles, y posibilidades de que los detectives hayan estado equivocados y sea una falsa alarma. 
### 3.3.3 Misiones de minijuegos
Las misiones de minijuegos son misiones que presentan un pequeño minijuego que superar para poder completar la misión. En caso de fallarlo, estas no dan recompensa. Por ejemplo: "Controla la protesta delante del ayuntamiento", donde presenta un minijuego al estilo mata-topos.
### 3.3.4 Misiones de elección
Las misiones de elección presentan más de una opción para hacerla. Estas misiones pueden tener parte de misiones normales, de probabilidad, o de minijuegos. Por ejemplo: "Los gatos te piden construir nuevas casas en su barrio", pudiendo elegir si contratar a una empresa (probabilidad), o hacerlo tu mismo, formando un puzle antes de que se acabe el tiempo (minijuegos).
### 3.3.5 Misiones corruptas
Las misiones corruptas son más raras que las demás. Estas ofrecen una recompensa muy grande, pero a cambio bajan tu nivel de opinión pública. Pueden ser de cualquier tipo (normales, probabilidad, minijuegos y hasta de elección). Por ejemplo: "Las águilas están dispuestas a pagarte mucho dinero a cambio de que subas el impuesto al resto de distritos".

## 3.4 Eventos
A lo largo del día, tu secretaria puede presentarte un evento importante. Los eventos tienen la misma funcionalidad que una misión, pero no son opcionales. Al igual que las misiones, hay muchos tipos de eventos, como de elección ("Presidente, nos preguntan si queremos asistir al debate electoral"), de minijuegos ("Presidente, estos documentos son incriminatorios. Deshazte de ellos"), o incluso de corrupción ("Presidente, podríamos ahorrar algo de dinero si cortamos la luz en el barrio de las ratas durante unos días...").

Algunos eventos no tienen ningún beneficio (como por ejemplo invasiones o protestas), y existen solo para complicarle las cosas al jugador.

## 3.5 Gestión de distritos
Entre misión y misión, también es posible realizar tareas de presidente, focalizando recursos en un distrito para ganar votantes ahí. Existen dos principales gestiones de distritos:
### 3.5.1 Construir edificios
Cada distrito cuenta con un máximo de edificios que se puedan construir en él, además de que hay edificios que solo se puedan construir en ciertos distritos. Los edificios aportan ciertas ventajas al distrito (por ejemplo, las fábricas aumentarán el dinero ganado al día, pero bajará la satisfacción del distrito; por otro lado, los parques aumentarán el número de votantes en la zona).
### 3.5.2 Modificar parámetros
Mientras se vallan ganando más votantes a favor en un distrito, se van desbloqueando nuevos parámetros a ajustar para subir la satisfacción o ganar más beneficio (por ejemplo, se puede subir las patrullas de policías en un distrito para aumentar la seguridad y la satisfacción; o se pueden ampliar los horarios de trabajo de la zona para aumentar el dinero producido dañando un poco tu reputación en el barrio).

## 3.6 Mercado negro
En una pestaña aparte se encuentra el mercado negro. Aquí se pueden comprar ciertas mejoras: aumentar el rango de aparición de misiones, desbloquear nuevos edificios que construir en los distritos, comprar un comodín para conseguir que una misión de probabilidad no falle, etc. Además, también se ofrecen opciones más cuestionables, como comprar a la prensa para mejorar la opinión pública, con un precio cada vez más grande para evitar no tener nunca consecuencias por corrupción.

Algunas de las opciones del mercado negro se van desbloqueando a avanzar en ramas de las misiones, al pasar los días, o al cumplir algún tipo de criterio (ejemplo: si tienes la mitad de la población a tu favor, desbloqueas la opción de cambiar los horarios laborales en los distritos).

## 3.7 Opinión pública
Uno de los recursos a tener en cuenta es la opinión pública. Si esta baja demasiado, tiene consecuencias para todo el juego: es más complicado conseguir votantes, la posibilidad de eventos negativos crece, y los haters se vuelven más agresivos.

## 3.8 Final del día
Cuando se gaste toda la energía del día, nuevas misiones dejarán de aparecer, aunque se puede seguir gestionando los distritos o comprando cosas en el mercado negro. Una vez el jugador no quiera seguir con el día, puede pulsar el botón de "Terminar el día" para volver a su hogar y ver en las noticias un pequeño resumen de sus acciones de hoy. El jugador puede elegir terminar el día antes de tiempo, si así lo desea. Al empezar cada día, la ciudad genera cierta cantidad de dinero dependiendo de la situación del jugador (por ejemplo: si ha construido fábricas en distritos, estas producen más dinero cada día, lo mismo con los  hoteles).

## 3.9 Votantes
Subir la satisfacción de los distritos aumenta la cantidad de votantes. Al acabar todos los días, es necesario tener cierto número de estos para poder ganar la partida y ser reelegido.

# 3.10 Haters
Las acciones del jugador pueden llevarle a que consiga que grupos de habitantes le odien completamente. Estos son más complicados de convencer de volverse votantes a tu favor (aunque no imposible), y cuando más grande sea este número, más eventos agresivos harán (revueltas, manifestaciones, intentos de golpe de estado, etc).

## 4. Interfaz
### 4.1 Controles
[EL JUEGO] está pensado para ser jugado con teclado y (sobre todo) ratón, aunque existe la posibilidad de que se pueda jugar también con controles táctiles de móvil o incluso mando.
- **Abrir información de distrito:** Pinchar en el distrito para seleccionarlo, y en información.
	- **Construir/Gestionar el distrito:** Pinchar en la opción elegida
- **Abrir misión propuesta:** Pinchar en ella.
	- **Elegir si acertar misión o seleccionar propuesta:** Pinchar en la opción o cerrar misión.
	- **Minijuegos:** Varían, pero casi todos serán de usar el ratón y puede que algunos teclado.
- **Abrir mercado negro:** Pinchar en la pestaña o pulsar un botón del teclado específico.
	- **Comprar:** Pinchar en la opción.
- **Terminar el día:** Pinchar la opción de "Terminar el día" o pulsar un botón del teclado específico
- **Pausar el juego/Menú ajustes:** Pulsar la tecla "Esc" o pinchar en una pestaña específica.

## 4.2 HUD
Muestra el mapa de la ciudad desde arriba con los distintos distritos. El mapa muestra en 3D los edificios principales de cada zona, y subraya la separación entre estas para dejarlas dejarlas claras al jugador. Cuando se pasa el ratón por encima, los objetos interactuables brillan un poco, y al hacer click se hunden como si fueran un botón. Al seleccionar un distrito, abajo pone el nombre de este y un botón de información para abrir la pantalla de sus datos.
En la esquina inferior izquierda se muestra el dinero restante, y al otro lado (derecha) está la barra de energía restante del día actual. Encima de esta, se encuentran los botones para abrir la tienda y para terminar el día (más pequeño, pero se ilumina cuando la energía se agota). 
Sobre el mapa se observa una barra que lleva la cuenta de cuantos habitantes se consideran votantes del jugador. Esta barra empieza completamente naranja (todo el mundo es neutral), y va incrementando por la izquierda el color verde (votantes) a medida que satisfaces a la gente, y por la derecha el color rojo (haters) a medida que vas obteniendo más habitantes en tu contra como resultado de tus actos.
Como extra, en la esquina superior izquierda se muestra un retrato del personaje del jugador: el presidente pato (con posible personalización o elección de otros personajes en un futuro). Este reaccionará un poco a la situación del jugador, mostrándose alegre si las cosas van bien, y cansado si la situación es desastrosa.

## 4.3 Menús
El juego tiene el menú principal antes de iniciar la partida, así como un menú de pausa donde ajustar parámetros como el sonido.

# 5. Mundo de juego
### 5.1 Personajes
### 5.1.1 Presidente
El el protagonista del juego: Donald J. Duck, el presidente pato. Es un pato blanco con plumas amarillas en la cabeza y una corbata. En un fututo, igual existen más presidentes desbloquables.
### 5.1.... [PERSONAJE]
*Aquí podemos pensar más personajes. De momento estaría bien pensar un poco los distintos NPC's que necesitaremos, como el/la secretario/a del presidente, el/la jefe/a de policiía, el/la líder de los mafiosos, etc.*

## 5.2 Recursos
El principal recurso a conseguir son los **votantes**, ya que se necesita ganar cierto número para conseguir la victoria. Para ello, el jugadpr tiene control directo del **dinero** de la ciudad, pudiendo invertirlo en contruir edificios, hacer misiones, comprar mejoras y manejar distritos. Cada día el jugador empieza con el dinero que sobró el día anterior, más un extra que varía dependiendo de ciertos factores (mejoras desbloqueadas, impuestos aplicados, cobros por edificios, etc). 

Cada día se recarga la barra de **energía**, y esta se va reduciendo poco a poco, sirviendo como temporizador. La energías e usa para realizar misiones, consumiendo cierta cantidad de esta cada vez que se acepten. La propia barra en sí está dividida en secciones, cuando una sección se vacía se cuenta como un _ciclo_. Los ciclos son la forma en la que las acciones pasivas tomen lugar (por ejemplo, algunos edificios generan dinero cada ciclo).

Además de esos recursos, el jugador tiene que controlar la **opinión pública**, que se reduce cada vez que este hace un acto corrupto. Cuanto más disminuye la opiniópn pública, más aumenta el porcentaje de respuestas violentas por parte de los habitantes (revueltas, quejas, etc). Esta se puede manipular pagando a la prensa para recuparar cierta reputación, ó haciendo misiones que suban la **satisfacción** en los distritos. Este último recurso es independiente de cada distrito, y cuando más alta este, mayor es la cantidad de votantes conseguidos pora acciones. Si disminuye demasiado, afectará a la opinión pública.

*Propuestas de posibles recursos:*
- *Dinero*
- *Opinión pública*
- *Energía*

## 5.3 Ciudad
La ciudad está dividida en 6 distritos principales. Cada distrito tiene un habitad distitnta con sus habitantes preparados para vivir en esos ambientes. Además, los ditritos también tienen características diferenciables más allá de lo estético:
- **El Nido:** La zona más prestigiosa de la ciudad, situada en el pico de la montaña central. Aquí es donde viven casi todos los pájaros y aves. Los edificios comerciales (hoteles, centros comerciales, etc) de esta zona generan más dinero a cambio de ser más caros. Es raro enfadar a sus vecinos, pero las pocas cosas que les molesta, lo hacen mucho (por ejemplo, la suciedad en las calles).
- **Nueva Pradera:** La zona de los suburbios de clase media, lleno de edificios y oficinas. Aquí es donde van todos los animales que no se me ocurren donde poner: perros, leones, vacas, etc. Es la zona más "básica", por lo que se puede construir un número variado de edificios y los vecinos no tienen un comportamiento distintivo.
- **Somosagua:** El distrito de los animales acuáticos. Es una zona industrial, por lo que construir fábricas y otros edificios similares no reducirá tanto como en otros distritos la satisfacción de los vecinos.
- **Borrascal:** La zona con temperaturas heladas donde habitan animales como osos polares, pingüinos, y focas marinas. Debido a la posibilidad de que las obras derritan la zona, se pueden contruír muy pocos edificios en el lugar, pero a cambio son más efectivos. Los vecinos están muy concienciados con el cambio climático, por lo que reducirán mucho la satifacción ante las fábricas y similares.
- **Sahar:** Una gran zona desértica alejada del centro. Aquí habitan animales como camellos, elefantes, lagartos, etc. Está muy vacía, por lo que se pueden construir muchos edificios allí y más baratos que en otros distritos, pero al haber menos gente, tienen menor efectividad.
- **Guinea:** La zona tropical con un montón de animales de jungla o pantano. Es una zona muy turística debido a sus famosos festivales y fiestas. Las ordenanzas del presidente (manejar los horarios laborales, subir la seguridad del distrito, etc) son menos efectivas aquí ya que muchos vecinos son turistas, pero los hoteles y zonas públicas son más eficientes.

Además de estos distritos principales, dentro de **Nueva Pradera** se encuentra también un suburbio de animales considerados "plagas" (ratas, mapaches, mofetas, hienas, buitres, etc), pero con el tiempo fue desarrollando su propia culutra por la mezcla de minorias oprimidas:
- **Little Vermintown:** Un pequeño barrio extrarradio en mitad de Nueva Pradera. Aquí es donde surge la mafia y otros grupos en contra del presidente, por lo que tanto los edificios como las ordenanzas del presidetne pierden efectividad. Si la mafia se ve amenazada, esta se puede mover a otro distrito, reduciendo la efectividad de este.

## 6. Estética y contenido
*POR DISCUTIR*

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
- **Papers, please:** Por la critica política y los días unitarios conectados por una historia.
