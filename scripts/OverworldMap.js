
class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces;
        this.walls = config.walls || {};
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5)-cameraPerson.x, utils.withGrid(6)-cameraPerson.y);
    }

    isSpaceTaken(currentX,currentY,direction) {
        const {x,y} = utils.nextPosition(currentX,currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;

            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        for (let i = 0; i<events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
    }

    checkForActionCutscene() {
        const ash = this.gameObjects["ash"];
        const nextCoords = utils.nextPosition(ash.x, ash.y, ash.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene() {
        const ash = this.gameObjects["ash"];
        const match = this.cutsceneSpaces[ `${ash.x},${ash.y}`];
        
        if(!this.isCutscenePlaying && match) {
            this.startCutscene( match[0].events )
        }
    }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y){
        delete this.walls[`${x},${y}`]
    }

    moveWall(wasX,wasY,direction) {
        this.removeWall(wasX,wasY);
        const{x,y} = utils.nextPosition(wasX,wasY,direction);
        this.addWall(x,y);
    }
}

window.OverworldMaps = {

    MapaPrincipal: {
        lowerSrc: "images/maps/map.png",
        gameObjects: {
            ash: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(3),
            }),
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(7),
                src: "images/characters/all/pokemon-fanatic-all.png",
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 3000}
                    
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Ya te dije todo lo que necesitas saber", faceHero: "npcA"}, //REVISAR EL FACE HERO, VIDEO RPG 9 MIN 28:39
                            { type: "textMessage", text: "No joda mani", faceHero: "npcA"},
                        ]
                    }
                ],

            }),
            npcB: new Person({
                x: utils.withGrid(23),
                y: utils.withGrid(1),
                src: "images/characters/all/pokemon-fanatic-all.png",
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 3000},
                    
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Soy el sabio de las frases", faceHero: "npcB"},
                            { type: "textMessage", text: "\"tarea no desplegada... D:\" - Pablo Tamayo González", faceHero: "npcB"},
                            { type: "textMessage", text: "\" Error: \"innerText\" not defined\" - Simon Martínez García", faceHero: "npcB"},
                            { type: "textMessage", text: `“gracias por tanto, perdón por tan poco 🙏🏽”  - Carlos Vargas Escobar`, faceHero: "npcB"},
                            { type: "textMessage", text: `“Bogotá es un estado mental”  - Martín Polo Santini`, faceHero: "npcB"},
                            { type: "textMessage", text: `“No sean como el man este del trabajo”  - Juan David Murillo`, faceHero: "npcB"},
                            { type: "textMessage", text: `“Yo y ChatGPT clutcheando Desarrollo a las 11 de la noche”  - Todos`, faceHero: "npcB"},
                            { type: "textMessage", text: `“muchas graxias afición, esta es para vosotros. SIUUUUUUU”  - Cristiano Ronaldo`, faceHero: "npcB"},
                            { type: "textMessage", text: `“Linux Tips: Always remove the french language pack: sudo rm -fr ./*”  - Kinnaird McQuade`, faceHero: "npcB"},
                            { type: "textMessage", text: `“muchas graxias afición, esta es para vosotros. SIUUUUUUU”  - Cristiano Ronaldo`, faceHero: "npcB"},
                        ]
                    }
                ],

            }),
        },
        walls: {
            //Límites del mapa
            [utils.asGridCoord(0,0)]: true,
            [utils.asGridCoord(1,0)]: true,
            [utils.asGridCoord(2,0)]: true,
            [utils.asGridCoord(3,0)]: true,
            [utils.asGridCoord(4,0)]: true,
            [utils.asGridCoord(5,0)]: true,
            [utils.asGridCoord(6,0)]: true,
            [utils.asGridCoord(7,0)]: true,
            [utils.asGridCoord(8,0)]: true,
            [utils.asGridCoord(9,0)]: true,
            [utils.asGridCoord(10,0)]: true,
            [utils.asGridCoord(11,0)]: true,
            [utils.asGridCoord(12,0)]: true,
            [utils.asGridCoord(13,0)]: true,
            [utils.asGridCoord(14,0)]: true,
            [utils.asGridCoord(15,0)]: true,
            [utils.asGridCoord(16,0)]: true,
            [utils.asGridCoord(17,0)]: true,
            [utils.asGridCoord(18,0)]: true,
            [utils.asGridCoord(19,0)]: true,
            [utils.asGridCoord(20,0)]: true,
            [utils.asGridCoord(21,0)]: true,
            [utils.asGridCoord(22,0)]: true,
            [utils.asGridCoord(23,0)]: true,
            [utils.asGridCoord(24,0)]: true,

            [utils.asGridCoord(1,9)]: true,
            [utils.asGridCoord(2,9)]: true,
            [utils.asGridCoord(3,9)]: true,
            [utils.asGridCoord(4,9)]: true,
            [utils.asGridCoord(5,9)]: true,
            [utils.asGridCoord(6,9)]: true,
            [utils.asGridCoord(7,9)]: true,
            [utils.asGridCoord(8,9)]: true,
            [utils.asGridCoord(9,9)]: true,
            [utils.asGridCoord(10,9)]: true,
            [utils.asGridCoord(11,9)]: true,
            [utils.asGridCoord(12,9)]: true,
            [utils.asGridCoord(13,9)]: true,
            [utils.asGridCoord(14,9)]: true,
            [utils.asGridCoord(15,9)]: true,
            [utils.asGridCoord(16,9)]: true,
            [utils.asGridCoord(17,9)]: true,
            [utils.asGridCoord(18,9)]: true,
            [utils.asGridCoord(19,9)]: true,
            [utils.asGridCoord(20,9)]: true,
            [utils.asGridCoord(21,9)]: true,
            [utils.asGridCoord(22,9)]: true,
            [utils.asGridCoord(23,9)]: true,
            [utils.asGridCoord(24,9)]: true,

            [utils.asGridCoord(0,1)]: true,
            [utils.asGridCoord(0,2)]: true,
            [utils.asGridCoord(0,3)]: true,
            [utils.asGridCoord(0,4)]: true,
            [utils.asGridCoord(0,5)]: true,
            [utils.asGridCoord(0,6)]: true,
            [utils.asGridCoord(0,7)]: true,
            [utils.asGridCoord(0,8)]: true,

            [utils.asGridCoord(25,1)]: true,
            [utils.asGridCoord(25,2)]: true,
            [utils.asGridCoord(25,3)]: true,
            [utils.asGridCoord(25,4)]: true,
            [utils.asGridCoord(25,5)]: true,
            [utils.asGridCoord(25,6)]: true,
            [utils.asGridCoord(25,7)]: true,
            [utils.asGridCoord(25,8)]: true,


            //Árboles
            [utils.asGridCoord(4,4)]: true,
            [utils.asGridCoord(2,7)]: true,
            [utils.asGridCoord(16,4)]: true,
            [utils.asGridCoord(21,5)]: true,
            [utils.asGridCoord(23,7)]: true,

            //Rocas
            [utils.asGridCoord(15,2)]: true,
            [utils.asGridCoord(12,4)]: true,
            [utils.asGridCoord(19,5)]: true,
            [utils.asGridCoord(9,7)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(4,8)]: [
                {
                    events: [
                        { who: "npcA", type: "walk", direction: "right"},
                        { who: "npcA", type: "walk", direction: "down"},
                        { who: "npcA", type: "stand", direction: "left", time: 500},
                        { type: "textMessage", text: "Vete de mi vista"},
                        { who: "npcA", type: "walk", direction: "up"},
                        { who: "npcA", type: "walk", direction: "left"},

                        { who: "ash", type: "walk", direction: "right"},
                        { who: "ash", type: "walk", direction: "up"},
                    ]
                }
            ],

            //Mapa All
            [utils.asGridCoord(23,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaAll"}
                    ]
                }
            ],

            //Mapa Fighting
            [utils.asGridCoord(4,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaFighting"}
                    ]
                }
            ],

            //Mapa Flying
            [utils.asGridCoord(6,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaFlying"}
                    ]
                }
            ],

            //Mapa Poison
            [utils.asGridCoord(8,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaPoison"}
                    ]
                }
            ],

            //Mapa Ground
            [utils.asGridCoord(10,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaGround"}
                    ]
                }
            ],

            //Mapa Rock
            [utils.asGridCoord(12,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaRock"}
                    ]
                }
            ],

            //Mapa Bug
            [utils.asGridCoord(14,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaBug"}
                    ]
                }
            ],

            //Mapa Ghost
            [utils.asGridCoord(16,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaGhost"}
                    ]
                }
            ],

            //Mapa Steel
            [utils.asGridCoord(18,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaSteel"}
                    ]
                }
            ],

            //Mapa Fire
            [utils.asGridCoord(20,2)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaFire"}
                    ]
                }
            ],

            //Mapa Water
            [utils.asGridCoord(4,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaWater"}
                    ]
                }
            ],

            //Mapa Grass
            [utils.asGridCoord(6,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaGrass"}
                    ]
                }
            ],

            //Mapa Electric
            [utils.asGridCoord(8,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaElectric"}
                    ]
                }
            ],

            //Mapa Psychic
            [utils.asGridCoord(10,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaPsychic"}
                    ]
                }
            ],

            //Mapa Ice
            [utils.asGridCoord(12,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaIce"}
                    ]
                }
            ],

            //Mapa Dragon
            [utils.asGridCoord(14,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaDragon"}
                    ]
                }
            ],

            //Mapa Dark
            [utils.asGridCoord(16,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaDark"}
                    ]
                }
            ],

            //Mapa Fairy
            [utils.asGridCoord(18,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaFairy"}
                    ]
                }
            ],

            //Mapa Normal
            [utils.asGridCoord(20,5)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaNormal"}
                    ]
                }
            ]
        }
    },

    MapaAll: createMap("all", [
        { type: "textMessage", text: "Cuando caminas por un pad entras a un mapa como este, como te habrás dado cuenta hay muchos en el mapa", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Para salir de estos mapas camina hacia la parte inferior, y serás transportado a la isla principal", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Cada uno tiene un símbolo (o un intento de símbolo) del tipo de Pokemon del que se quiere conocer", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Perdona al artista que los diseñó, no tiene la vena del diseño", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Cada tipo de Pokemon tiene un fanático (extremo) a ese tipo, ten cuidado con ellos", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Ellos te mostrarán una ventana con los Pokemones de su tipo", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Puedes hacer scroll dentro del diccionario de cada uno con los botones superior e inferior del D-Pad", faceHero: `fanaticAll` },
        { type: "textMessage", text: "O con las flechitas de arriba y abajo o el mouse, si te resulta más cómodo", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Para salir de ese diccionario utiliza el botón B a la derecha de este canvas, o Enter o Esc en tu teclado", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Queda mejor que descubras casi todo por tu cuenta", faceHero: `fanaticAll` },
        { type: "textMessage", text: "Buena suerte", faceHero: `fanaticAll` },
    ]),

    MapaFighting: createMap("fighting", [
        { type: "textMessage", text: "¿Quién rayos eres y porque has venido acá?", faceHero: `fanaticFighting` },
        { type: "textMessage", text: "No se si sabías, pero el 98% de los problemas se resuelven a traques", faceHero: `fanaticFighting` },
        { type: "textMessage", text: "Por desgracia ocupas el 97%", faceHero: `fanaticFighting` },
        { type: "textMessage", text: "A menos que quieras echarle una revisada a mi conocimiento", faceHero: `fanaticFighting` },
        { type: "textMessage", text: "Mira mis Pokemones de lucha, y vete", faceHero: `fanaticFighting` },
        { type: "dictionary", typeName: "fighting" },
    ]),

    MapaFlying: createMap("flying", [
        { type: "textMessage", text: "¡Ahhh! Otro ser terrenal atascado en la gravedad...", faceHero: "fanaticFlying" },
        { type: "textMessage", text: "No me hables si no sabes diferenciar un Pidgeot de un Swellow.", faceHero: "fanaticFlying" },
        { type: "textMessage", text: "Los tipo Volador están por encima... literalmente.", faceHero: "fanaticFlying" },
        { type: "textMessage", text: "Yo no, ya que no nací con alas. Aun así estoy por encima de ti", faceHero: "fanaticFlying" },
        { type: "textMessage", text: "Observa mis Pokemones del cielo y sueña con estar a nuestra altura.", faceHero: "fanaticFlying" },
        { type: "dictionary", typeName: "flying" },
    ]),

    MapaPoison: createMap("poison", [
        { type: "textMessage", text: "El veneno se queda corto cuando se compara con tu suspiración", faceHero: "fanaticPoison" },
        { type: "textMessage", text: "Solo no te acerques mucho, o te enveneno", faceHero: "fanaticPoison" },
        { type: "textMessage", text: "Mira mis Pokemones tipo poison, solo dime si puedes sobrevivir a esta experiencia", faceHero: "fanaticPoison" },
        { type: "dictionary", typeName: "poison" }
    ]),

    MapaGround: createMap("ground", [
        { type: "textMessage", text: "Escucha a la tierra, y le dirá a tus pies hacia donde caminar", faceHero: "fanaticGround" },
        { type: "textMessage", text: "Los truenos callan cuando el suelo ruge", faceHero: "fanaticGround" },
        { type: "textMessage", text: "La tierra hace que los débiles no soporten su propio peso", faceHero: "fanaticGround" },
        { type: "textMessage", text: "Mira mis Pokemones tipo ground, y recuerda que aquello que sale del suelo vuelve a él", faceHero: "fanaticGround" },
        { type: "dictionary", typeName: "ground" }
    ]),

    MapaRock: createMap("rock", [
    { type: "textMessage", text: "El tiempo crea las rocas, las hace fuertes", faceHero: "fanaticRock" },
    { type: "textMessage", text: "La vida es de soportar y ganar", faceHero: "fanaticRock" },
    { type: "textMessage", text: "Todo a su tiempo, la velocidad es para aquellos que no soportan el éxito", faceHero: "fanaticRock" },
    { type: "textMessage", text: "Admira a mis Pokemones tipo rock", faceHero: "fanaticRock" },
    { type: "dictionary", typeName: "rock" }
    ]),

    MapaBug: createMap("bug", [
        { type: "textMessage", text: "Gaaaaawwwwwwhhhhhhh", faceHero: "fanaticBug" },
        { type: "textMessage", text: "¡Por fín! Alguien me visita.", faceHero: "fanaticBug" },
        { type: "textMessage", text: "¿Te gustan los bichos? A mi también", faceHero: "fanaticBug" },
        { type: "textMessage", text: "Nos subestiman, pero ¡los Pokemones bicho tienen mas poder del que la gente cree!", faceHero: "fanaticBug" },
        { type: "textMessage", text: "Mira mis Pokemones tipo bug, no seas repelente (xD)", faceHero: "fanaticBug" },
        { type: "dictionary", typeName: "bug" }
    ]),

    MapaGhost: createMap("ghost", [
        { type: "textMessage", text: "....", faceHero: "fanaticGhost" },
        { type: "textMessage", text: "........", faceHero: "fanaticGhost" },
        { type: "textMessage", text: "Tu alma huyendo es mi alimento, ¿no sientes este escalofrío?", faceHero: "fanaticGhost" },
        { type: "textMessage", text: "Mira mis Pokemones tipo ghost. A ver si encuentras una nueva alma", faceHero: "fanaticGhost" },
        { type: "dictionary", typeName: "ghost" }
    ]),

    MapaSteel: createMap("steel", [
        { type: "textMessage", text: "¿Sentir? ¿Qué clase de integral es esa?", faceHero: "fanaticSteel" },
        { type: "textMessage", text: "El acero es la máxima de la eficiencia", faceHero: "fanaticSteel" },
        { type: "textMessage", text: "La debilidad es una variable eliminada. La convertí en una constante y la derivé", faceHero: "fanaticSteel" },
        { type: "textMessage", text: "Mira mis Pokemon tipo steel. Solo verás frialdad y precisión", faceHero: "fanaticSteel" },
        { type: "dictionary", typeName: "steel" }
    ]),

    MapaFire: createMap("fire", [
        { type: "textMessage", text: "UFFFFFFF, alguien está que arde", faceHero: "fanaticFire" },
        { type: "textMessage", text: "¡Por supuesto que soy yo! ¿Qué pensabas?", faceHero: "fanaticFire" },
        { type: "textMessage", text: "Si no sientes el calor, eres un pechofrío", faceHero: "fanaticFire" },
        { type: "textMessage", text: "Como esos troncos de la Selección Colombia", faceHero: "fanaticFire" },
        { type: "textMessage", text: "Mira mis Pokemones tipo fire, pero sin miedo", faceHero: "fanaticFire" },
        { type: "textMessage", text: "El que se asusta se quema xD", faceHero: "fanaticFire" },
        { type: "dictionary", typeName: "fire" }
    ]),

    MapaWater: createMap("water", [
        { type: "textMessage", text: "El agua calma o arrasa", faceHero: "fanaticWater" },
        { type: "textMessage", text: "Todo depende de quien la controle", faceHero: "fanaticWater" },
        { type: "textMessage", text: "Pero fluye.... o no.....", faceHero: "fanaticWater" },
        { type: "textMessage", text: "Sumérgete en mi conocimiento sobre Pokemones tipo water. Solo no te ahogues", faceHero: "fanaticWater" },
        { type: "dictionary", typeName: "water" }
    ]),

    MapaGrass: createMap("grass", [
        { type: "textMessage", text: "La naturaleza es sabia y yo soy su reflejo", faceHero: "fanaticGrass" },
        { type: "textMessage", text: "Nunca subestimes el poder de las plantas", faceHero: "fanaticGrass" },
        { type: "textMessage", text: "Siembra bien, y cosecharás el éxito", faceHero: "fanaticGrass" },
        { type: "textMessage", text: "Mis Pokemon tipo grass son fuertes como los robles", faceHero: "fanaticGrass" },
        { type: "dictionary", typeName: "grass" }
    ]),

    MapaElectric: createMap("electric", [
        { type: "textMessage", text: "eeeeEEEEEEllllleeeCCCTTTRIIIIIIciiiiiTTYYYYYY", faceHero: "fanaticElectric" },
        { type: "textMessage", text: "La rapidez de la batalla depende de la intensidad de su chispa", faceHero: "fanaticElectric" },
        { type: "textMessage", text: "Ni Tesla dominaba tan bien la electricidad como yo lo hago", faceHero: "fanaticElectric" },
        { type: "textMessage", text: "Conoce mis Pokemones tipo electric, y llevate una descarga de conocimiento", faceHero: "fanaticElectric" },
        { type: "dictionary", typeName: "electric" }
    ]),

    MapaPsychic: createMap("psychic", [
        { type: "textMessage", text: "Mi campo de batalla es la mente", faceHero: "fanaticPsychic" },
        { type: "textMessage", text: "Si no la dominas, nunca ganarás", faceHero: "fanaticPsychic" },
        { type: "textMessage", text: "Mi tipo puede ver más allá de lo visible", faceHero: "fanaticPsychic" },
        { type: "textMessage", text: "El poder psíquico es puro", faceHero: "fanaticPsychic" },
        { type: "textMessage", text: "Conoce mis Pokemones tipo psychic", faceHero: "fanaticPsychic" },
        { type: "dictionary", typeName: "psychic" }
    ]),

    MapaIce: createMap("ice", [
        { type: "textMessage", text: "El frío está mas presente que el calor", faceHero: "fanaticIce" },
        { type: "textMessage", text: "Por algo la gente lo prefiere", faceHero: "fanaticIce" },
        { type: "textMessage", text: "¿Sientes frío? Ese soy yo", faceHero: "fanaticIce" },
        { type: "textMessage", text: "Mis Pokemon tipo ice no solo congelan, sino dominan", faceHero: "fanaticIce" },
        { type: "dictionary", typeName: "ice" }
    ]),

    MapaDragon: createMap("dragon", [
        { type: "textMessage", text: "¡Sólo los más fuertes merecen enfrentarse a los dragones!", faceHero: "fanaticDragon" },
        { type: "textMessage", text: "Los dragones no perdonan ni olvidan", faceHero: "fanaticDragon" },
        { type: "textMessage", text: "Respétanos o arde en el fuego de nuestra ira", faceHero: "fanaticDragon" },
        { type: "textMessage", text: "Mis Pokemones tipo dragon huelen el miedo, conócelos", faceHero: "fanaticDragon" },
        { type: "dictionary", typeName: "dragon" }
    ]),

    MapaDark: createMap("dark", [
        { type: "textMessage", text: "La oscuridad es poder, y yo soy su amo", faceHero: "fanaticDark" },
        { type: "textMessage", text: "La noche es nuestra casa, incluso el día alberga oscuridad", faceHero: "fanaticDark" },
        { type: "textMessage", text: "No hay luz para los débiles, solo existen las sombras", faceHero: "fanaticDark" },
        { type: "textMessage", text: "Mis Pokemones tipo dark te nublarán la vista, o te la abrirán", faceHero: "fanaticDark" },
        { type: "dictionary", typeName: "dark" }
    ]),

    MapaFairy: createMap("fairy", [
        { type: "textMessage", text: "¡Oh! Que alegría verte aquí, querido visitante", faceHero: "fanaticFairy" },
        { type: "textMessage", text: "Solo un corazón puro entiende el poder de nosotros", faceHero: "fanaticFairy" },
        { type: "textMessage", text: "No nos desafíes o te enfrentarás a un encantamiento eterno", faceHero: "fanaticFairy" },
        { type: "textMessage", text: "¡Brilla con nosotros y deja que mis Pokemones tipo fairy te envuelvan con su magia!", faceHero: "fanaticFairy" },
        { type: "textMessage", text: "(A Martín le dió un espasmo programando este diálogo)", faceHero: "fanaticFairy" },
        { type: "dictionary", typeName: "fairy" }
    ]),

    MapaNormal: createMap("normal", [
        { type: "textMessage", text: "No soy especial, pero no soy debil tampoco", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "La normalidad es la base de todo", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "Por algo existe la distribución normal, no la distribución electric", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "Uffff, ¡y la t-Student!", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "Y la Chi-cuadrado", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "y la gamma....", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "y el Teorema Central del Límite....", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "Agh, soy tan simple que no puede alardear de nada, solo hablo de estadística como un NPC", faceHero: "fanaticNormal" },
        { type: "textMessage", text: "Emmmmm.... Mis Pokemones tipo normal son el reflejo de que la simpleza no es el sinónimo de facilidad", faceHero: "fanaticNormal" },
        { type: "dictionary", typeName: "normal" }
    ]), 
}

function createMap(entrada, eventos) {
    const nombreCapitalizado = entrada.charAt(0).toUpperCase() + entrada.slice(1);
    const nombreNPC = `fanatic${nombreCapitalizado}`;

    return {
        lowerSrc: `images/maps/${entrada}/map-fanatic-${entrada}.png`,
        gameObjects: {
            ash: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(8),
            }),
            [nombreNPC]: new Person({
                isPlayerControlled: false,
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                src: `images/characters/${entrada}/pokemon-fanatic-${entrada}.png`,
                talking: [
                    {
                        events: eventos
                    }
                ],
            })
        },
        walls: {
            [utils.asGridCoord(0,0)]: true,
            [utils.asGridCoord(1,0)]: true,
            [utils.asGridCoord(2,0)]: true,
            [utils.asGridCoord(3,0)]: true,
            [utils.asGridCoord(4,0)]: true,

            [utils.asGridCoord(0,0)]: true,
            [utils.asGridCoord(0,1)]: true,
            [utils.asGridCoord(0,2)]: true,
            [utils.asGridCoord(0,3)]: true,
            [utils.asGridCoord(0,4)]: true,
            [utils.asGridCoord(0,5)]: true,
            [utils.asGridCoord(0,6)]: true,
            [utils.asGridCoord(0,7)]: true,
            [utils.asGridCoord(0,8)]: true,
            [utils.asGridCoord(0,9)]: true,
            [utils.asGridCoord(1,10)]: true,

            [utils.asGridCoord(4,0)]: true,
            [utils.asGridCoord(4,1)]: true,
            [utils.asGridCoord(4,2)]: true,
            [utils.asGridCoord(4,3)]: true,
            [utils.asGridCoord(4,4)]: true,
            [utils.asGridCoord(4,5)]: true,
            [utils.asGridCoord(4,6)]: true,
            [utils.asGridCoord(4,7)]: true,
            [utils.asGridCoord(4,8)]: true,
            [utils.asGridCoord(4,9)]: true,
            [utils.asGridCoord(3,10)]: true,

            [utils.asGridCoord(2,11)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(2,10)]: [
                {
                    events: [
                        { type: "changeMap", map: "MapaPrincipal"}
                    ]
                }
            ],
        }
    };
}