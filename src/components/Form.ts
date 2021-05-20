import SimpleComponent from '../lib/SimpleComponents'
import FormTemplate from '../templates/Form.html'

export default SimpleComponent.create({
    name: 'x-form',
    template: FormTemplate,
    lifeCycle: {
        mounted: (template: ShadowRoot) => {
            template.querySelector('button')?.addEventListener('click', () => {
                console.log('hola')
            })
        }
    }
})
