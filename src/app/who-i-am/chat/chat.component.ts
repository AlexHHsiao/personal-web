import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ChatService} from '../../service/chat/chat.service';
import {ChatMessage} from '../../model/chat';
import {ApiAiClient} from 'api-ai-javascript';
import {AlertService} from '../../service/alert/alert.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatContent') chatContent: ElementRef;

  msg: string;
  sendAllowed: boolean;
  client: any;

  constructor(private chatService: ChatService, private renderer: Renderer2, private alertService: AlertService) {
    this.msg = '';
    this.sendAllowed = true;
    this.client = new ApiAiClient({accessToken: 'f4d5b532c03c4c8183d98c605d202d9b'});

    const chatMessage = new ChatMessage(
      'This is Alex bot. I can answer you ang question you want about Alex. How can I help you?',
      false, new Date());
    this.chatService.setMessageCollection(chatMessage);
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
        setTimeout(() => {
          this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
        }, 100);
      } else {
        this.alertService.warn('Please wait ... I need sometime to response~~');
      }
    }
  }

  getAllMsg() {
    return this.chatService.getMessageCollection();
  }

  responseToUser(userMsg: string) {
    if (!this.sendAllowed) {

      this.client.textRequest(userMsg).then((response) => {
        const chatMessage = new ChatMessage(
          response.result.fulfillment.speech,
          false, new Date());
        this.chatService.setMessageCollection(chatMessage);

        this.sendAllowed = true;

        setTimeout(() => {
          this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
        }, 100);
      }).catch((error) => {
        const chatMessage = new ChatMessage(
          'Sorry. I cannot answer your question now due to serve error!',
          false, new Date());
        this.chatService.setMessageCollection(chatMessage);

        this.sendAllowed = true;

        setTimeout(() => {
          this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
        }, 100);
      });
    } else {
      alert('Something is wrong here!!!');
    }
  }
}
