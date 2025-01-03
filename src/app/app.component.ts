import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { Word, words } from '../data';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  private words: Word[] = words
  private index = 0;

  public word$ = new BehaviorSubject<Word>(this.words[this.index]);


  public ngOnInit() {
    this.subscription.add(
      fromEvent(document, 'click').subscribe(() => this.next())
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private next() {
    if(this.index === this.words.length - 1) {
      this.index = 0
    } else {
      this.index++
    }

    this.word$.next(this.words[this.index])
  }
}
