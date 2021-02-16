import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
// Import custom components
import { Avatar } from 'Components/Common'
// Import custom hooks
import { useAPI } from 'Hooks'
// Import styles
import './style.scss'

const MemberInfo = () => {
  const { memberId } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { fetchMember } = useAPI(memberId)
  const { data: memberData, status: memberStatus, error: memberError } = fetchMember

  useEffect(() => {
    if (memberStatus === 'loading') {
      setLoading(true)
    } else if (memberStatus === 'error') {
      setError(memberError.message)
    } else {
      setLoading(false)
      setError('')
    }
  }, [memberData, memberId])

  // Listener for back button clicked
  const handleBackButtonClicked = () => {
    history.goBack()
  }

  return (
    <div className="member-info">
      {loading && <div className="member-info__loading">Loading...</div>}
      {error && <div className="member-info__error">{error}</div>}
      <Avatar className="member-info__avatar" memberName={memberData ? memberData.name : ''} />
      <h2 className="member-info__member-name">{memberData ? memberData.name : ''}</h2>
      <button className="member-info__back-button" onClick={handleBackButtonClicked}>
        Back
      </button>
    </div>
  )
}

export default MemberInfo
