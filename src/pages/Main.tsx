import Home from './Home';
import Events from './Events';
import About from './About';
import Contact from './Contact';

const Main = () => {
    return(
        <>
            {/* Home Section */}
            <section id="home">
                <Home/>
            </section>

            {/* About Section */}
            <section id="about">
                <About/>
            </section>

            {/* Events Section */}
            <section id="events">
                <Events/>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <Contact/>
            </section>
        </>
    )
}

export default Main;