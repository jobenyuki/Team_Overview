import React from 'react'
// Import custom components
import { Avatar, Label } from 'Components/Common'
// Import styles
import './style.scss'

const MemberListItem = ({ memberInfo = null, onMemberClick = null, className = '', ...rest }) => {
  return memberInfo ? (
    <div className={`member-list-item ${className}`} {...rest}>
      <div className="member-list-item__label-group">
        <Label className="member-list-item__label" round>
          Software Engineer
        </Label>
      </div>
      <div className="member-list-item__member-info">
        <Avatar className="member-list-item__avatar" memberName={memberInfo.name} />
        <button className="member-list-item__name" onClick={onMemberClick}>
          {memberInfo.name}
        </button>
        <p className="member-list-item__date-joined">{memberInfo.dateJoined}</p>
        <p className="member-list-item__description">{memberInfo.title}</p>
      </div>
    </div>
  ) : null
}

export default MemberListItem
