class Start {
  constructor(app, type = null) {
    this.app = app;
  }

  init() {
    this.app
      .listen(3000)
      .on('listening', () => console.log('Listening at localhost:3000'));
  }
}

export function startWebServer() {
  new Start(this).init();
}
