import {Injectable} from '@angular/core';
import {ChatMessage} from '../../model/chat';

@Injectable()

export class ChatService {

  private messageCollection: Array<ChatMessage>;

  constructor() {
    this.messageCollection = [];
  }

  getMessageCollection() {
    return this.messageCollection;
  }

  setMessageCollection(msg: ChatMessage) {
    this.messageCollection.push(msg);
  }
}
