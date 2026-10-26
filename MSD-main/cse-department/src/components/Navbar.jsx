const links = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Faculty', 'faculty'],
  ['Courses', 'courses'],
  ['Activities', 'activities'],
  ['Achievements', 'achievements'],
  ['Web Lab', 'web-lab'],
  ['Contact', 'contact'],
]

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#home">
        <span className="brand-mark">&lt;/&gt;</span>
        <span>
          <strong>CSE Department</strong>
          <small>Computer Science &amp; Engineering</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        {links.map(([label, id]) => (
          <a href={`#${id}`} key={id}>{label}</a>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
