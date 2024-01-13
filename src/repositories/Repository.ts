export interface Repository<T> {
  save(item: T): T;
  findById(id: number): T | undefined;
  list(): T[];
  update(item: T): T;
  delete(id: number): void;
}