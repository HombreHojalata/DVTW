/*
* PARTES DE UN PRODUCTO:
* -id: Nombre interno por el que el juego lo reconocerá.
* -name: Nombre del producto.
* -desc: Descripción del producto. Importante no excederse (no más de 1800 caracteres).
* -image: Nombre de la imagen que muestra (en la carpeta assets/sprites/marketIcons). Importante importarlas en el 'boot.js'.
* -price: Precio base del producto. Se irá actualizando con las cantidad de compras.
* -limit: Unidades disponibles del producto, para que no tenga límite poner a 'Infinity'.
* -priceStep: Aumento de precio por compra del producto. Se escribe el operador (* o +) seguido del valor, todo entre comillas.
* -effect: Efecto del producto hace al ser comprado. Seguramente haya que crear una función en 'blackmarket.js' para esto.
*
*/

export const PRODUCTS = [
    {
        id: 'news',
        name: 'SOBORNAR A LA PRENSA',
        desc: 'A cambio de un generoso donativos, los períodicos pueden hablar bien de tu persona, reduciendo un 20% el nivel de corrupción percibida por el pueblo.',
        image: 'news_icon',
        price: 50000,
        limit: Infinity,
        priceStep: '*1.55',
        effect: (player) => {
            const current = player.getCorruption();
            const reduction = current * 0.2;
            player.updateCorruption(-reduction);
        }
    },
    {
        id: 'hotel',
        name: 'HOTELES DE PAGO GENERAL',
        desc: 'Al desviar fondos de la ciudad a la construcción de hoteles privados, el coste de estos se reduce un 15%.',
        image: 'hotel_icon',
        price: 12750,
        limit: 2,
        priceStep: '+250',
        effect: (player) => { 
            player.addHotelDiscount(0.15);
        }
    },
    {
        id: 'votes',
        name: 'PUCHERAZO',
        desc: 'Manipulación a gran escala. +5% de satisfacción en TODOS los distritos. (+30 de Corrupción)',
        image: 'votes_icon',
        price: 660000,
        limit: 1,
        priceStep: '+0',
        effect: (player, gameManager) => {
            const map = gameManager.getMap();
            map.districtList.forEach(district => {
                district.updateSatisfaction(5);
            })
            player.updateCorruption(30);
        }
    },
    {
        id: 'fakeBuild',
        name: 'PRIVATIZACIÓN DE CONTRUCTORAS',
        desc: 'Controlar la ciudad empieza por contralar la econonmía. Todos los edificios ahora general un 5% más de recursos. (+12 Corrupción)',
        image: 'bridge_icon',
        price: 120000,
        limit: 2,
        priceStep: '+90000',
        effect: (player) => {
            player.addGlobalIncomeMultiplier(0.05);
            player.updateCorruption(12);
        }
    },
    {
        id: 'moveAtRandom',
        name: 'MIGRACIÓN FORZADA',
        desc: 'Desalojas a 10% de los vecinos de un distrito aleatorio para moverlos a otro elegido al azar. (+20 Corrupción)',
        image: 'planet_icon',
        price: 0,
        limit: Infinity,
        priceStep: '+0',
        effect: (player, gameManager) => {
            const districts = gameManager.getMap().districtList;
            const source = Phaser.Utils.Array.GetRandom(districts);
            const target = Phaser.Utils.Array.GetRandom(districts.filter(d => d !== source));
            const movedPeople = source.getPopulation() * 0.1;
            source.updatePopulation(-movedPeople);
            target.updatePopulation(movedPeople);
            player.updateCorruption(20);
        }
    },
    {
        id: 'coffee',
        name: 'CAFÉ DE CONTRABANDO',
        desc: '¿Quieres una ayudita? Tomesé una cafecito. Las misiones darán el doble de beneficios, pero a costa de que estas cobrarán exigiran el doble de gastos.',
        image: 'coffee_icon',
        price: 100300,
        limit: 1,
        priceStep: '+0',
        effect: (player) => {
            player.updateEnergy(40);
            player.activateMissionMultiplier(2);
        }
    },
    {
        id: 'wash',
        name: 'LAVADO DE ACTIVOS',
        desc: 'Convierte tu mala fama en billetes. Ganas 1.000$ por cada punto de Corrupción que tengas.',
        image: 'evil_icon',
        price: 0,
        limit: 3,
        priceStep: '+0',
        effect: (player) => {
            const corruption = player.getCorruption();
            const profit = corruption * 1000;
            player.updateMoney(profit);
        }
    }
];

/*
PRODUCTOS ANTIGUOS:
        {
        id: 'fakeBuild',
        name: 'OBRA PÚBLICA FANTASMA',
        desc: 'Adjudica un presupuesto para un puente que nunca se construirá. Ganar 40.000$ inmediatmanete pero te lloverán las críticas. (+25 Corrupción)',
        image: 'bridge_icon',
        price: 0,
        limit: 2,
        priceStep: '+0',
        effect: (player) => {
            player.updateMoney(40000);
            player.updateCorruption(25);
        }
    },
    {
        id: 'coffee',
        name: 'CAFÉ DE CONTRABANDO', // OJO: ESTA ESTÁ MUY VERDE
        desc: '¿Bajo de energía? Tomesé una cafecito. Tegna cuidado: es adictivo, y el precio sube rápido.',
        image: 'coffee_icon',
        price: 8500,
        limit: Infinity,
        priceStep: '+2300',
        effect: (player) => {
            player.updateEnergy(40);
        }
    },
    {
        id: 'wash',
        name: 'LAVADO DE ACTIVOS',
        desc: 'Convierte tu mala fama en billetes. Ganas 1.000$ por cada punto de Corrupción que tengas.',
        image: 'evil_icon',
        price: 0,
        limit: 3,
        priceStep: '+0',
        effect: (player) => {
            const corruption = player.getCorruption();
            const profit = corruption * 1000;
            player.updateMoney(profit);
        }
    }
*/