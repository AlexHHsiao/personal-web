import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../service/chat/chat.service';
import {ChatMessage} from '../../model/chat';
import {ApiAiClient} from 'api-ai-javascript';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msg: string;
  sendAllowed: boolean;
  client: any;

  constructor(private chatService: ChatService) {
    this.msg = '';
    this.sendAllowed = true;
    this.client = new ApiAiClient({accessToken: '3dc3c8020ecb4cb0983e2a9d2719807d'});

    this.client.textRequest('hello').then((response) => {
      console.log('answer', response);
    }).catch((error) => {
      console.log(error);
    });

    const chatMessage = new ChatMessage(
      'This is Alex bot. I can answer you ang question you want about Alex. How can I help you?',
      false, new Date());
    this.chatService.setMessageCollection(chatMessage);

    const chatMessage1 = new ChatMessage(
      'This is Alex bot.',
      false, new Date());
    this.chatService.setMessageCollection(chatMessage1);

    const chatMessage2 = new ChatMessage(
      'This',
      false, new Date());
    this.chatService.setMessageCollection(chatMessage2);
  }

  ngOnInit() {
  }

  sendMsg() {
    if (this.msg.trim().length !== 0) {

      if (this.sendAllowed) {
        this.sendAllowed = false;
        const chatMessage = new ChatMessage(this.msg, true, new Date());
        this.chatService.setMessageCollection(chatMessage);
        this.responseToUser(this.msg);

        this.msg = '';
      } else {
        // cannot send tell user pls
      }
    }
  }

  getAllMsg() {
    return this.chatService.getMessageCollection();
  }

  responseToUser(userMsg: string) {
    if (!this.sendAllowed) {


      this.sendAllowed = true;
    } else {
      alert('bug here??????');
    }
  }
}
