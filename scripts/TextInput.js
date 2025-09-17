class TextInput {

    constructor({ text, onComplete }) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
        this.inputElement = null;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TextInput");

        this.element.innerHTML = (`
            <p class="TextInput_p"></p>
            <input type="text" class="TextInput_field" placeholder="Escribe el nombre o ID del Pokemon que deseas buscar">
            <button class="TextInput_button">▼</button>
        `);

        this.inputElement = this.element.querySelector(".TextInput_field");

        this.revealingText = new RevealingText ({
            element: this.element.querySelector(".TextInput_p"),
            text: this.text
        })

        this.element.querySelector("button").addEventListener("click", () => {
            if (this.inputElement.value.trim() !== "") {
                this.done();
            }
        });

        const handleConfirm = () => {
            if (this.inputElement.value.trim() !== "") {
                this.done();
            }
        };

        this.actionListener = new KeypressListener("Enter", handleConfirm);

        this.handleA = handleConfirm;
        document.querySelector(".boton-a").addEventListener("click", this.handleA);
    }

    done() {
        
        if(this.revealingText && !this.revealingText.isDone) {
            this.revealingText.warpToDone();
            return;
        }

        const valorBusqueda = this.inputElement.value.trim();
        this.element.remove();
        this.actionListener.unbind();

        if (this.handleA) {
            document.querySelector(".boton-a").removeEventListener("click", this.handleA);
            this.handleA = null;
        }

        this.onComplete(valorBusqueda);
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        if (this.revealingText){
            this.revealingText.init();
        }      
    }
}