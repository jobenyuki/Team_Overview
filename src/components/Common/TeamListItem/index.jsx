import React from 'react'
// Import custom components
import { Avatar, Label } from 'Components/Common'
// Import styles
import './style.scss'

const TeamListItem = ({
  teamInfo = null,
  onTeamClick = null,
  onLeadClick = null,
  className = '',
  ...rest
}) => {
  return teamInfo ? (
    <div className={`team-list-item ${className}`} {...rest}>
      <div className="team-list-item__label-group">
        <Label className="team-list-item__label" round>
          Software Product
        </Label>
      </div>
      <button className="team-list-item__name" onClick={onTeamClick}>
        {teamInfo.name}
      </button>
      <p className="team-list-item__date-created">{teamInfo.dateCreated}</p>
      <p className="team-list-item__description">{teamInfo.description}</p>
      <div className="team-list-item__members">
        <Avatar className="team-list-item__lead-avatar" memberName={teamInfo.lead.name} />
        <button className="team-list-item__lead-name" onClick={onLeadClick}>
          {teamInfo.lead.name}
        </button>
        <span className="team-list-item__member-count">
          {` and ${teamInfo.memberCount - 1} members`}
        </span>
      </div>
      <div className="team-list-item__keywords">
        <p>Keywords</p>
        <Label className="team-list-item__keyword" outline>
          Software
        </Label>
        <Label className="team-list-item__keyword" outline>
          Research
        </Label>
        <Label className="team-list-item__keyword" outline>
          CI/CD
        </Label>
      </div>
    </div>
  ) : null
}

export default TeamListItem
