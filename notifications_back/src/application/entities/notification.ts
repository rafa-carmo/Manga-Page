import { randomUUID } from 'crypto'
import { Content } from './content'

export interface NotificationProps {
  content: Content
  readAt?: Date | null
  createAt?: Date
  mangaSlug: string
  chapter: string
  recipientId: string
}

export class Notification {
  private _id: string
  private props: NotificationProps

  constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date()
    }
  }

  public get id(): string {
    return this._id
  }

  public set mangaSlug(mangaSlug: string) {
    this.props.mangaSlug = mangaSlug
  }

  public get mangaSlug(): string {
    return this.props.mangaSlug
  }

  public get chapter(): string {
    return this.props.chapter
  }

  public set chapter(chapter: string) {
    this.props.chapter = chapter
  }

  public get createAt(): Date | undefined {
    return this.props.createAt ?? new Date()
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public read() {
    this.props.readAt = new Date()
  }

  public unread() {
    this.props.readAt = null
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt
  }

  public set content(content: Content) {
    this.props.content = content
  }

  public get content(): Content {
    return this.props.content
  }
}
