/** @jsx h */

import { h } from '../../../helpers'

export const run = editor => {
  editor.removeMark('bold')
}

export const input = (
  <value>
    <block>
      <anchor />
      <mark key="a">
        <mark key="b">wo</mark>
      </mark>
      <mark key="b">
        <focus />rd
      </mark>
    </block>
  </value>
)

export const output = (
  <value>
    <block>
      <mark key="b">
        <anchor />wo<focus />rd
      </mark>
    </block>
  </value>
)