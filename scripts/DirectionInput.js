class DirectionInput {
    constructor() {
        this.heldDirections = [];

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }
    }

    get direction(){
        return this.heldDirections[0];
    }
    
    init() {

        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
        });

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });

        //Event listeners del D-Pad
        document.querySelectorAll(".dpad button").forEach(button => {
            
            //Obteniendo la dirección por medio de los custom data attribute de cada botón del D-Pad
            const dir = button.dataset.direction;

            //Event listener para eventos con el mouse
            button.addEventListener("mousedown", () => {
                //Guarda las direcciones de movimiento que no estén en heldDirections, si es -1 esta dirección no está en el array
                if (this.heldDirections.indexOf(dir) === -1) {
                    //Agrega dir al inicio del arreglo, dándole prioridad a la dirección mas reciente
                    this.heldDirections.unshift(dir);
                }
            });

            //Detecta cuando se deja de oprimir el mouse
            button.addEventListener("mouseup", () => {
                //Busca la posición de dir en heldDirection y guarda el índice en index
                const index = this.heldDirections.indexOf(dir);
                //Verifica que la dirección esté en el arreglo
                if (index > -1) {
                    //Esta elimina el elemento en la posición index, quitando la dirección que el usuario dejó de presionar
                    this.heldDirections.splice(index, 1);
                }
            });

            //Los dos anteriores pero para eventos en táctil
            button.addEventListener("touchstart", (e) => {
                e.preventDefault();
                if (this.heldDirections.indexOf(dir) === -1) {
                    this.heldDirections.unshift(dir);
                }
            });
            button.addEventListener("touchend", (e) => {
                e.preventDefault();
                const index = this.heldDirections.indexOf(dir);
                if (index > -1) {
                    this.heldDirections.splice(index, 1);
                }
            });

        });
        
    }
}