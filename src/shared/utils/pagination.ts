export interface PaginationParams {
  page: number;
  pageSize: number;
}

interface PaginationProps<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
}

export class Pagination<T> {
  public readonly page: number;
  public readonly pageSize: number;
  public readonly totalItems: number;
  public readonly totalPages: number;
  public readonly items: T[];

  constructor({ items, totalItems, page, pageSize }: PaginationProps<T>) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / pageSize);
    this.items = items;
  }

  static create<T>(props: PaginationProps<T>): Pagination<T> {
    return new Pagination(props);
  }
}
