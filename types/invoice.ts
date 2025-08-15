export interface Person {
  name: string;
  address: string;
  email: string;
}

export interface LineItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  sender: Person;
  recipient: Person;
  invoiceNumber: string;
  date: string;
  taxRate: number;
  lineItems: LineItem[];
  subtotal?: number;
  total?: number;
  notes?: string;
  logo?: string; // base64 string
  template: "minimal" | "modern" | "classic";
}
