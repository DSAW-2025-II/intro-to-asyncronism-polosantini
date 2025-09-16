class OverworldEvent {
    constructor({map, event}){
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        });

        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        };
        document.addEventListener("PersonStandComplete", completeHandler);

    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    textMessage(resolve) {

        if(this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["ash"].direction);
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"))
    }

    changeMap(resolve) {

        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
            resolve();

            sceneTransition.fadeOut();
        })
    }

    dictionary(resolve) {

        const diccionario = document.getElementById("diccionario");
        diccionario.innerHTML = "";

        diccionario.style.display = "flex";

        if (this.event.typeName) {
            this.cargarPokemones(this.event.typeName, diccionario);
        }
        
        const cerrar = (e) => {
            if (e.key === "Enter" || e.key === "Escape") {
                diccionario.style.display = "none";
                document.removeEventListener("keydown", cerrar);
                document.removeEventListener("keydown", scrollHandler);
                resolve(); 
            }
        };

        const scrollHandler = (e) => {
            if (e.key === "ArrowDown") {
            diccionario.scrollTop += 30; // baja 30px
            } 
            else if (e.key === "ArrowUp") {
                diccionario.scrollTop -= 30; // sube 30px
            }
        };

        document.querySelector(".dpad-abajo").addEventListener("click", () => {
            diccionario.scrollTop += window.CONFIG.SCROLL_SPEED || 45;
        })

        document.querySelector(".dpad-arriba").addEventListener("click", () => {
            diccionario.scrollTop -= window.CONFIG.SCROLL_SPEED || 45;
        })

        document.querySelector(".boton-b").addEventListener("click", () => {
            diccionario.style.display = "none";
            document.removeEventListener("keydown", cerrar);
            resolve(); 
        });

        document.addEventListener("keydown", cerrar);
        document.addEventListener("keydown", scrollHandler);
    }

    async cargarPokemones(tipo, container) {
        try {
            container.innerHTML = "";
            const POKEMON_URL = window.CONFIG.POKEMON_URL;

            const respuesta = await fetch(`${POKEMON_URL}/type/${tipo}`);
            const datos = await respuesta.json();

            const pokemones = datos.pokemon;

            for (let i = 0; i < pokemones.length; i++) {
                
                const pokemonRespuesta = await fetch(pokemones[i].pokemon.url);

                const pokemonDatos = await pokemonRespuesta.json();

                const sprite = pokemonDatos.sprites.versions['generation-v']?.['black-white']?.animated?.front_default
                || pokemonDatos.sprites.other?.showdown?.front_default
                || pokemonDatos.sprites.versions['generation-v']?.['black-white']?.front_default
                || pokemonDatos.sprites.versions['generation-iv']?.['platinum']?.front_default
                || pokemonDatos.sprites.versions['generation-iii']?.['emerald']?.front_default
                || pokemonDatos.sprites.versions['generation-ii']?.['gold']?.front_default
                || pokemonDatos.sprites.versions['generation-i']?.['red-blue']?.front_default
                || pokemonDatos.sprites.versions['generation-vii']?.icons?.front_default
                || pokemonDatos.sprites.versions['generation-viii']?.icons?.front_default
                || pokemonDatos.sprites.front_default
                || pokemonDatos.sprites.other?.home?.front_default
                || pokemonDatos.sprites.other?.['official-artwork']?.front_default;

                const pokemon = document.createElement("div");
                pokemon.innerHTML = `
                    <div class="pokemon">
                        <div class="divisor-principal ${tipo}">
                            <div class="divisor-superior">
                                <div class="nombre-pokemon">
                                    <p>${pokemonDatos.name}</p>
                                </div>
                                <div class="tipo-pokemon">
                                    <p>${tipo}</p>
                                </div>
                            </div>
                            
                            <div class="divisor-imagen">
                                <div class="imagen">
                                    <img src="${sprite}">
                                </div>
                                <div class="divisor-rasgos">
                                    <p>#${pokemonDatos.id.toString().padStart(3, '0')}</p>
                                    <p>Altura: ${pokemonDatos.height}m </p>
                                    <p>Peso: ${pokemonDatos.weight}kg </p>
                                </div>
                            </div>

                            <div class="divisor-stats">
                                <table>
                                    <tr><td>Puntos de Salud</td><td>${pokemonDatos.stats[0].base_stat}</td></tr>
                                    <tr><td>Ataque</td><td>${pokemonDatos.stats[1].base_stat}</td></tr>
                                    <tr><td>Defensa</td><td>${pokemonDatos.stats[2].base_stat}</td></tr>
                                    <tr><td>Ataque Especial</td><td>${pokemonDatos.stats[3].base_stat}</td></tr>
                                    <tr><td>Defensa Especial</td><td>${pokemonDatos.stats[4].base_stat}</td></tr>
                                    <tr><td>Velocidad</td><td>${pokemonDatos.stats[5].base_stat}</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(pokemon);
            }

        } catch (err) {
            container.innerHTML = "<p>Uy, no cargaron los Pokemones, joda mani</p>"
        }
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve);
        })
    }
}