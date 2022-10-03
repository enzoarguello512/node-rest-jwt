import express from 'express';

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
