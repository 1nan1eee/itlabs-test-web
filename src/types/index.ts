export enum VisitorGroup {
  Passerby = 'Прохожий',
  Client = 'Клиент',
  Partner = 'Партнер',
}

export interface Visitor {
  id: number;
  fullName: string;
  company: string;
  group: VisitorGroup;
  present: boolean;
}
