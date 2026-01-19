"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapViewer({ value = null, className = "" }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || undefined,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <EditorContent editor={editor} content={value || undefined} />
    </div>
  );
}
