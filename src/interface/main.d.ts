export interface IOrderItem {
  currency: string;
  customer_id: number;
  customer_name: string;
  id: number;
  status: boolean;
  transaction_time: string;
}

export interface IOrderInfo {
  endDate: string;
  startDate: string;
  totalCount: number;
  totalCurrency: number;
  message?: string;
}

export interface IFetchData {
  order: IOrderItem[];
  orderInfo: IOrderInfo;
}

export interface IOnSetParams {
  pageValue?: number | string;
  dateValue?: string;
  sortValue?: string;
  statusValue?: string;
  customerValue?: string;
  event?: React.ChangeEvent<HTMLInputElement>;
}

export interface IErrorFallbackProps {
  resetErrorBoundary: (...args: unknown[]) => void;
}
