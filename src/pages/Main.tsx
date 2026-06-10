import Home from './Home';
import Events from './Events';
import About from './About';
import Contact from './Contact';

const Main = () => {
    return(
        <>
            {/* Home Section */}
            <section id="home" className="overflow-x-hidden">
                <Home/>
            </section>

            {/* About Section */}
            <section id="about" className="overflow-x-hidden">
                <About/>
            </section>

            {/* Events Section */}
            <section id="events" className="overflow-x-hidden">
                <Events/>
            </section>

            {/* Contact Section */}
            <section id="contact" className="overflow-x-hidden">
                <Contact/>
            </section>
        </>
    )
}

export default Main;