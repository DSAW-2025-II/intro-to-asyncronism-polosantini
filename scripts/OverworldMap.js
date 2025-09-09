
class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
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
                            { type: "textMessage", text: "Ya te dije todo lo que necesitas saber"},
                            { type: "textMessage", text: "No joda mani"},

                        ]
                    }
                ]
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
        }
    },

    MapaAll: {
        lowerSrc: "images/maps/all/map-fanatic-all.png",
        gameObjects: {
            ash: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(3),
            }),
            fanaticAll : new Person({
                isPlayerControlled: false,
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                src: "images/characters/all/pokemon-fanatic-all.png"
            })
        },
        walls: {}
    }
}