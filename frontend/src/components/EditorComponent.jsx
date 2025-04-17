import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback
} from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";

const EditorComponent = forwardRef(({ holderId, onChange, initialData }, ref) => {
  const editorInstance = useRef(null);
  const holderRef = useRef(null);
  const isInitializing = useRef(false);

  // Memoize the onChange handler to prevent unnecessary re-renders
  const handleEditorChange = useCallback(async (api) => {
    try {
      const savedData = await api.saver.save();
      onChange?.(savedData);
    } catch (error) {
      console.error("Error saving editor data:", error);
    }
  }, [onChange]);

  // Initialize Editor.js
  useEffect(() => {
    if (!editorInstance.current && !isInitializing.current && holderRef.current) {
      isInitializing.current = true;

      const initEditor = async () => {
        try {
          const editor = new EditorJS({
            holder: holderRef.current,
            tools: {
              paragraph: {
                class: Paragraph,
                inlineToolbar: true,
              },
              header: {
                class: Header,
                config: {
                  placeholder: "Enter a header",
                  levels: [2, 3, 4],
                  defaultLevel: 3,
                },
              },
              list: {
                class: List,
                inlineToolbar: true,
              },
              embed: Embed,
              quote: {
                class: Quote,
                inlineToolbar: true,
                config: {
                  quotePlaceholder: "Enter a quote",
                  captionPlaceholder: "Quote's author",
                },
              },
              marker: Marker,
              inlineCode: InlineCode,
            },
            data: initialData || { blocks: [] },
            placeholder: "Write your content here...",
            onChange: handleEditorChange, // Use the memoized handler
          });

          editorInstance.current = editor;
          isInitializing.current = false;
        } catch (error) {
          console.error("Error initializing editor:", error);
          isInitializing.current = false;
        }
      };

      initEditor();
    }

    return () => {
      if (editorInstance.current) {
        try {
          // Check if destroy method exists and call it
          if (editorInstance.current.destroy) {
            const destroyPromise = editorInstance.current.destroy();
            // Only handle as promise if it is one
            if (destroyPromise && typeof destroyPromise.then === "function") {
              destroyPromise
                .then(() => {
                  editorInstance.current = null;
                })
                .catch((error) => {
                  console.error("Error destroying editor:", error);
                });
            } else {
              editorInstance.current = null;
            }
          } else {
            editorInstance.current = null;
          }
        } catch (error) {
          console.error("Error in editor cleanup:", error);
          editorInstance.current = null;
        }
      }
    };
  }, [holderId, handleEditorChange, initialData]);

  // Expose save method to parent component
  useImperativeHandle(ref, () => ({
    save: async () => {
      if (editorInstance.current) {
        try {
          return await editorInstance.current.save();
        } catch (error) {
          console.error("Error saving editor content:", error);
          return null;
        }
      }
      return null;
    },
    clear: () => {
      if (editorInstance.current) {
        try {
          editorInstance.current.clear();
        } catch (error) {
          console.error("Error clearing editor:", error);
        }
      }
    },
    destroy: () => {
      if (editorInstance.current) {
        try {
          editorInstance.current.destroy();
          editorInstance.current = null;
        } catch (error) {
          console.error("Error destroying editor:", error);
        }
      }
    }
  }));

  return <div id={holderId} ref={holderRef} className="min-h-[300px]" />;
});

EditorComponent.displayName = "EditorComponent";

export default React.memo(EditorComponent);