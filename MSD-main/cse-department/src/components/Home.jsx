function Home() {
  return (
    <section id="home" className="hero section">
      <div className="hero-copy">
        <p className="eyebrow">LEARN • BUILD • INNOVATE</p>
        <h1>Shape the future with <span>technology.</span></h1>
        <p className="hero-text">
          Welcome to the Department of Computer Science and Engineering, where
          curious minds become confident creators and problem solvers.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">Explore Department <span>→</span></a>
          <a className="button button-secondary" href="#contact">Contact Us</a>
        </div>
      </div>
      <div className="hero-art" aria-label="Abstract computer science illustration">
        <div className="code-window">
          <div className="window-dots"><i /><i /><i /></div>
          <p><span className="code-purple">const</span> future <span className="code-blue">=</span> <span className="code-green">learn</span>();</p>
          <p><span className="code-purple">if</span> (passion) {'{'}</p>
          <p className="indent">create<span className="code-blue">.</span>impact();</p>
          <p>{'}'}</p>
        </div>
        <div className="orb orb-one" />
        <div className="orb orb-two" />
      </div>
    </section>
  )
}

export default Home
