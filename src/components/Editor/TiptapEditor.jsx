"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/**
 * Tiptap Editor Component
 *
 * Props:
 * - value: initial JSON content (object) or null
 * - onChange: (json) => void
 * - editable: boolean (default true)
 * - className: wrapper class
 */
export default function TiptapEditor({
  value = null,
  onChange,
  editable = true,
  className = "",
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || undefined,
    editable,
    immediatelyRender: false,
    autofocus: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange && onChange(json);
    },
  });

  useEffect(() => {
    if (!editor) return;
    // If external value changes, update editor content
    if (value) editor.commands.setContent(value);
    else editor.commands.clearContent();
  }, [value, editor]);

  return (
    <div className={`tiptap-wrapper ${className}`}>
      <div className="tiptap-toolbar flex gap-2 mb-2">
        {/* Basic toolbar examples */}
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
        >
          Strike
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-white/5 rounded"
          onClick={() => editor?.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      <div className="tiptap-editor prose prose-invert max-w-none bg-[#1a1a2e] p-3 rounded-lg min-h-[200px] border-2 border-[#444]">
        <EditorContent editor={editor} content={value || undefined} />
      </div>
    </div>
  );
}
