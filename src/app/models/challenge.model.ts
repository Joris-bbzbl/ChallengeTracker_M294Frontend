export interface Challenge {
  id?: number;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  status: string;
  startDate?: string;
  endDate?: string;
  categoryId?: number;
  categoryName?: string;
}
