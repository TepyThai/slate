/** @jsx jsx */

import { Editor } from 'slate'
import { jsx } from '../../..'

export const run = editor => {
  Editor.delete(editor, )
}

export const input = (
  <value>
    <block>
      wo
      <anchor />
      rd
    </block>
    <block>
      <block>middle</block>
      <block>
        an
        <focus />
        other
      </block>
    </block>
  </value>
)

export const output = (
  <value>
    <block>
      wo
      <cursor />
      other
    </block>
  </value>
)