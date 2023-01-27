export class ContentLengthSize extends Error {
  constructor() {
    super('Content must have more than 5 characters and less 240')
  }
}
