import { Main } from '../components/Main'

describe('Basic component main', () => {
    it('resolve defautl text', () => {
        const main = new Main()
        const textExpected = 'Hello, World!'
        expect(main.getDefaultText()).toEqual(textExpected)
    })
})