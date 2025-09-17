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

    textInput(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["ash"].direction);
        }

        const input = new TextInput({
            text:this.event.text || "Escriba el nombre o el ID del Pokemon que desea buscar",
            onComplete: (searchValue) => {
                this.diccionario(resolve, searchValue);
            }
        });
        input.init(document.querySelector(".game-container"));
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

        //Obtener el Id del div para hacer DOM manipulation
        const diccionario = document.getElementById("diccionario");

        //Limpieza del diccionario por si acaso
        diccionario.innerHTML = "";

        //Hacer visible al diccionario
        diccionario.style.display = "flex";

        //Verificar que si exista el typename y ejecutar el evento
        if (this.event.typeName) {
            this.cargarPokemonesTipo(this.event.typeName, diccionario);
        }
        
        //Event listeners para los botones del gamepad y los del teclado
        const cerrar = (e) => {
            if (e.key === "Enter" || e.key === "Escape") {
                diccionario.style.display = "none";
                document.removeEventListener("keydown", cerrar);
                document.removeEventListener("keydown", scrollHandler);
                resolve(); 
            }
        };

        //Manejo del scroll para las flechas del computador
        const scrollHandler = (e) => {
            if (e.key === "ArrowDown") {
            diccionario.scrollTop += 30; // baja 30px
            } 
            else if (e.key === "ArrowUp") {
                diccionario.scrollTop -= 30; // sube 30px
            }
        };

        //Manejo del scroll con los botones del D-Pad
        const dpadAbajo = document.querySelector(".dpad-abajo");
        const dpadArriba = document.querySelector(".dpad-arriba");

        dpadAbajo.addEventListener("click", () => {
            diccionario.scrollTop += window.CONFIG.SCROLL_SPEED || 45;
        });

        dpadAbajo.addEventListener("touchstart", (e) => {
            e.preventDefault();
            diccionario.scrollTop += window.CONFIG.SCROLL_SPEED || 45;
        });

        dpadArriba.addEventListener("click", () => {
            diccionario.scrollTop -= window.CONFIG.SCROLL_SPEED || 45;
        });

        dpadArriba.addEventListener("touchstart", (e) => {
            e.preventDefault();
            diccionario.scrollTop -= window.CONFIG.SCROLL_SPEED || 45;
        });

        //Event listener para el botón B, para cerrar el diccionario y agregar o remover otros event listeners
        document.querySelector(".boton-b").addEventListener("click", () => {
            diccionario.style.display = "none";
            document.removeEventListener("keydown", cerrar);
            resolve(); 
        });

        document.addEventListener("keydown", cerrar);
        document.addEventListener("keydown", scrollHandler);
    }

    diccionario(resolve, searchTerm = null) {

        //Obtener el ID del div de diccionario para hacer el DOM manipulation
        const diccionario = document.getElementById("diccionario");

        //Haciendo el innerHTMl nulo por si en llamadas anteriores de diccionario se quedó algún Pokemon en el div
        diccionario.innerHTML = "";

        //Hacer visible a diccionario   
        diccionario.style.display = "flex";

        //Llamando la función que obtiene los Pokemones individuales si existe searchterm
        if (searchTerm) {
            this.obtenerPokemon(searchTerm, diccionario);
        }
        
        //Event listeners para los botones del gamepad y los del teclado
        const cerrar = (e) => {
            if (e.key === "Enter" || e.key === "Escape") {
                diccionario.style.display = "none";
                diccionario.innerHTML ="";
                document.removeEventListener("keydown", cerrar);
                document.removeEventListener("keydown", scrollHandler);
                resolve(); 
            }
        };

        //Manejo del scroll para las flechas del computador
        const scrollHandler = (e) => {
            if (e.key === "ArrowDown") {
                diccionario.scrollTop += 30;
            } 
            else if (e.key === "ArrowUp") {
                diccionario.scrollTop -= 30;
            } 
        
        };

        //Manejo del scroll con los botones del D-Pad
        const dpadAbajo = document.querySelector(".dpad-abajo");
        const dpadArriba = document.querySelector(".dpad-arriba");

        dpadAbajo.addEventListener("click", () => {
            diccionario.scrollTop += window.CONFIG.SCROLL_SPEED || 45;
        });

        dpadAbajo.addEventListener("touchstart", (e) => {
            e.preventDefault();
            diccionario.scrollTop += window.CONFIG.SCROLL_SPEED || 45;
        });

        dpadArriba.addEventListener("click", () => {
            diccionario.scrollTop -= window.CONFIG.SCROLL_SPEED || 45;
        });

        dpadArriba.addEventListener("touchstart", (e) => {
            e.preventDefault();
            diccionario.scrollTop -= window.CONFIG.SCROLL_SPEED || 45;
        });

        //Event listener para el botón B, para cerrar el diccionario y agregar o remover otros event listeners
        document.querySelector(".boton-b").addEventListener("click", () => {
            diccionario.style.display = "none";
            diccionario.innerHTML ="";
            document.removeEventListener("keydown", cerrar);
            document.removeEventListener("keydown", scrollHandler);
            document.querySelector(".dpad-abajo").removeEventListener("click", this);
            document.querySelector(".dpad-arriba").removeEventListener("click", this);
            resolve(); 
        });

        document.addEventListener("keydown", cerrar);
        document.addEventListener("keydown", scrollHandler);
    }

    async cargarPokemonesTipo(tipo, container) {

        //Try-Catch para hacer manejo de errores
        try {
            //Limpieza del container
            container.innerHTML = "";

            //Asignar la URL por medio de la variable de entorno
            const POKEMON_URL = window.CONFIG.POKEMON_URL;

            //Fetch de los Pokemones basándose en su tipo
            const respuesta = await fetch(`${POKEMON_URL}/type/${tipo}`);

            //Si no hay respuesta exitosa se lanza un código de estado para su manejo
            if (!respuesta.ok) {
                throw new Error(`Error, status: ${respuesta.status}`);
            }

            //Parseo a JSON de los datos obtenidos por respuesta
            const datos = await respuesta.json();

            //Se guardan los objetos pokemon de datos en pokemones
            const pokemones = datos.pokemon;

            //For que recorre pokemones y consume su información uno a uno
            for (let i = 0; i < pokemones.length; i++) {
                
                //Fetch de los recursos externos de ese Pokemon
                const pokemonRespuesta = await fetch(pokemones[i].pokemon.url);

                //Parseo del fetch a JSON
                const pokemonDatos = await pokemonRespuesta.json();

                //Or que decide el sprite a mostrarse, basándose en la jerarquía visual que quise (Si, le pedí a Chat que me lo escribiera, me dio pereza)
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

                //Construir una tarjeta Pokemon a partir de los elementos consumidos del mismo
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

                                    <img src="${sprite}" onerror="this.src='images/pokemon/error-fetch-gif.gif';" alt="${pokemonDatos.name}">

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

                //Manipulación DOM para sumar la tarjeta al diccionario
                container.appendChild(pokemon);
            }

        //Manejo de erroes y sus mensajes
        } catch (err) {
            //Verificar si fetch falla o si no
            if (err.name === "TypeError") {
                container.innerHTML = `
                    <p>Problemas de conexión. Inténtalo más tarde</p>
                `;
                console.error(err);
            } else {
                container.innerHTML = `
                    <p>Joa, ocurrió un error al cargar: ${err.message}</p>
                `;
                console.error(err);
            }
        }
    }

    async obtenerPokemon(dato, container) {

        //Try-Catch para el manejo de errores
        try {
            //Limpieza del container
            container.innerHTML = "";

            //Validación para que si se ponen 0 antes del valor el no se pase como error, sino que se convierta a su número sin los 0 anteriores (el mismo número)
            let valor = dato.toString().trim().toLowerCase();

            if (!isNaN(valor)) { //Verifica que el valor sea un número
                valor = parseInt(valor, 10).toString(); //Convierte el string a un número base 10, y lo reparsea a stiring
            }

            //Asignar la URL de consumo usando la variable de entorno
            const POKEMON_URL = window.CONFIG.POKEMON_URL;
            
            //Const para guardar la variable en función del valor ya depurado que se quiera buscar
            const urlPokemon = `${POKEMON_URL}/pokemon/${valor}`;

            //Fetch de la variable const definida previamente
            const respuesta = await fetch(urlPokemon);

            //Si no hay respuesta exitosa se lanza un código de estado para su manejo
            if (!respuesta.ok) {
                throw new Error(`Error status: ${respuesta.status}`);
            }
            
            //Parseo a JSON de los datos obtenidos
            const pokemonDatos = await respuesta.json();

            //Obtener los tipos del Pokémon a partir de pokemonDatos y un map
            const tipos = pokemonDatos.types.map(t => t.type.name);

            //El mismo OR explicado en cargarPokemonesTipo
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
            
            //Creación del div para la tarjeta del Pokemon
            const pokemon = document.createElement("div");
            pokemon.innerHTML = `
                <div class="pokemon">
                    <div class="divisor-principal ${tipos[0]}" style="width:95%; height:95%;">
                        <div class="divisor-superior">
                            <div class="nombre-pokemon">
                                <p>${pokemonDatos.name}</p>
                            </div>
                            <div class="tipo-pokemon">
                                <p>${tipos.join(", ")}</p>
                            </div>
                        </div>
                        
                        <div class="divisor-imagen">
                            <div class="imagen">
                                <img src="${sprite}" onerror="this.src='images/pokemon/error-fetch-gif.gif';" alt="${pokemonDatos.name}">
                            </div>
                            <div class="divisor-rasgos">
                                <p>#${pokemonDatos.id.toString().padStart(3, '0')}</p>
                                <p>Altura: ${pokemonDatos.height / 10}m</p>
                                <p>Peso: ${pokemonDatos.weight / 10}kg</p>
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

            //Manipulación DOM del container para incluir la tarjeta del Pokemon
            container.appendChild(pokemon);
            
        } catch (err) {

            container.innerHTML ="";

            //Verificar si fetch falla o si no
            if (err.name === "TypeError") {
                container.innerHTML = `
                    <p>Problemas de conexión. Inténtalo más tarde</p>
                `;
                console.error(err);
            } else if (err.message.includes("404")) { //Verificar si el usuario pidió un recurso que no existe
                container.innerHTML = `
                    <div class="error-message">
                        <p>papi escriba bien, no existe "${dato}" como pokemon o ese id</p>
                        <p class="error-detail">${err.message}</p>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <p>Joa, ocurrió un error al cargar: ${err.message}</p>
                `;
                console.error(err);
            }
        }    
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve);
        })
    }
}