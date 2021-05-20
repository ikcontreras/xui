interface SimpleAttributes { attributes: Array<string>; changed: Function }
interface SimpleStates { created?: Function; updated?: Function; mounted?: Function; unmounted?: Function; }
interface SimpleElement { name: string; template: string, attributeChanged?: SimpleAttributes; lifeCycle?: SimpleStates }

export default class SimpleComponent {
    static create({ name, template, attributeChanged, lifeCycle }: SimpleElement): CustomElementConstructor {
        class NewElement extends HTMLElement {
            shadow: ShadowRoot

            constructor () {
                super()
                const templateContainer = document.createElement('div')

                templateContainer.innerHTML = template

                const templateElement = templateContainer.querySelector('template')
                const styleElement = templateContainer.querySelector('style')

                this.shadow = this.attachShadow({ mode: 'open' })
                
                if (styleElement) this.shadow.appendChild(styleElement)

                if (templateElement) {
                    this.shadow.appendChild(document.importNode(templateElement.content, true))
                }

                if (lifeCycle && lifeCycle.created) lifeCycle.created(this.shadow)
            }

            static get observedAttributes() {
                if (attributeChanged && attributeChanged.attributes) {
                    return attributeChanged.attributes
                }else {
                    return ['']
                }
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                if (attributeChanged) attributeChanged.changed(name, oldValue, newValue)
            }

            connectedCallback() {
                if(lifeCycle && lifeCycle.mounted) lifeCycle.mounted(this.shadow)
            }

            adoptedCallback() {
                if(lifeCycle && lifeCycle.updated) lifeCycle.updated(this.shadow)
            }

            disconnectedCallback() {
                if(lifeCycle && lifeCycle.unmounted) lifeCycle.unmounted(this.shadow)
            }
        }

        customElements.define(name, NewElement)

        return NewElement
    }
}
