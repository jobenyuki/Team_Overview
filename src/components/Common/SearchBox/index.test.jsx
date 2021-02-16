import React from 'react'
import { mount } from 'enzyme'
// Import custom components
import SearchBox from './index'

const props = {
  id: 'id',
  name: 'name',
  className: 'className',
  value: 'value',
  onChange: jest.fn(),
}

describe('SearchBox component', () => {
  let wrapper
  let input

  beforeEach(() => {
    wrapper = mount(<SearchBox {...props} />)
    input = wrapper.find('.search-box__input')
  })

  it('accepts props', () => {
    expect(wrapper.exists(`.${props.className}`)).toBe(true)
    expect(wrapper.props().id).toBe(props.id)
    expect(wrapper.props().name).toBe(props.name)
    expect(input.props().value).toBe(props.value)
    expect(input.props().onChange).toBe(props.onChange)
  })

  it('works with onChange', () => {
    input.simulate('change')
    expect(props.onChange).toHaveBeenCalled()
  })
})
