class Overworld {

    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop(){
        const step = () => {

            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            
            const cameraPerson = this.map.gameObjects.ash;

            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map
                })
            })

            this.map.drawLowerImage(this.ctx, cameraPerson);

            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);

            });

            requestAnimationFrame(() => {
                step();
            })

        }  
        step();       
    }

    bindActionInput() {
        new KeypressListener("Enter", () => {
            this.map.checkForActionCutscene();
        })
    }

    bindAshPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "ash") {
                this.map.checkForFootstepCutscene()
            }
        })
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }

    init() {
        this.startMap(window.OverworldMaps.MapaPrincipal);
        
        this.bindActionInput();
        this.bindAshPositionCheck();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction;

        this.startGameLoop();

    
        this.map.startCutscene([
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "stand", direction: "right"},
            {who: "npcA", type: "walk", direction: "left"},
            {who: "npcA", type: "walk", direction: "left"},
            {who: "npcA", type: "walk", direction: "left"},
            {type: "textMessage", text: "Bienvenido a esta Pokédex"},
            {type: "textMessage", text: "No te molestes en saber mi nombre, los nombres son solo para amigos", faceHero: "npcA"},
            {type: "textMessage", text: "Dentro de este mapa principal encontrarás varios portales", faceHero: "npcA"},
            {type: "textMessage", text: "Cada uno se refiere a un tipo de Pokémon diferente", faceHero: "npcA"},
            {type: "textMessage", text: "Dentro de cada uno te transportarás a un mapa diferente", faceHero: "npcA"},
            {type: "textMessage", text: "En cada mapa encontrarás un fanático de ese tipo de Pokémon", faceHero: "npcA"},
            {type: "textMessage", text: "Ellos te enseñarán sobre ese tipo", faceHero: "npcA"},
            {type: "textMessage", text: "Si quieres salir de ese mapa, dirígete hacia el punto inferior del mismo", faceHero: "npcA"},
            {type: "textMessage", text: "Volverás acá"},
            {type: "textMessage", text: "Ten cuidado", faceHero: "npcA"},
            {who: "npcA", type: "stand", direction: "left", time: 800},
        ])

    }


}