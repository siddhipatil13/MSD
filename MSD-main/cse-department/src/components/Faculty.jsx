import FacultyCard from './FacultyCard'

const facultyMembers = [
  { name: 'Dr. Ananya Sharma', designation: 'Head of Department', qualification: 'Ph.D. in Computer Science', email: 'ananya.sharma@cse.edu', initials: 'AS' },
  { name: 'Prof. Rohan Mehta', designation: 'Associate Professor', qualification: 'M.Tech. in Software Engineering', email: 'rohan.mehta@cse.edu', initials: 'RM' },
  { name: 'Dr. Priya Nair', designation: 'Assistant Professor', qualification: 'Ph.D. in Information Technology', email: 'priya.nair@cse.edu', initials: 'PN' },
  { name: 'Prof. Vikram Singh', designation: 'Assistant Professor', qualification: 'M.Tech. in Computer Networks', email: 'vikram.singh@cse.edu', initials: 'VS' },
]

function Faculty() {
  return (
    <section id="faculty" className="section">
      <div className="section-heading centered">
        <p className="eyebrow">MEET OUR FACULTY</p>
        <h2>Learn from the <span>best minds.</span></h2>
        <p>Our faculty members bring knowledge, experience, and encouragement to every classroom.</p>
      </div>
      <div className="faculty-grid">
        {facultyMembers.map((faculty) => <FacultyCard key={faculty.email} {...faculty} />)}
      </div>
    </section>
  )
}

export default Faculty
