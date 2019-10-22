/** @jsx h */

import h from '../../helpers/h'

export const schema = {
  blocks: {
    paragraph: {},
    quote: {
      nodes: [
        {
          match: [{ type: 'title' }],
          max: 1,
        },
        {
          match: [{ type: 'paragraph' }],
        },
      ],
      normalize: (editor, { code, path }) => {
        if (code === 'child_max_invalid') {
          editor.mergeNodeByPath(path)
        }
      },
    },
  },
}

export const input = (
  <value>
    <document>
      <quote>
        <block type="title">One</block>
        <block type="title">Two</block>
        <block>
          <text />
        </block>
      </quote>
    </document>
  </value>
)

export const output = (
  <value>
    <document>
      <quote>
        <block type="title">OneTwo</block>
        <block>
          <text />
        </block>
      </quote>
    </document>
  </value>
)