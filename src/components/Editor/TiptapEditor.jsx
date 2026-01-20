"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post here...",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-[#e2e8f0] [&_p]:my-2 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_a]:text-blue-400 [&_a]:underline cursor-text",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    immediatelyRender: false,
  });

  // Update editor content when the content prop changes (e.g., after fetching data)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="border-2 border-[#444] rounded-lg bg-[#1a1a2e] overflow-hidden flex flex-col">
      <Toolbar editor={editor} />
      <div
        className="flex-1 cursor-text"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent editor={editor} className="min-h-[300px]" />
      </div>
    </div>
  );
};

export default TiptapEditor;
