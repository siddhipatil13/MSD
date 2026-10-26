import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Faculty from './components/Faculty'
import Courses from './components/Courses'
import Activities from './components/Activities'
import Achievements from './components/Achievements'
import NodeFileProcessing from './components/NodeFileProcessing'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Faculty />
        <Courses />
        <NodeFileProcessing />
        <Activities />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
