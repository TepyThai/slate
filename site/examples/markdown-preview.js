import Prism from 'prismjs'
import React, { useState, useCallback } from 'react'
import { Editable, withReact, useSlate } from 'slate-react'
import { Editor, Text } from 'slate'
import { withHistory } from 'slate-history'

// eslint-disable-next-line
;Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

const MarkdownPreviewEditor = withHistory(withReact(Editor))

const MarkdownPreviewExample = () => {
  const [value, setValue] = useState(initialValue)
  const editor = useSlate(MarkdownPreviewEditor)
  const renderDecoration = useCallback(props => <Decoration {...props} />, [])
  const decorate = useCallback(([node, path]) => {
    const ranges = []

    if (!Text.isText(node)) {
      return ranges
    }

    const getLength = token => {
      if (typeof token === 'string') {
        return token.length
      } else if (typeof token.content === 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    }

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
    let start = 0

    for (const token of tokens) {
      const length = getLength(token)
      const end = start + length

      if (typeof token !== 'string') {
        ranges.push({
          type: token.type,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        })
      }

      start = end
    }

    return ranges
  }, [])

  return (
    <div>
      <Editable
        placeholder="Write some markdown..."
        editor={editor}
        value={value}
        decorate={decorate}
        renderDecoration={renderDecoration}
        onChange={v => setValue(v)}
      />
    </div>
  )
}

const Decoration = props => {
  const { children, decoration, attributes } = props

  switch (decoration.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'code':
      return <code {...attributes}>{children}</code>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    case 'title': {
      return (
        <span
          {...attributes}
          style={{
            fontWeight: 'bold',
            fontSize: '20px',
            margin: '20px 0 10px 0',
            display: 'inline-block',
          }}
        >
          {children}
        </span>
      )
    }
    case 'punctuation': {
      return (
        <span {...attributes} style={{ opacity: 0.2 }}>
          {children}
        </span>
      )
    }
    case 'list': {
      return (
        <span
          {...attributes}
          style={{
            paddingLeft: '10px',
            lineHeight: '10px',
            fontSize: '20px',
          }}
        >
          {children}
        </span>
      )
    }
    case 'hr': {
      return (
        <span
          {...attributes}
          style={{
            borderBottom: '2px solid #000',
            display: 'block',
            opacity: 0.2,
          }}
        >
          {children}
        </span>
      )
    }
    case 'blockquote': {
      return (
        <span
          {...attributes}
          style={{
            borderLeft: '2px solid #ddd',
            display: 'inline-block',
            paddingLeft: '10px',
            color: '#aaa',
            fontStyle: 'italic',
          }}
        >
          {children}
        </span>
      )
    }

    default: {
      throw new Error(`Unknown markdown decoration type: "${decoration.type}"`)
    }
  }
}

const initialValue = {
  selection: null,
  annotations: {},
  nodes: [
    {
      nodes: [
        {
          text:
            'Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.',
          marks: [],
        },
      ],
    },
    {
      nodes: [
        {
          text: '## Try it out!',
          marks: [],
        },
      ],
    },
    {
      nodes: [
        {
          text: 'Try it out for yourself!',
          marks: [],
        },
      ],
    },
  ],
}

export default MarkdownPreviewExample