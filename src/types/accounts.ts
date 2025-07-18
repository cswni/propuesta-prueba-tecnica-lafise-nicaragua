// Backend response type
export interface AccountApi {
  alias: string;
  account_number: number;
  balance: number;
  currency: string;
}

// UI/frontend type (extends backend and adds UI fields)
export interface AccountUI extends AccountApi {
  id: string | number;
  flag: string;
  accountNumber: string; // string for UI convenience
}
