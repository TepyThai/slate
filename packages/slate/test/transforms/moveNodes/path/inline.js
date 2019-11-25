/** @jsx jsx */

import { Editor } from 'slate'
import { jsx } from '../../..'

export const input = (
  <value>
    <block>
      <text />
      <inline>
        <cursor />
        one
      </inline>
      <text />
      <inline>two</inline>
      <text />
    </block>
  </value>
)

export const run = editor => {
  Editor.moveNodes(editor, { at: [0, 1], to: [0, 3] })
}

export const output = (
  <value>
    <block>
      <text />
      <inline>two</inline>
      <text />
      <inline>
        <cursor />
        one
      </inline>
      <text />
    </block>
  </value>
)