import React from 'react'
import { mount } from 'enzyme'
// Import utils
import { testHook, getShortName } from 'Utils'
// Import custom hooks
import { useStyle } from 'Hooks'
// Import custom components
import Avatar from './index'

const props = {
  id: 'id',
  name: 'name',
  className: 'className',
  memberName: 'memberName',
}

describe('Avatar component', () => {
  let wrapper
  let style

  beforeEach(() => {
    wrapper = mount(<Avatar {...props} />)
    testHook(() => {
      style = useStyle().style
    })
  })

  it('accepts props', () => {
    expect(wrapper.exists(`.${props.className}`)).toBe(true)
    expect(wrapper.props().id).toBe(props.id)
    expect(wrapper.props().name).toBe(props.name)
    expect(wrapper.containsMatchingElement(getShortName(props.memberName))).toBe(true)
  })

  it('has inline style for random background color', () => {
    const div = wrapper.find('.avatar')
    Object.keys(style).forEach((key) => {
      expect(div.props().style).toHaveProperty(key)
    })
  })
})
