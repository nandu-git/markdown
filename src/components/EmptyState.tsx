import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 bg-slate-50 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-3">
          Welcome to the Documentation Viewer
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Select a document from the sidebar to start reading. Navigate through the menu to explore different topics and sections.
        </p>
        <div className="flex items-center justify-center text-sm text-slate-500">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Choose a document from the menu
        </div>
      </div>
    </div>
  );
};

export default EmptyState;