/** @jsx h */

import { h } from '../../../helpers'

export const run = editor => {
  editor.removeMark('bold')
}

export const input = (
  <value>
    
      <block>
        wor
        <mark key="a">
          <anchor />d<focus />
        </mark>
      </block>
    
  </value>
)

export const output = (
  <value>
    
      <block>
        wor<anchor />d<focus />
      </block>
    
  </value>
)