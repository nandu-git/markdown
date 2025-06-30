import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MarkdownViewer from './components/MarkdownViewer';
import EmptyState from './components/EmptyState';
import { useMarkdownLoader } from './hooks/useMarkdownLoader';
import { MenuData } from './types/menu';

function App() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);

  const { content, loading: contentLoading, error: contentError } = useMarkdownLoader(selectedFile);

  // Load menu data
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const response = await fetch('/src/assets/menu/menu_data.json');
        if (!response.ok) {
          throw new Error('Failed to load menu data');
        }
        const data: MenuData = await response.json();
        setMenuData(data);
      } catch (err) {
        setMenuError(err instanceof Error ? err.message : 'Failed to load menu');
      } finally {
        setMenuLoading(false);
      }
    };

    loadMenuData();
  }, []);

  const handleFileSelect = (filePath: string, title: string) => {
    setSelectedFile(filePath);
    setSelectedTitle(title);
  };

  const handleToggleExpand = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  if (menuLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (menuError || !menuData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Failed to Load Menu</h2>
          <p className="text-slate-600 mb-4">{menuError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        menuItems={menuData.menuItems}
        selectedFile={selectedFile}
        onFileSelect={handleFileSelect}
        expandedItems={expandedItems}
        onToggleExpand={handleToggleExpand}
      />
      
      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          contentLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-slate-600">Loading document...</p>
              </div>
            </div>
          ) : (
            <MarkdownViewer
              content={content}
              title={selectedTitle}
              filePath={selectedFile}
            />
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

export default App;