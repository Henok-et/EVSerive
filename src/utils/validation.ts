import { ValidationError } from './errors';

interface PaymentDetails {
  phoneNumber?: string;
  accountNumber?: string;
}

export function validatePaymentDetails(details: PaymentDetails): void {
  if (details.phoneNumber) {
    if (!/^251[0-9]{9}$/.test(details.phoneNumber)) {
      throw new ValidationError('Invalid phone number format. Must start with 251 followed by 9 digits');
    }
  }

  if (details.accountNumber) {
    if (!/^1000[0-9]{6}$/.test(details.accountNumber)) {
      throw new ValidationError('Invalid CBE account number format. Must start with 1000 followed by 6 digits');
    }
  }
}