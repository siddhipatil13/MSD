const achievements = [
  ['🏆', 'Best Student Project', 'Our final-year team won first prize at the annual project exhibition.'],
  ['🚀', 'Hackathon Champions', 'Students secured a top position in the inter-college innovation challenge.'],
  ['💡', 'Research Publication', 'Faculty and students published research in a national conference.'],
]

function Achievements() {
  return (
    <section id="achievements" className="section achievements-section">
      <div className="section-heading centered">
        <p className="eyebrow">PROUD MOMENTS</p>
        <h2>Our recent <span>achievements.</span></h2>
      </div>
      <div className="achievement-grid">
        {achievements.map(([icon, title, description]) => (
          <article className="achievement-card" key={title}>
            <span className="achievement-icon">{icon}</span><h3>{title}</h3><p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Achievements
