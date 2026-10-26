import CourseCard from './CourseCard'

const courses = [
  ['01', 'Data Structures', 'Learn to organize data and solve problems efficiently.', '{}'],
  ['02', 'Database Management Systems', 'Understand how applications store and manage information.', '▦'],
  ['03', 'Operating Systems', 'Explore the software that makes computers work.', '◫'],
  ['04', 'Computer Networks', 'Discover how devices communicate across the world.', '⌁'],
  ['05', 'Web Development', 'Build useful and engaging websites with modern tools.', '</>'],
  ['06', 'Artificial Intelligence', 'Learn how machines can solve problems intelligently.', '✧'],
]

function Courses() {
  return (
    <section id="courses" className="section light-section">
      <div className="section-heading centered">
        <p className="eyebrow">WHAT YOU&apos;LL LEARN</p>
        <h2>Explore our <span>core courses.</span></h2>
      </div>
      <div className="course-grid">
        {courses.map(([number, title, description, icon]) => <CourseCard key={number} number={number} title={title} description={description} icon={icon} />)}
      </div>
    </section>
  )
}

export default Courses
