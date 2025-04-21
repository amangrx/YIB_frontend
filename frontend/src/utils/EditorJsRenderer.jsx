import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Paragraph from '@editorjs/paragraph';

const EditorJsRenderer = ({ data }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Skip if no data or editor already exists
    if (!data || editorInstance.current) return;

    let mounted = true;
    let editor;

    const initializeEditor = async () => {
      try {
        // Parse data if it's a string
        const contentData = typeof data === 'string' ? JSON.parse(data) : data;
        
        // Validate data structure
        if (!contentData || !contentData.blocks || !Array.isArray(contentData.blocks)) {
          console.error('Invalid EditorJS data structure:', contentData);
          return;
        }

        editor = new EditorJS({
          holder: editorRef.current,
          tools: {
            paragraph: Paragraph,
            header: Header,
            list: List,
            embed: Embed,
            quote: Quote,
            marker: Marker,
            inlineCode: InlineCode,
          },
          data: contentData,
          readOnly: true,
          minHeight: 0,
          onReady: () => {
            if (mounted) setIsReady(true);
          },
          placeholder: 'Content is empty'
        });

        editorInstance.current = editor;
      } catch (error) {
        console.error('EditorJS initialization failed:', error);
      }
    };

    initializeEditor();

    return () => {
      mounted = false;
      if (editor) {
        editor.isReady
          .then(() => editor.destroy())
          .catch(error => console.error('Error destroying editor:', error));
      }
    };
  }, [data]);

  // Render states
  if (!data) {
    return <div className="text-gray-500 p-4">No content provided</div>;
  }

  if (!isReady) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse">Loading content...</div>
      </div>
    );
  }

  return <div ref={editorRef} className="editorjs-container" />;
};

export default EditorJsRenderer;