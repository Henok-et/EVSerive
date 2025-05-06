import React from 'react';
import { Battery } from 'lucide-react';

export function LoginFormHeader() {
  return (
    <div className="text-center">
      <Battery className="mx-auto h-12 w-12 text-emerald-600" />
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to EV Ethiopia</h2>
      <p className="mt-2 text-sm text-gray-600">
        Access your account to manage your EV services
      </p>
    </div>
  );
}