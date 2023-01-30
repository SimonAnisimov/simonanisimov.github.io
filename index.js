"use strict";
const canvas = document.getElementById("matrix");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight- 4;

class Matrix {
  fontSize = 16;
  interval;

  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.columns = this.canvas.width / this.fontSize;
    this.rainDrops = new Array();
    for(let i = 0; i < this.columns; i++) {
      this.rainDrops[i] = undefined;
    }
  }

  draw() {
    this.interval = setInterval(() => {
      this.context.fillStyle = 'rgba(0, 0, 0, 0.10)';
      this.context.fillRect(0, 0, canvas.width, canvas.height);
      this.rainDrops.forEach((item, index) => {
        if(!item) {
          this.rainDrops[index] = new Rain((index * this.fontSize), this.context);
          this.rainDrops[index].run()
        } else {
          if(item.counter * item.fontSize > canvas.height && Math.random() > 0.98) {
            item.stop();
            this.rainDrops[index] = undefined;
          }
        }
      });
    }, 100);
    
  }

  stop() {
    clearInterval(this.interval);
  }
}

class Rain {
  katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  nums = '0123456789';
  interval;
  lastChar;
  counter = 0;

  constructor(position, context) {
    this.position = position;
    this.context = context;
    this.speed = this.randomSize(30, 80);
    this.fontSize = this.randomSize(8, 16);
    this.alphabet = this.katakana + this.latin + this.nums;
  }

  run() {
    this.interval = setInterval(() => {
      if(this.lastChar) {
        this.context.fillStyle = '#0F0';
        this.context.font = `${this.fontSize}px monospace`;
        this.context.fillText(this.lastChar, this.position, (this.counter - 1) * this.fontSize);
      }

      const newChar = this.randomChar();
      this.context.fillStyle = '#fff';
      this.context.font = this.fontSize + 'px monospace';
      this.context.fillText(newChar, this.position, this.counter * this.fontSize);
      this.lastChar = newChar;

      this.counter++;

    }, this.speed);
  }

  stop() {
    clearInterval(this.interval);
  }

  randomSize(min, max) {
    return Math.round((Math.random() * (max - min) + min));
  }

  randomChar() {
    return this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
  }
}

const matrix = new Matrix(canvas);
matrix.draw();
