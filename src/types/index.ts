export interface Place {
  id: number;
  emoji: string;
  name: string;
  type: string;
  typeKey: 'shelter' | 'clinic' | 'foundation' | 'rescue';
  addr: string;
  tel: string;
  hours: string;
  needs: string[];
  mapUrl: string;
}

export interface Product {
  id: number;
  cat: 'dog' | 'cat' | 'other';
  name: string;
  brand: string;
  emoji: string;
  urgent: boolean;
  shopeeUrl: string;
}
