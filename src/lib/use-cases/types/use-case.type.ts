export interface UseCase {
  usecase: string;
  execute<R = any>(...args: Array<unknown>): R | any;
}
