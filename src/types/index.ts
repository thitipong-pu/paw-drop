export interface Place {
  id: number;
  emoji: string;
  imageUrl?: string;
  name: string;
  type: string;
  typeKey: 'shelter' | 'clinic' | 'foundation' | 'rescue';
  addr: string;
  tel: string;
  hours: string;
  needs: string[];
  mapUrl: string;
  facebookPage?: string;
  facebookUrl?: string;
}

export interface Product {
  id: number;
  cat: 'dog' | 'cat' | 'other';
  name: string;
  brand: string;
  emoji: string;
  imageUrl?: string;
  urgent: boolean;
  shopeeUrl: string;
}
