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

El juego muestra una visión aérea de un mapa de la ciudad dividida en sus respectivos distritos. Cada cierto tiempo, surgen misiones en el mapa y eventos que permiten conseguir subir la satisfacción de las zonas, lo que se traduce en votos. Las misiones tienen un coste de energía y otros recursos, y una vez terminadas todos los días, el jugador gana si ha conseguido más del 50% de la población a su favor.

A medida que la partida avanza se van desbloqueando nuevas formas de controlar la ciudad, como construyendo edificios o gestionando parámetros de los diferentes distritos.

## 1.2. Pilares del diseño
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
5. Cuando la energía se reduce hasta 0, o hasta que el jugador decida antes de ello, se termina el día.

## 2.2. Desarrollo de la historia
La historia toma lugar a lo largo de los últimos días de mandato del presidente.

El **primer día** se usa como tutorial para enseñar al jugador los controles básicos de acceso a distritos y misiones. El **segundo día** es donde se deja más libertad al jugador de probar los distintos sistemas; se introduce también la construcción de edificios y el Mercado Negro. Durante el **tercer día** se introduce al jugador a la gestión de parámetros de distritos y la mafia.

Este mismo día, también se seleccionará la *narrativa* que seguirá el jugador durante el resto de la partida, y mostrará las primeras pistas y misiones de esta a lo largo del día, desarrollándose más y más durante los siguientes días, hasta el **día final**, donde surgirá una *catástrofe* como desenlace de la narrativa llevada hasta el momento.

## 2.3 Diferentes finales
En caso de que el jugador se quede sin recursos, la partida terminará antes de que transcurran todos los días. En caso de conseguir superar todos los días, el jugador será victorioso si ha conseguido reunir un *50%* de los votos.


# 3. Mecánicas
## 3.1. Mapa de la ciudad
Durante el juego se observa al mapa de Quackington DC desde arriba. La ciudad está dividida en 6 distritos: El Nido, Nueva Pradera, Somosagua, Borrascal, Sahar y Guinea. Al seleccionar un distrito, se despliega una pantalla con los datos del distrito: el nombre, una descripción,una imagen de la zona, el nivel de satisfacción, el número de ciudadanos en el distrito, los edificios y los parámetros manejables (la última sección empieza bloqueada y se  desbloqueará con el transcurso de los días).

## 3.2 Recursos y variables
### 3.2.1 Recursos del jugador
**Dinero:** Representa la economía de la ciudad. Esta se utiliza para una gran variedad de acciones: desde financiar misiones y sobornos, hasta construir edificios, pasando por comprar mejoras en el Mercado Negro.
- ***Obtención:*** Las fuentes más consistentes son la recaudación pasiva de impuestos, las cuales se pueden gestionar en cada distrito por separado; y, sobre todo, los edificios como hoteles, fábricas o tiendas. También se puede obtener mediante misiones o eventos, en especial si son corruptas.
- ***Gestión:*** Si se termina un día con saldo negativo, puede provocar una crisis financiera que reduzca la popularidad del presidente. En caso de superar un umbral de deuda, la partida termina con el jugador siendo expulsado del cargo.

**Energía:** Actúa como el tiempo y esfuerzo del jugador. Esta limita la cantidad de misiones que se pueden hacer antes de terminar una jornada. La energía se recupera en su totalidad al empezar un nuevo día.
- ***Temporizador:*** La energía decrece a un ritmo lento pero constante durante el día, dificultando que el jugador simplemente se quede esperando a que surjan mejores misiones.
- ***Gestión:*** Cada misión aceptada requiere un pago inmediato de energía. El valor requerido varía dependiendo de la misión.
- ***Ciclos:*** La barra de energía está dividida en secciones. Cada vez que una de esas secciones se vacía por completo (por gasto pasivo o por hacer misiones) se completa un ciclo. Estos ciclos afectan a eventos pasivos, como la generación de ingresos por edificios.

### 3.2.2. Variables de gestión
**Opinión Pública:** La marca métrica global que determina la puntuación del jugador, y se muestra en todo momento en una barra en la parte superior de la pantalla. Representa la población total del Quackington DC dividida en 2 segmentos:
- ***Afines:*** Ciudadanos que han decidido apoyar al jugador. El objetivo del juego es conseguir un 50% de ciudadanos afines.
- ***Opositores:*** Ciudadanos activamente en contra del jugador. Estos requieren medidas específicas para ser convencidos, y reducen la satisfacción obtenida sus distritos.

**Satisfacción:** Cada distrito tiene un nivel de satisfacción independiente (del 0% al 100%). Este aumenta con al completar ciertas misiones de la zona o construir edificios de bienestar, y disminuye como resultado de acciones negativas contra el distrito. La satisfacción se puede ver en la pestaña de información de cada distrito.
- ***Conversión de votos:*** El porcentaje de satisfacción se traduce directamente en el porcentaje de vecinos del distrito *afines* al jugador (cada distrito tiene un número de población distinto).


**Corrupción:** Es una variable que representa el grado de corrupción del jugador. Esta se muestra de forma directa al jugador, en la pestaña del Mercado Negro. Esta valor aumenta cada vez que se lleva a cabo una *acción corrupta*, sea comprar mejoras en el Mercado Negro por ejemplo.
- ***Aumento de corrupción:*** Cada vez que se aumente el valor de la corrupción, se comprobará si el presidente es “pillado”, subiendo la posibilidad cuanto más corrupción tenga. Si esto ocurre, el presidente se verá envuelto en situaciones poco favorables, en las que perderá mucha satisfacción y dinero.
- ***Blanqueo:*** Para reducir el nivel de corrupción puedes pagar a la prensa en el mercado negro para conseguirlo. El precio de esta compra irá en aumento exponencial para obligar al jugador a poder siempre librarse de las consecuencias de las elecciones corruptas.

## 3.3. Misiones
A lo largo del día van surgiendo misiones sobre el mapa de la ciudad. Pinchar en una muestra un texto explicativo que resume la misión, además de enseñar el coste que esta tiene. Todas las misiones cuestan *energía*, y la mayoría cuestan también dinero u otros recursos. También se visualiza lo que la misión ofrece como recompensa, para que el jugador pueda recapacitar si le merece la pena la inversión.

Las misiones son elegidas aleatoriamente de una lista de misiones que varía dependiendo de la situación del jugador, si tiene demasiado dinero, pocos votos... 


Existen varios tipos distintos de misiones:
### 3.3.1. Misiones básicas
Las misiones básicas son una transacción sencilla: te proponen una situación y 2 opciones para resolverla. Cada una de las 2 opciones tendrá sus beneficios y consecuencias.
**Ejemplo:** *”Fútbol Gratis para Todos. El partido de la final de copa es de pago. Podrías usar fondos públicos para comprar los derechos y emitirlo en abierto. Es tirar el dinero, pero nadie se acordará de las listas de espera del hospital.” Podrás elegir si pagar los derechos para emitirlo en abierto o si intalar pantallas gigantes en las plazas para que los ciudadanos vayan a verlo*
### 3.3.2. Misiones de minijuegos
Las misiones de minijuegos presentan una pequeña tarea o desafío que debe superar el jugador para completar la misión. En caso de fallarlo, esta no dará recompensa. 
**Ejemplo:** *”¡Rápido! Se van a publicar unos documentos incriminantes, date prisa para censurarlos.” Muestra un minijuego estilo monkeyType.*

### 3.3.3. Misiones corruptas
Las misiones corruptas son menos comunes que el resto. Estas prometen una recompensa mucho mayor a las misiones básicas. A cambio, aceptar una misión corrupta subirá el nivel de *corrupción* general.

## 3.4. Eventos
Los eventos son misiones obligatorias. A lo largo del día y de forma aleatoria, aunque también surgen como respuesta a las acciones del jugador, aparecen eventos que frenan la acción y obligan al jugador a realizar una misión. Estas pueden ser de cualquier tipo: básicas, de minijuegos y corruptas.

## 3.5. Mercado Negro
En una pestaña en la parte inferior de la pantalla se encuentra el Mercado Negro. En él se pueden comprar ciertas mejoras que afectan a la jugabilidad como aumentar la energía del jugador. Existe también la opción de comprar a la prensa para reducir la corrupción, pero el precio aumenta exponencialmente con cada compra para evitar que el jugador nunca tenga que lidiar con las consecuencias de sus acciones.

## 3.6. Final del día
Debajo de la barra de energía se muestra el botón de “Terminar el Día”. Este puede ser pulsado por el jugador en cualquier momento (salvo en el último día) para finalizar el día si así quiere. Si aún le queda energía restante, se muestra un mensaje preguntando si de verdad quiere finalizar el día antes de tiempo, para así decidir si acabar el día o no.

Una vez se termina una jornada, se presenta un resumen de lo hecho durante el día como si fuera un reportaje sobre el presidente. También aparecen noticias relacionadas con la narrativa o acciones tomadas.

## 3.7. Distritos
Los distritos de la ciudad de Quackington DC cuentan con diferentes tipos de población:
| Distrito | Característica |
| :--- | :--- |
| **El Nido** | Habitado por las aves de la aristocracia.  |
| **Nueva Pradera** | Es el distrito que empieza con más población, abundan los animales de las praderas. |
| *Somosagua* | Lleno de agua y vida marina rebosante. |
| *Borrascal* | Perfecto para los animales más calurosos, los osos polares y pingüinos conviven en armonía. |
| *Sahar* | Condiciones de vida solo aptas para animales deserticos. |
| *Guinea* | Animales de la jungla son bienvenidos aquí. | ---

Cada distrito debe controlar su satisfacción, edificios y parámetros generales.

### 3.7.1. Edificios
Cada distrito tiene una cantidad específica de edificios que construir. Las opciones generales son las siguientes:
| Edificio | Coste de Construcción | Impacto Económico | Impacto Social |
| :--- | :--- | :--- | :--- |
| **Centro Comercial** | Muy Alto | Genera **Dinero** cada ciclo | Aumenta la **Satisfacción** |
| **Hotel de Lujo** | Alto | Genera **Dinero** cada ciclo |  Aumenta la **Satisfacción** |
| **Mega-Fábrica** | Alto | Genera mucho **Dinero** cada ciclo.  | Disminuye la **Satisfacción** |
| **Hospital** | Alto | Requiere de **Dinero** en cada ciclo | Aumenta la **Satisfacción** |
| **Cine** | Medio | Genera **Dinero** cada ciclo | Aumenta la **Satisfacción** |
|**Bloque de Viviendas**| Medio | Requiere de **Dinero** en cada ciclo | Sube un poco la **Satisfacción** |
| **Parque Municipal** | Bajo | Requiere de **Dinero** en cada ciclo | Aumenta la **Satisfacción**| ---

Además, existen edificios específicos de cada distrito que se consiguen al aumentar la satisfacción de estos a cierto nivel:
| Distrito | Edificio |
| :--- | :--- | 
| *El Nido* | **Copitolio** | 
| *Nueva Pradera* | **EnPAWire State** | 
| *Somosagua* | **Fábrica Mundo Jupi** |
| *Borrascal* | **Centro de Investigación**|
| *Sahar* | **Restaurante Bambi** |
| *Guinea* | **Teatro Magno** | 

### 3.7.2. Parámetros
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

4. **Horario Laboral / Jornada Laboral (Productividad):**
	 - **Pros:** Aumenta la efectividad de los edificios que generan dinero.
	 - **Contras:** Reduce la satisfacción y puede generar opositores.


# 4. Interfaz
## 4.1. Controles y plataformas
El juego está pensado para jugarse con teclado y ratón. Las mayoría de interacciones se realizan haciendo click con el ratón o moviendo el cursor por la pantalla, con muy pocas ocasiones en las que únicamente se pueda usar el teclado (siendo en algunos minijuegos o al escribir cosas). También cuenta con atajos de teclado para abrir pestañas como el menú de ajustes (ESC)

Debido a sus controles simples, existe la posibilidad de ser jugables tanto en dispositivos táctiles como con mandos, pero actualmente no son una prioridad.

## 4.2. HUD
### 4.2.1. HUD del mapa principal

<p align="center">
  <img width="700" alt="pantallaPrincipal" src="https://github.com/user-attachments/assets/45b65f7e-fdc5-4344-af28-d89faa40dff2">
  <br>
  <i>Boceto del HUD del mapa principal de Quackington DC</i>
</p>

En la pantalla principal se muestra el mapa de Quackington DC en el centro de la pantalla. Al pasar el cursor por un distrito, este se ilumina y queda seleccionado. Las misiones también surgen aquí.
En la parte superior se encuentra una barra dividida en 2 segmentos representando la opinión pública: los habitantes afines en verde y los opositores en rojo. 
En la esquina superior izquierda se muestra una imagen del protagonista.
En la zona derecha se muestra la barra de energía dividida en segmentos para representar los diferentes momentos del día. Debajo está el botón de “Terminar el Día”.
En la zona inferior izquierda se encuentra la cantidad de dinero que tiene el jugador en ese momento. En la zona derecha el botón para abrir el Mercado Negro y los ajustes. Por último, en el centro inferior se encuentra el nombre del distrito seleccionado (si no hay ninguno por el momento muestra el nombre de la ciudad).

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

La pantalla muestra un título de la misión o el evento, acompañado de un texto descriptivo y una imagen relacionada. En la parte inferior, se encuentran los elementos interactuables de la misión. Además, muestra las recompensas y costes que tiene (o puede tener) las distintas acciones del jugador. En la zona superior derecha hay un botón con una “X” para salir de la misión, pero los eventos no tienen esta opción.

Cuando se despliega este panel, este cubre el mapa principal y lo oscurece de fondo. La energía sigue pudiendo verse para que el jugador pueda recapacitar si le merece la pena gastarla, sin embargo, está no baja mientras haya una misión abierta.

<p align="center">
  <img width="700" alt="prototipoMision" src="https://github.com/user-attachments/assets/1adae534-1ea5-4a02-a133-2c2c21872dc2" />
  <br>
  <i>Prototipo del HUD de una misión en Sahar</i>
</p>

### 4.2.3. HUD de los distritos

El panel muestra una imágen del distrito escogido y una pequeña descripción de este. Además muestra el número de vecinos y la satisfacción debajo de la imagen. A la derecha, debajo del texto explicativo, se encuentra el panel de edificios construibles que se va rellenando con las construcciones que elija el jugador. Debajo de ese panel, los parámetros modificables del distrito. Estos dos últimos paneles empiezan bloqueados y se van desbloqueando con el paso de los días.

<p align="center">
  <img width="700" alt="prototipoDistrito" src="https://github.com/user-attachments/assets/cfd0993f-e7c4-48f7-9bd6-59d4d5253c96" />
  <br>
  <i>Prototipo del HUD del distrito de Borrascal</i>
</p>

### 4.2.4. HUD del Mercado Negro

Muestra una lista ordenada de nombres de mejoras o productos junto a una pequeña descripción de estos. A su derecha se muestra el precio y un botón de “Comprar”. Las mejoras o productos que se puedan comprar más de una vez también muestran el nivel o cantidad de compra que lleva hasta el momento. No todos los productos están disponibles, y algunos se muestran bloqueados. En la zona inferior se muestran la corrupción del jugador.

<p align="center">
  <img width="700" alt="prototipoMercado" src="https://github.com/user-attachments/assets/0bfd869d-7294-4b89-824f-c4751ed33ddb" />
  <br>
  <i>Prototipo del HUD del Mercado Negro</i>
</p>


### 4.2.5. HUD de pantalla de opciones

La pantalla de opciones permite al jugador configurar aspectos básicos del juego, principalmente relacionados con el audio y la navegación entre escenas.

En esta interfaz se incluyen:
- **Control de volumen de música:** mediante un deslizador que ajusta el nivel de la música de fondo.
- **Control de efectos de sonido (SFX):** permite regular el volumen de los sonidos asociados a acciones y eventos del juego.
- **Botón de retorno:** permite volver a la escena anterior desde la que se accedió al menú de opciones.
- **Botón de guardar:** permite que los cambios de sonido tengan efecto y se guarden los cambios

La pantalla está diseñada como un panel superpuesto o escena independiente, manteniendo coherencia visual con el resto de la interfaz del juego. Su función principal es ofrecer al jugador una forma rápida y accesible de ajustar la experiencia audiovisual sin interrumpir significativamente el flujo de la partida.



## 4.3. Audio

El proyecto cuenta con un sistema de audio centralizado mediante un **AudioManager**, encargado de gestionar música y efectos de sonido.

Entre sus funciones se incluyen:
- reproducción de música por escena,
- control de volumen de música y efectos,
- cambio dinámico de pista,
- reutilización de configuraciones de audio.


# 5. Mundo del juego
## 5.1. Personajes
### 5.1.1. Presidente
El protagonista del juego: Donald J. Duck, el presidente pato. Es un pato blanco con plumas amarillas en la cabeza y una corbata. *En un futuro, puede existir la opción de tener más presidentes desbloqueables.*

<img width="100" alt="Protagonista Pato" src="https://github.com/user-attachments/assets/e7bc0c12-45c8-4c63-8b11-6a5e42160929"/>
<br clear="left"/>


### 5.1.2. Secretaria
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
La estética de **Lame Duck** combina un estilo caricaturesco y satírico con una presentación visual clara y diferenciada por escenas.

El proyecto utiliza:
- **Arte ilustrado y animado** para personajes, fondos, escenas y presentación general,
- **Iconografía visual específica** para botones, misiones, edificios y elementos interactivos,
- Una línea visual exagerada y expresiva, coherente con el tono político-humorístico del juego.

La dirección artística busca reforzar tanto la legibilidad de la interfaz como la identidad cómica del mundo.

## 7. Experiencia de juego
La experiencia de juego en Lame Duck está diseñada para transmitir al jugador una sensación constante de presión, improvisación y cálculo político. A lo largo de cada jornada, el jugador debe reaccionar rápidamente a las misiones que aparecen en el mapa, decidir en qué distritos intervenir y gestionar con cuidado recursos limitados como el dinero, la energía y la corrupción. 

Esta dinámica busca generar una mezcla de estrategia y urgencia, en la que cada decisión puede aportar beneficios inmediatos, pero también consecuencias negativas a medio plazo. Al mismo tiempo, el tono satírico y exagerado del juego convierte esa presión en una experiencia más ligera y humorística, haciendo que el jugador se sienta dentro de una campaña política caótica, absurda y oportunista, donde lo importante no es gobernar bien, sino mantener una buena imagen ante la ciudad.

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

---

# 1. Informe de contribución  
## Jun Daniel Wang
Trabajo realizado:
- Diseño estructura del mapa, distritos y edificios
- Diseño lógica del mapa, distritos y edificios
- Creación del mapa con sus distritos y sus edificios
- Diseño de la escena districtScene:
	- Lógica de los parametros de cada distrito
 	- Lógica de compra-venta de los edificios
  	- Visualización de edificios y variables de cada distrito
- Diseño de la escena districtStoreScene:
  	- Lógica de compra de edificios
- Diseño de la escena missionScene:
  	- Visualización de las misiones y sus opciones   
- SummaryDayScene
  	- Visualización de todas las acciones ocurridas en el día
- Diseño de las UI: footerUI y topUI

## Manuel del Caño Rodríguez
Trabajo realizado:
- Diseño de plantillas de distrito y misiones
	- Responsibidad de botones variados
 	- Animación notificación de misiones
  	- Audio de interfaces
- Diseño minijuego plinko
- Diseño de las escenas: blackMarketScene y tutorialScene.
	- Lógica de compra en el Black Market
	- Productos del Black Market
 	- Lógica del tutorial
    - Diseño gráfico del tutorial
- Diseño de las UI: batteryUI, confirmationUI, dayUI, endDayBtnUI, marketFooterUI
	- Botón de Terminar el Día
    - Pantalla de confirmación de saltar el día
 	- Lógica del botón del Mercado Negro	
- Diseño de la página web del videojuego
- Diseño de las escenas de victoria y derrota

## Pedro Tobalina Navarro
Trabajo realizado:
- Seletor de misiones y eventos:
  - Lógica de braquets de recursos diarios
  - Diseño e implementación de prioridades de misiones
  - Diseño e implementación de prioridades de recursos
  - Diseño e implementación de sistema semi aleatorio de seleccion de tipos de misiones y eventos
  - Diseño e implementación de sistema de adjudicación de distritos a las misiones y eventos
  - Diseño e implementación de sistema de parse de json de las misiones y eventos
  - Diseño e implementación de sistema de adjudicación de imagen a las misiones y eventos
  - Diseño e implementación de sistema anti repetición de misiones y eventos
  - Diseño e implementación de los minijuegos en el sistema de misiones
- Desarrollo de cada una de las 206 misiones y eventos diferentes
- Diseño e implmentacion de sistema de recogida de decisiones diarias para el resumen del día
- Diseño de la lógica de cambio de día
- Diseño e implementación del sistema económico de los distritos en función de sus atributos variables.
- Diseño e implementación minijuego memory

## Safia Boufera
Trabajo realizado:
- Diseño del mapa
- Tiled del mapa
- Diseño assets de personajes
- Diseño assets escenas de distritos
- Diseño minijuego wordSearch
  
## Viola Pieruccetti
Trabajo realizado:
- Diseño assets de personajes, iconos y pantallas de videojuego
- Diseño minijuego whacAMole
- Diseño de la escena: introScene
 - Diseño pantalla de carga
 - Diseño pantalla inicio

## Zheng Li Fu
Trabajo realizado:
- Producción de la música y su uso
- Implementación de clases para gestionar la música y el audio del juego
- Diseño minijuego monkeyType
- Diseño minijuego wordle
- Diseño de las escenas: configurationScene y pauseMenuScene
- Diseño estructura a seguir para implementar los minijuegos
- Cambios Quality Of Life, e.g. algunas HotKeys dentro del juego
- Parte de la documentación del GDD
