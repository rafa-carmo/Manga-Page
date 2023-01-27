interface PushNotificationProps {
  recipientId: string
  url: string
  p256dh: string
  auth: string
}

export class PushNotification {
  private props: PushNotificationProps

  constructor(props: PushNotificationProps) {
    this.props = props
  }

  public get url(): string {
    return this.props.url
  }

  public set url(url: string) {
    this.props.url = url
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public get p256dh(): string {
    return this.props.p256dh
  }
  public set p256dh(p256dh: string) {
    this.props.p256dh = p256dh
  }

  public get auth(): string {
    return this.props.auth
  }
  public set auth(auth) {
    this.props.auth = auth
  }
}
