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

        document.querySelector(".boton-a").addEventListener("click", () => {
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

        //Cutscene de inicio del juego
        this.map.startCutscene([
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "walk", direction: "down"},
            {who: "ash", type: "stand", direction: "right"},
            {who: "npcA", type: "walk", direction: "left"},
            {who: "npcA", type: "walk", direction: "left"},
            {who: "npcA", type: "walk", direction: "left"},
            {type: "textMessage", text: "Bienvenido a esta Pokédex, oprime el botón A o Enter para continuar en un diálogo"},
            {type: "textMessage", text: "No te molestes en saber mi nombre, los nombres son solo para amigos", faceHero: "npcA"},
            {type: "textMessage", text: "Veo que eres alguien nuevo", faceHero: "npcA"},
            {type: "textMessage", text: "Para moverte utiliza el D-Pad (botones en cruz) que están en la página", faceHero: "npcA"},
            {type: "textMessage", text: "O simplemente las teclas WASD o las flechas en tu teclado", faceHero: "npcA"},
            {type: "textMessage", text: "Para interactuar con alguien oprime Enter o el botón A", faceHero: "npcA"},
            {type: "textMessage", text: "A la derecha del mapa hay un pad con un intento de diseñar el cuantificador universal ", faceHero: "npcA"},
            {type: "textMessage", text: "Nos vemos ahí", faceHero: "npcA"},
            {who: "npcA", type: "stand", direction: "left", time: 800},
        ])

    }


}