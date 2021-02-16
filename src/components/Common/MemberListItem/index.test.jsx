import React from 'react'
import { mount } from 'enzyme'
// Import custom components
import MemberListItem from './index'

const props = {
  id: 'id',
  name: 'name',
  className: 'className',
  memberInfo: {
    id: 'id',
    name: 'name',
    dateJoined: 'dateJoined',
    title: 'title',
  },
  onMemberClick: jest.fn(),
}

describe('MemberListItem component', () => {
  let wrapper
  let memberDetailButton

  beforeEach(() => {
    wrapper = mount(<MemberListItem {...props} />)
    memberDetailButton = wrapper.find('.member-list-item__name')
  })

  it('accepts props', () => {
    expect(wrapper.exists(`.${props.className}`)).toBe(true)
    expect(wrapper.props().id).toBe(props.id)
    expect(wrapper.props().name).toBe(props.name)
    expect(wrapper.containsMatchingElement(props.memberInfo.name)).toBe(true)
    expect(wrapper.containsMatchingElement(props.memberInfo.dateJoined)).toBe(true)
    expect(wrapper.containsMatchingElement(props.memberInfo.title)).toBe(true)
  })

  it('works with event for going to member detail', () => {
    memberDetailButton.simulate('click')
    expect(props.onMemberClick).toHaveBeenCalled()
  })
})
