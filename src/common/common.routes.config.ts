import express from 'express';

// Main class on which most of the routes implemented in app.ts are based
// implementations can be found in the files "./components/**/*.routes.config.ts
export default abstract class CommonRoutesConfig {
  protected app: express.Application;
  private readonly name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }
  public getName(): string {
    return this.name;
  }
  public abstract configureRoutes(): express.Application;
}
