import profile from '../../assets/profile.png'
const StudentDashboard = () => {
  return (
    <div>
      <div className="student-header">
        <div className="student-profile">
          <img src={profile} alt="Student Profile" width={60} height={60} />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
