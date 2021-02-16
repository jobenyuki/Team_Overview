import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AutoSizer, List } from 'react-virtualized'
import { times } from 'lodash'
// Import custom components
import { TeamListItem, SearchBox } from 'Components/Common'
// Import contexts
import TeamContext from 'Contexts'
// Import constants
import { CARD_WIDTH, CARD_HEIGHT } from 'Constants'
// Import styles
import './style.scss'

const TeamList = () => {
  const { teams } = useContext(TeamContext)
  const history = useHistory()
  const [searchVal, setSearchVal] = useState('')
  const [filteredTeams, setFilteredTeams] = useState([])

  // Update filteredteams
  useEffect(() => {
    setFilteredTeams(teams)
    setSearchVal('')
  }, [teams])

  // Listener for searchbox changed
  const handleSearchBoxChanged = (e) => {
    const newSearchVal = e.target.value
    const newFilteredTeams = teams.filter((team) => {
      const upperCasedSearchVal = newSearchVal.toUpperCase()
      return (
        team.name.toUpperCase().includes(upperCasedSearchVal) ||
        team.dateCreated.toUpperCase().includes(upperCasedSearchVal) ||
        team.description.toUpperCase().includes(upperCasedSearchVal) ||
        team.memberCount.toString().toUpperCase().includes(upperCasedSearchVal) ||
        team.lead.name.toUpperCase().includes(upperCasedSearchVal)
      )
    })

    setSearchVal(newSearchVal)
    setFilteredTeams(newSearchVal ? newFilteredTeams : teams)
  }

  // Listener for team clicked
  const handleTeamClicked = (index) => {
    history.push(`/teams/${filteredTeams[index].id}`)
  }

  // Listener for leader clicked
  const handleLeadClicked = (index) => {
    history.push(`/members/${filteredTeams[index].lead.id}`)
  }

  return (
    <div className="team-list">
      <SearchBox
        className="team-list__search-box"
        value={searchVal}
        onChange={handleSearchBoxChanged}
      />
      <AutoSizer className="team-list__auto-sizer">
        {({ height, width }) => {
          const cardItemsPerRow = Math.floor(width / CARD_WIDTH)
          const rowCount = Math.ceil(filteredTeams.length / cardItemsPerRow)

          return (
            <List
              className="team-list__list"
              width={width}
              height={height}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT}
              rowRenderer={({ index: rowIndex, key, style }) => {
                let items = []
                const fromIndex = rowIndex * cardItemsPerRow
                const toIndex = Math.min(fromIndex + cardItemsPerRow, filteredTeams.length)

                times(toIndex - fromIndex, (colIndex) => {
                  items = [
                    ...items,
                    <TeamListItem
                      className="team-list__item"
                      teamInfo={filteredTeams[colIndex + fromIndex]}
                      onTeamClick={() => handleTeamClicked(colIndex + fromIndex)}
                      onLeadClick={() => handleLeadClicked(colIndex + fromIndex)}
                      key={`team-list-item-${colIndex + fromIndex}`}
                    />,
                  ]
                })

                return (
                  <div
                    className="team-list__row"
                    key={key}
                    style={{ ...style, display: 'flex', justifyContent: 'center' }}
                  >
                    {items}
                  </div>
                )
              }}
            />
          )
        }}
      </AutoSizer>
    </div>
  )
}

export default TeamList
