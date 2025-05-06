export const PAYMENT_TYPES = {
  TELEBIRR: 'telebirr',
  CBE: 'cbe',
  CARD: 'card',
} as const;

export type PaymentType = typeof PAYMENT_TYPES[keyof typeof PAYMENT_TYPES];