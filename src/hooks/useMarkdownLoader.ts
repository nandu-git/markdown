import { useState, useEffect } from 'react';

export const useMarkdownLoader = (filePath: string | null) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filePath) {
      setContent('');
      setError(null);
      return;
    }

    const loadMarkdown = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load file');
        setContent(`# File Not Found\n\nThe requested file **${filePath}** could not be loaded.\n\nThis might be because:\n* The file doesn't exist in the public directory\n* The file path is incorrect\n* There's a network issue\n\nPlease check that the markdown files are placed in the correct location.`);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [filePath]);

  return { content, loading, error };
};