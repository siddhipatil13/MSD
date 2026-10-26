function CourseCard({ number, title, description, icon }) {
  return (
    <article className="course-card">
      <div className="course-top"><span className="course-icon">{icon}</span><span className="course-number">{number}</span></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default CourseCard
