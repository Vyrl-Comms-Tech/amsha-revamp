'use client'

import { useRef, useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { Extension } from '@tiptap/core'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Image as ImageIcon,
} from 'lucide-react'

import '../styles/add-content.css'

const ExitHeadingOnEnter = Extension.create({
  name: 'exitHeadingOnEnter',
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        if (!editor.isActive('heading')) return false
        return editor.chain().splitBlock().setNode('paragraph').run()
      },
      'Shift-Enter': ({ editor }) => {
        if (editor.isActive('heading') || editor.isActive('paragraph')) {
          return editor.chain().splitBlock().setNode('paragraph').run()
        }
        return false
      },
    }
  },
})

function applyBlockFormat(editor, typeName, attrs = {}) {
  const { state, view } = editor
  const { $head } = state.selection
  const nodeType = state.schema.nodes[typeName]
  if (!nodeType) return
  const nodePos = $head.before($head.depth)
  view.dispatch(state.tr.setNodeMarkup(nodePos, nodeType, attrs))
  editor.commands.focus()
}

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`add-content-toolbar-btn${active ? ' add-content-toolbar-btn--active' : ''}`}
      title={title}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="add-content-editor-divider" />
}

export default function TiptapEditor({
  value,
  onChange,
  onError,
  placeholder = 'Write your content here…',
}) {
  const imgInputRef = useRef(null)

  // ✅ This counter triggers a re-render on every editor transaction
  // so toolbar active states (bold, italic, underline, etc.) stay in sync
  const [, forceUpdate] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      ExitHeadingOnEnter,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'add-content-tiptap-editor',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    // ✅ Fix: re-render on every transaction so isActive() reflects real state
    onTransaction: () => {
      forceUpdate((n) => n + 1)
    },
  })

  useEffect(() => {
    if (!editor) return

    const currentHTML = editor.getHTML()
    const newHTML = value || ''

    if (newHTML !== currentHTML) {
      editor.commands.setContent(newHTML, false)
    }
  }, [editor, value])

  if (!editor) return null

  function insertLink() {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl || '')

    if (url === null) return

    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }

    editor.chain().focus().setLink({ href: url }).run()
  }

  function handleImageFile(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 1 * 1024 * 1024) {
      onError?.('Editor images must be under 1MB. Please compress or resize the image.')
      e.target.value = ''
      return
    }

    let imageCount = 0

    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image') imageCount++
    })

    if (imageCount >= 3) {
      onError?.('Maximum 3 images allowed in the editor.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      editor
        .chain()
        .focus()
        .setImage({ src: reader.result })
        .run()
    }

    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const wordCount = editor
    .getText()
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return (
    <div className="add-content-editor-wrap">
      <div className="add-content-editor-toolbar">
        <ToolbarButton
          onClick={() => applyBlockFormat(editor, 'paragraph')}
          active={editor.isActive('paragraph')}
          title="Paragraph"
        >P</ToolbarButton>
        <ToolbarButton
          onClick={() => applyBlockFormat(editor, 'heading', { level: 1 })}
          active={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >H1</ToolbarButton>
        <ToolbarButton
          onClick={() => applyBlockFormat(editor, 'heading', { level: 2 })}
          active={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >H2</ToolbarButton>
        <ToolbarButton
          onClick={() => applyBlockFormat(editor, 'heading', { level: 3 })}
          active={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >H3</ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon size={14} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          title="Align left"
        >
          <AlignLeft size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          title="Align center"
        >
          <AlignCenter size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          title="Align right"
        >
          <AlignRight size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          title="Justify"
        >
          <AlignJustify size={14} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet list"
        >
          <List size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Ordered list"
        >
          <ListOrdered size={14} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={insertLink}
          active={editor.isActive('link')}
          title="Insert link"
        >
          <Link2 size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => imgInputRef.current?.click()}
          title="Upload image"
        >
          <ImageIcon size={14} />
        </ToolbarButton>
      </div>

      <input
        ref={imgInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageFile}
      />

      <div className="add-content-editor-body">
        <EditorContent editor={editor} />
      </div>

      <div className="add-content-editor-footer">
        <span className="add-content-word-count">
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
      </div>
    </div>
  )
}