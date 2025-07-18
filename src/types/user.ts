export interface UserProduct {
  type: 'Account';
  id: string;
}

export interface User {
  full_name: string;
  profile_photo: string;
  products: UserProduct[];
}
