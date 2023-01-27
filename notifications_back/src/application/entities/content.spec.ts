import { Content } from './content'
import { ContentLengthSize } from './errors/content-length'

describe('Notification Content', () => {
  test('it should be able to create a Notification content', () => {
    expect(new Content('Este é um teste valido')).toBeTruthy()
  })
  test('it should not be able to create a Notification with less then 5 characters', () => {
    expect(() => new Content('test')).toThrow(ContentLengthSize)
  })
  test('it should not be able to create a Notification with more then 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow(ContentLengthSize)
  })
})
