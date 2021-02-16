import React, { useEffect, useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AutoSizer, List } from 'react-virtualized'
import { times } from 'lodash'
// Import custom components
import { MemberListItem, SearchBox } from 'Components/Common'
// Import contexts
import TeamContext from 'Contexts'
// Import custom hooks
import { useAPI } from 'Hooks'
// Import constants
import { CARD_WIDTH, CARD_HEIGHT } from 'Constants'
// Import styles
import './style.scss'

const MemberList = () => {
  const { members } = useContext(TeamContext)
  const { teamId } = useParams()
  const history = useHistory()
  const [srcMembers, setSrcMembers] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [filteredMembers, setFilteredMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { fetchTeam } = useAPI(teamId)
  const { data: teamData, status: teamStatus, error: teamError } = fetchTeam

  useEffect(() => {
    if (teamStatus === 'loading') {
      setLoading(true)
    } else if (teamStatus === 'error') {
      setError(teamError.message)
    } else {
      setLoading(false)
      setError('')
    }
  }, [teamData])

  // Update filtered members
  useEffect(() => {
    const newSrcMembers = members.filter((member) => member.teamId.includes(teamId))
    setSrcMembers(newSrcMembers)
    setFilteredMembers(newSrcMembers)
    setSearchVal('')
  }, [members])

  // Listener for back button clicked
  const handleBackButtonClicked = () => {
    history.goBack()
  }

  // Listener for searchbox changed
  const handleSearchBoxChanged = (e) => {
    const newSearchVal = e.target.value
    const newFilteredMembers = srcMembers.filter((member) => {
      const upperCasedSearchVal = newSearchVal.toUpperCase()
      return (
        member.name.toUpperCase().includes(upperCasedSearchVal) ||
        member.dateJoined.toUpperCase().includes(upperCasedSearchVal) ||
        member.title.toUpperCase().includes(upperCasedSearchVal)
      )
    })

    setSearchVal(newSearchVal)
    setFilteredMembers(newSearchVal ? newFilteredMembers : srcMembers)
  }

  // Listener for member clicked
  const handleMemberClicked = (index) => {
    history.push(`/members/${filteredMembers[index].id}`)
  }

  return (
    <div className="member-list">
      {loading && <div className="member-list__loading">Loading...</div>}
      {error && <div className="member-list__error">{error}</div>}
      <h2 className="member-list__team-title">{teamData ? teamData.name : ''}</h2>
      <button className="member-list__back-button" onClick={handleBackButtonClicked}>
        Back
      </button>
      <SearchBox
        className="member-list__search-box"
        value={searchVal}
        onChange={handleSearchBoxChanged}
      />
      <AutoSizer className="member-list__auto-sizer">
        {({ height, width }) => {
          const cardItemsPerRow = Math.floor(width / CARD_WIDTH)
          const rowCount = Math.ceil(filteredMembers.length / cardItemsPerRow)

          return (
            <List
              className="member-list__list"
              width={width}
              height={height}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT}
              rowRenderer={({ index: rowIndex, key, style }) => {
                let items = []
                const fromIndex = rowIndex * cardItemsPerRow
                const toIndex = Math.min(fromIndex + cardItemsPerRow, filteredMembers.length)

                times(toIndex - fromIndex, (colIndex) => {
                  items = [
                    ...items,
                    <MemberListItem
                      className="member-list__item"
                      memberInfo={filteredMembers[colIndex + fromIndex]}
                      onMemberClick={() => handleMemberClicked(colIndex + fromIndex)}
                      key={`member-list-item-${colIndex + fromIndex}`}
                    />,
                  ]
                })

                return (
                  <div
                    className="member-list__row"
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

export default MemberList
