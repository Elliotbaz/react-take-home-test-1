export interface IContact {
  id: string;
  name: string;
  phone?: string;
  age?: number;
  email?: string;
}

export interface NewContactsProps {
  onToggleVisibility: () => void;
  contactToUpdate: IContact | null;
}
