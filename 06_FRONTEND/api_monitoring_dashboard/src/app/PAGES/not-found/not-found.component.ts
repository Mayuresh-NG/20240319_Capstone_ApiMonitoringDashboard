import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.createStars();
  }

  createStars(): void {
    const body = document.body;
    setInterval(() => {
      this.createStar(body);
    }, 100);
  }

  createStar(body: HTMLElement): void {
    const right = Math.random() * 500;
    const top = Math.random() * window.screen.height;
    const star = document.createElement("div");
    star.classList.add("star");
    body.appendChild(star);
    setInterval(() => {
      this.runStar(star, right);
    }, 10);
    star.style.top = top + "px";
  }

  runStar(star: HTMLElement, right: number): void {
    const screenWidth = window.screen.width;
    if (right >= screenWidth) {
      star.remove();
    }
    right += 3;
    star.style.right = right + "px";
  }
}
