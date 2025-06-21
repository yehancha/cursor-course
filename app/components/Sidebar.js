"use client";

import { useState } from 'react';
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
  SparklesIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const
 
sidebarItems
 
=
 
[
  { name: 'Overview', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Research Assistant', href: '#', icon: SparklesIcon, current: false },
  { name: 'Research Reports', href: '#', icon: DocumentTextIcon, current: false },
  { name: 'API Playground', href: '/playground', icon: CodeBracketIcon, current: false },
  { name: 'Invoices', href: '#', icon: CurrencyDollarIcon, current: false },
  { name: 'Documentation', href: '#', icon: DocumentDuplicateIcon, current: false, external: true },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex h-screen bg-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col flex-grow">
        <div className={`flex items-center justify-between p-4 h-16 border-b ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {!isCollapsed && <h1 className="text-xl font-bold">Cursor Course</h1>}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-100">
            {isCollapsed ? <ChevronRightIcon className="w-6 h-6" /> : <ChevronLeftIcon className="w-6 h-6" />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                item.current
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className={`h-6 w-6 ${isCollapsed ? '' : 'mr-3'}`} aria-hidden="true" />
              {!isCollapsed && <span>{item.name}</span>}
              {!isCollapsed && item.external && <ArrowLeftOnRectangleIcon className="w-4 h-4 ml-auto" />}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
} 