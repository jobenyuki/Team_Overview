import React from 'react'
import { mount } from 'enzyme'
// Import custom components
import TeamListItem from './index'

const props = {
  id: 'id',
  name: 'name',
  className: 'className',
  teamInfo: {
    id: 'id',
    name: 'name',
    dateCreated: 'dateCreated',
    description: 'description',
    memberCount: 0,
    lead: {
      id: 'id',
      name: 'name',
    },
  },
  onTeamClick: jest.fn(),
  onLeadClick: jest.fn(),
}

describe('TeamListItem component', () => {
  let wrapper
  let teamDetailButton
  let leadDetailButton

  beforeEach(() => {
    wrapper = mount(<TeamListItem {...props} />)
    teamDetailButton = wrapper.find('.team-list-item__name')
    leadDetailButton = wrapper.find('.team-list-item__lead-name')
  })

  it('accepts props', () => {
    expect(wrapper.exists(`.${props.className}`)).toBe(true)
    expect(wrapper.props().id).toBe(props.id)
    expect(wrapper.props().name).toBe(props.name)
    expect(wrapper.containsMatchingElement(props.teamInfo.name)).toBe(true)
    expect(wrapper.containsMatchingElement(props.teamInfo.dateCreated)).toBe(true)
    expect(wrapper.containsMatchingElement(props.teamInfo.description)).toBe(true)
    expect(wrapper.containsMatchingElement(props.teamInfo.lead.name)).toBe(true)
  })

  it('works with event for going to team detail', () => {
    teamDetailButton.simulate('click')
    expect(props.onTeamClick).toHaveBeenCalled()
  })

  it('works with event for going to lead detail', () => {
    leadDetailButton.simulate('click')
    expect(props.onLeadClick).toHaveBeenCalled()
  })
})
