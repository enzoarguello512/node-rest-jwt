export const availableCategories = [
  'Appetizers',
  'Condiments',
  'Confectionery',
  'Convenience foods',
  'Desserts',
  'Dips, pastes and spreads',
  'Dried foods',
  'Dumplings',
  'Fast food',
  'Products',
];

export const availableRegion = [
  'North America',
  'United States',
  'Europe',
  'Global',
];

export const availablePayment = [
  'In 12 installments',
  'In 6 installments',
  'In cash',
];

export const availablePromotion = [
  '10% off',
  '20% off',
  '30% off',
  '40% off',
  '50% off',
  '60% off',
  '70% off',
  '80% off',
  '90% off',
  'Special offer',
  'New',
];

export const multiFilter = {
  categories: availableCategories,
  region: availableRegion,
  payment: availablePayment,
  promotion: availablePromotion,
} as const;
