function FacultyCard({ name, designation, qualification, email, initials }) {
  return (
    <article className="faculty-card">
      <div className="faculty-avatar">{initials}</div>
      <h3>{name}</h3>
      <p className="faculty-role">{designation}</p>
      <p><strong>Qualification:</strong> {qualification}</p>
      <a href={`mailto:${email}`}>{email}</a>
    </article>
  )
}

export default FacultyCard
