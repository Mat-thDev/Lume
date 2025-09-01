"use client";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { useEffect, useRef } from "react";

import useNest from "../../../hooks/useNest";
import NestSidebar from "../../Editor/NestSidebar";
import EditorHeader from "../../Editor/EditorHeader";
import useFile from "../../../hooks/useFile";
import useAutoSave from "../../../hooks/useAutoSave";
import useSettings from "../../../hooks/useSettings";

const LumeEditor = () => {
  const { fetchSettings } = useSettings();
  const { fetchNest, setFocusedFile } = useNest();
  const { fetchFocusedFile, updateFileContent } = useFile();

  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const settings = fetchSettings();
  const focusedFile = fetchFocusedFile();
  const nest = fetchNest();

  useEffect(() => {
    if (!editorRef.current || !focusedFile) return;

    viewRef.current = new EditorView({
      parent: editorRef.current,
      doc: focusedFile?.content ?? "",
      extensions: [
        basicSetup,
        markdown(),
        EditorView.updateListener.of((update) => {
          console.log(update, focusedFile)
          if (update.docChanged && focusedFile) {
            const content = update.state.doc.toString();
            console.log(content)
            updateFileContent(content);
          }
        }),
      ],
    });

    return () => viewRef.current?.destroy();
  }, [editorRef, focusedFile]);

  useEffect(() => {
    if (!viewRef.current) return;

    const currentDoc = viewRef.current.state.doc.toString();
    const newContent = focusedFile?.content ?? "";

    if (currentDoc !== newContent) {
      viewRef.current.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: newContent },
      });
    }
  }, [focusedFile]);

  useAutoSave();


  return (
    <div className="flex w-full h-full bg-[var(--c-background)] overflow-x-hidden">
      {/* Sidebar */}
      <NestSidebar
        nest={nest}
        onSelectFile={(n) => setFocusedFile(n)}
      />

      {/* Editor */}
      <div className="w-full flex flex-col overflow-x-auto">
        <EditorHeader file={focusedFile} />
        <div
          id="lumeEditor"
          ref={editorRef}
          data-show-numbers={settings.editor.showLineNumbers}
          className="flex-1 overflow-y-auto border-l border-[var(--c-border)] font-mono text-sm"
        />
      </div>
    </div>

  );
};

export default LumeEditor;
