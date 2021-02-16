import { useQuery } from 'react-query'
// Import configs
import HOST_URL from 'Configs'

const useAPI = (id = '') => {
  // Fetch teams
  const fetchTeamsRequest = async () => {
    const res = await fetch(`${HOST_URL}/teams/`)
    return res.json()
  }

  // Fetch team
  const fetchTeamRequest = async () => {
    const res = await fetch(`${HOST_URL}/teams/${id}`)
    return res.json()
  }

  // Fetch members(users)
  const fetchMembersRequest = async () => {
    const res = await fetch(`${HOST_URL}/users/`)
    return res.json()
  }

  // Fetch member
  const fetchMemberRequest = async () => {
    const res = await fetch(`${HOST_URL}/users/${id}`)
    return res.json()
  }

  const fetchTeams = useQuery('teams', fetchTeamsRequest)
  const fetchTeam = useQuery('team', fetchTeamRequest)
  const fetchMembers = useQuery('members', fetchMembersRequest)
  const fetchMember = useQuery('member', fetchMemberRequest)

  return { fetchTeams, fetchTeam, fetchMembers, fetchMember }
}

export default useAPI
