export class Main extends HTMLElement {
    constructor() {
        super()
    }

    static get tag() {
        return 'x-main'
    }

    getDefaultText() {
        return "Hello, World!"
    }
}

customElements.define(Main.tag, Main)