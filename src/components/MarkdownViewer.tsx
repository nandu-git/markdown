import React from 'react';
import { FileText, Clock, User } from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
  title: string;
  filePath: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, title, filePath }) => {
  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string) => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-slate-800 mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-900 mt-8 mb-6">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-100 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-slate-800">$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-2 py-1 rounded text-sm text-slate-800">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4 text-slate-700 leading-relaxed">')
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="mb-2 text-slate-700">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-200 pl-4 py-2 my-4 bg-blue-50 text-slate-700 italic">$1</blockquote>');
  };

  const formattedContent = parseMarkdown(content);

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                {filePath.split('/').pop()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-4xl">
        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: `<p class="mb-4 text-slate-700 leading-relaxed">${formattedContent}</p>` 
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownViewer;