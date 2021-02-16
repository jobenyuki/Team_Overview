import React from 'react'
import { mount } from 'enzyme'
// Import utils
import { testHook } from 'Utils'
// Import custom hooks
import { useStyle } from 'Hooks'
// Import custom components
import Label from './index'

const testArgs = {
  id: 'id',
  name: 'name',
  className: 'className',
  round: false,
  outline: false,
  children: 'children',
}

const { children, ...props } = testArgs

describe('Label component', () => {
  let wrapper
  let style

  beforeEach(() => {
    wrapper = mount(<Label {...props}>{children}</Label>)
    testHook(() => {
      style = useStyle().style
    })
  })

  it('accepts props', () => {
    expect(wrapper.exists(`.${props.className}`)).toBe(true)
    expect(wrapper.exists('.label--round')).toBe(props.round)
    expect(wrapper.exists('.label--outline')).toBe(props.outline)
    expect(wrapper.props().id).toBe(props.id)
    expect(wrapper.props().name).toBe(props.name)
    expect(wrapper.containsMatchingElement(children)).toBe(true)
  })

  it('has inline style for random background color', () => {
    const div = wrapper.find('.label')
    Object.keys(style).forEach((key) => {
      expect(div.props().style).toHaveProperty(key)
    })
  })
})
