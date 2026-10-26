const activities = [
  ['01', 'Coding Competitions', 'Test your skills, think quickly, and learn from your peers.'],
  ['02', 'Technical Events', 'Share ideas and see how technology is changing the world.'],
  ['03', 'Workshops', 'Get hands-on experience with tools used by professionals.'],
  ['04', 'Hackathons', 'Work in a team to turn a creative idea into a working project.'],
  ['05', 'Seminars', 'Meet experts and discover new paths in computer science.'],
]

function Activities() {
  return (
    <section id="activities" className="section">
      <div className="section-heading">
        <p className="eyebrow">LIFE BEYOND THE CLASSROOM</p>
        <h2>Learn by <span>doing.</span></h2>
      </div>
      <div className="activity-list">
        {activities.map(([number, title, description]) => (
          <article className="activity-item" key={number}>
            <span className="activity-number">{number}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
            <span className="activity-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities
