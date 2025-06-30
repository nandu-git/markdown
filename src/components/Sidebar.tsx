import React from 'react';
import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react';
import { MenuItem } from '../types/menu';

interface SidebarProps {
  menuItems: MenuItem[];
  selectedFile: string | null;
  onFileSelect: (filePath: string, title: string) => void;
  expandedItems: Set<string>;
  onToggleExpand: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  selectedFile,
  onFileSelect,
  expandedItems,
  onToggleExpand,
}) => {
  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.title);
    const isSelected = selectedFile === item.filePath;

    return (
      <div key={item.title} className="select-none">
        <div
          className={`
            flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
            hover:bg-slate-100 group
            ${isSelected ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' : 'text-slate-700'}
            ${depth > 0 ? 'ml-4' : ''}
          `}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
          onClick={() => {
            if (hasChildren) {
              onToggleExpand(item.title);
            } else if (item.filePath) {
              onFileSelect(item.filePath, item.title);
            }
          }}
        >
          {hasChildren ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-2 text-slate-500" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2 text-slate-500" />
              )}
              <Folder className="w-4 h-4 mr-2 text-amber-500" />
            </>
          ) : (
            <FileText className="w-4 h-4 mr-2 text-blue-500" />
          )}
          <span className="text-sm font-medium truncate flex-1">
            {item.title}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Documentation
        </h2>
        <p className="text-sm text-slate-500 mt-1">Select a document to view</p>
      </div>
      
      <div className="p-3 space-y-1">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>
    </div>
  );
};

export default Sidebar;