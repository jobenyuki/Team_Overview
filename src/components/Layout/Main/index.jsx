import React, { useEffect, useState, useMemo } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Import custom components
import TeamList from 'Components/TeamList'
import MemberList from 'Components/MemberList'
import MemberInfo from 'Components/MemberInfo'
// Import custom hooks
import { useAPI } from 'Hooks'
// Import contexts
import TeamContext from 'Contexts'
// Import styles
import './style.scss'

const Main = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [teams, setTeams] = useState([])
  const [members, setMembers] = useState([])
  const { fetchTeams, fetchMembers } = useAPI()

  const { data: teamData, status: teamStatus, error: teamError } = fetchTeams
  const { data: memberData, status: memberStatus, error: memberError } = fetchMembers

  useEffect(() => {
    if (teamStatus === 'loading' || memberStatus === 'loading') {
      setLoading(true)
    } else if (teamStatus === 'error') {
      setError(teamError.message)
    } else if (memberStatus === 'error') {
      setError(memberError.message)
    } else {
      const newMembers = memberData.map((item) => {
        return {
          ...item,
          dateJoined: new Date().toLocaleString(),
          title: 'Frontend Developer',
        }
      })

      const newTeams = teamData.map((item) => {
        const teamMembers = newMembers.filter((member) => member.teamId.includes(item.id))

        return {
          ...item,
          dateCreated: new Date().toLocaleString(),
          description: `${item.name} is a team created for test exercise. Team consists of lead and engineers.`,
          memberCount: teamMembers.length,
          lead: teamMembers[0],
        }
      })

      setTeams(newTeams)
      setMembers(newMembers)
      setLoading(false)
      setError('')
    }
  }, [teamData, memberData])

  const providerVal = useMemo(() => ({ teams, members }), [teams, members])

  return (
    <Router>
      <div className="main">
        {loading && <div className="main__loading">Loading...</div>}
        {error && <div className="main__error">{error}</div>}
        <TeamContext.Provider value={providerVal}>
          <Route path="/" exact component={TeamList} />
          <Route path="/teams/:teamId" component={MemberList} />
          <Route path="/members/:memberId" component={MemberInfo} />
        </TeamContext.Provider>
      </div>
    </Router>
  )
}

export default Main
