
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

    MapaAll: {
        lowerSrc: "images/maps/all/map-fanatic-all.png",
        gameObjects: {
            ash: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(8),
            }),
            fanaticAll : new Person({
                isPlayerControlled: false,
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                src: "images/characters/all/pokemon-fanatic-all.png"
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
            ]
        }
    },

    MapaFighting: createMap("fighting", [
        { type: "textMessage", text: "¡El tipo Lucha es fuerte contra Normal, Hielo, Roca!", faceHero: `fanaticFighting` }
    ]),

    MapaFlying: createMap("flying", [
        { type: "textMessage", text: "¡El tipo Volador es efectivo contra Lucha, Bicho, Planta!", faceHero: "fanaticFlying" }
    ]),

    MapaPoison: createMap("poison", [
        { type: "textMessage", text: "¡El tipo Veneno es fuerte contra Hada, Planta!", faceHero: "fanaticPoison" }
    ]),

    MapaGround: createMap("ground", [
        { type: "textMessage", text: "¡El tipo Tierra es efectivo contra Eléctrico, Fuego, Veneno, Roca, Acero!", faceHero: "fanaticGround" }
    ]),

    MapaRock: createMap("rock", [
        { type: "textMessage", text: "¡El tipo Roca es fuerte contra Bicho, Fuego, Hielo, Volador!", faceHero: "fanaticRock" }
    ]),

    MapaBug: createMap("bug", [
        { type: "textMessage", text: "¡El tipo Bicho es efectivo contra Planta, Psíquico, Siniestro!", faceHero: "fanaticBug" }
    ]),

    MapaGhost: createMap("ghost", [
        { type: "textMessage", text: "¡El tipo Fantasma es fuerte contra Fantasma, Psíquico!", faceHero: "fanaticGhost" }
    ]),

    MapaSteel: createMap("steel", [
        { type: "textMessage", text: "¡El tipo Acero es efectivo contra Hada, Hielo, Roca!", faceHero: "fanaticSteel" }
    ]),

    MapaFire: createMap("fire", [
        { type: "textMessage", text: "¡El tipo Fuego es fuerte contra Acero, Bicho, Hielo, Planta!", faceHero: "fanaticFire" }
    ]),

    MapaWater: createMap("water", [
        { type: "textMessage", text: "¡El tipo Agua es efectivo contra Fuego, Tierra, Roca!", faceHero: "fanaticWater" }
    ]),

    MapaGrass: createMap("grass", [
        { type: "textMessage", text: "¡El tipo Planta es fuerte contra Agua, Roca, Tierra!", faceHero: "fanaticGrass" }
    ]),

    MapaElectric: createMap("electric", [
        { type: "textMessage", text: "¡El tipo Eléctrico es efectivo contra Agua, Volador!", faceHero: "fanaticElectric" }
    ]),

    MapaPsychic: createMap("psychic", [
        { type: "textMessage", text: "¡El tipo Psíquico es fuerte contra Lucha, Veneno!", faceHero: "fanaticPsychic" }
    ]),

    MapaIce: createMap("ice", [
        { type: "textMessage", text: "¡El tipo Hielo es efectivo contra Dragón, Planta, Tierra, Volador!", faceHero: "fanaticIce" }
    ]),

    MapaDragon: createMap("dragon", [
        { type: "textMessage", text: "¡El tipo Dragón es fuerte contra Dragón!", faceHero: "fanaticDragon" }
    ]),

    MapaDark: createMap("dark", [
        { type: "textMessage", text: "¡El tipo Siniestro es efectivo contra Fantasma, Psíquico!", faceHero: "fanaticDark" }
    ]),

    MapaFairy: createMap("fairy", [
        { type: "textMessage", text: "¡El tipo Hada es fuerte contra Dragón, Lucha, Siniestro!", faceHero: "fanaticFairy" }
    ]),

    MapaNormal: createMap("normal", [
        { type: "textMessage", text: "¡El tipo Normal no es muy efectivo contra otros tipos, pero tiene amplia cobertura!", faceHero: "fanaticNormal" }
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