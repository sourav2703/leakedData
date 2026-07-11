export interface VaultUser {
  id: number;
  name: string;
  father_name?: string;
  mobile: string;
  photo: string;
  status: 'Hacked';
  risk: number;
  confidential: {
    alias: string;
    aadhaar_card: string;
    pan_card: string;
    address: string;
    other_numbers: string;
    email: string;
    notes: string;
  };
}
