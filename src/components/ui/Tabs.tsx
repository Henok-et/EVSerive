import React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className="space-y-4">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }: any) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeTab, setActiveTab });
          }
          return child;
        })}
      </nav>
    </div>
  );
}

export function TabsTrigger({ children, value, activeTab, setActiveTab }: any) {
  const isActive = activeTab === value;
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`
        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
        ${isActive
          ? 'border-emerald-500 text-emerald-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, activeTab }: any) {
  if (value !== activeTab) return null;
  
  return (
    <div className="py-4">
      {children}
    </div>
  );
}