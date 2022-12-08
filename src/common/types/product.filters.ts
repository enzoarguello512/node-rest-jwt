import { SortOrder } from 'mongoose';

export interface IProductFilters {
  page: number;
  limit: number;
  search: string;
  sort: Array<string>;
  sortBy: { [key: string]: SortOrder };
  categories: Array<string>;
  region: Array<string>;
  payment: Array<string>;
  promotion: Array<string>;
}
