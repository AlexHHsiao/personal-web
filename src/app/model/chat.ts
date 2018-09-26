export class ChatMessage {
  text: string;
  fromUser: boolean;
  ts: Date;

  constructor(text, fromUser, ts) {
    this.text = text;
    this.fromUser = fromUser;
    this.ts = ts;
  }
}
