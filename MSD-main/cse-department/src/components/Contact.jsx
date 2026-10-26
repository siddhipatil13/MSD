function Contact() {
  return (
    <section id="contact" className="section light-section">
      <div className="contact-grid">
        <div>
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>We&apos;d love to <span>hear from you.</span></h2>
          <p className="contact-intro">Have a question about our department? Send us a message and we&apos;ll be happy to help.</p>
          <div className="contact-details">
            <p><strong>⌖</strong> CSE Building, Knowledge Campus<br />University Road, City - 400001</p>
            <p><strong>@</strong> cse.department@college.edu</p>
            <p><strong>☎</strong> +91 98765 43210</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name">Your name</label>
          <input id="name" type="text" placeholder="Enter your name" />
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="you@example.com" />
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="4" placeholder="How can we help?" />
          <button className="button button-primary" type="submit">Send Message <span>→</span></button>
        </form>
      </div>
    </section>
  )
}

export default Contact
