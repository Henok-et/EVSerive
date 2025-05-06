import React from 'react';
import { Zap, Shield, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-emerald-700 text-white">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80"
          alt="Electric Vehicle Charging"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Your Trusted EV Service Partner in Ethiopia
        </h1>
        <p className="mt-6 text-xl max-w-3xl">
          Comprehensive electric vehicle maintenance, repair, and charging solutions. 
          Experience seamless service booking and find charging stations near you.
        </p>
        
        <div className="mt-10">
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-md font-semibold text-lg hover:bg-emerald-50 transition-colors">
            Book a Service
          </button>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex items-center">
            <Zap className="h-8 w-8 mr-4" />
            <div>
              <h3 className="font-semibold text-lg">Fast Charging</h3>
              <p className="mt-1">Access to charging stations across Ethiopia</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Shield className="h-8 w-8 mr-4" />
            <div>
              <h3 className="font-semibold text-lg">Expert Service</h3>
              <p className="mt-1">Specialized EV maintenance and repair</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-8 w-8 mr-4" />
            <div>
              <h3 className="font-semibold text-lg">Easy Booking</h3>
              <p className="mt-1">Schedule services at your convenience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}