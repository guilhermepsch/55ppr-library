import { Observer } from "./Observer";

export abstract class Observable {
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => observer.updateFromObserver());
  }
}