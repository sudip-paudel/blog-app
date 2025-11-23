import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes, EditorState, LexicalEditor } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect, useRef } from "react";

function InitialContentPlugin({ html }: { html?: string }) {
  const [editor] = useLexicalComposerContext();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!html || isMounted.current) return;

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);

      if (nodes.length > 0) {
        const root = $getRoot();
        root.clear();
        $insertNodes(nodes);
      }
    });

    isMounted.current = true;
  }, [editor, html]);

  return null;
}

interface RichTextEditorProps {
  initialValue?: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({
  initialValue,
  onChange,
  placeholder = "Start writing your post...",
}: RichTextEditorProps) => {
  const initialConfig = {
    namespace: "BlogEditor",
    theme: {
      paragraph: "mb-2",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError: (error: Error) => {
      console.error(error);
    },
  };

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      onChange(htmlString);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative rounded-md border border-input bg-background focus-within:ring-1 focus-within:ring-ring">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[300px] p-4 outline-none prose prose-sm max-w-none dark:prose-invert" />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none select-none">
              {placeholder}
            </div>
          }
          ErrorBoundary={() => <div>Error loading editor</div>}
        />
        <HistoryPlugin />
        {}
        <OnChangePlugin onChange={handleChange} />
        <InitialContentPlugin html={initialValue} />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Tip: Use keyboard shortcuts - Ctrl+B for bold, Ctrl+I for italic
      </p>
    </LexicalComposer>
  );
};
