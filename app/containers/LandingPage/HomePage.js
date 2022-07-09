import React from 'react';
import { ScrollSpy } from 'organism-react-scroll-nav';
import {
  Banner,
  Feature,
  Showcase,
  Testimonials,
  AboutUs,
  Technology,
  Pricing,
  Contact
} from 'dan-components';

function HomePage() {
  return (
    <div>
      <section id="banner">
        <Banner />
      </section>
      <ScrollSpy id="feature">
        <Feature />
      </ScrollSpy>
      <ScrollSpy id="showcase">
        <Showcase />
      </ScrollSpy>
      {/* <ScrollSpy id="testimonials">
        <Testimonials />
      </ScrollSpy> */}
      {/* <ScrollSpy id="technology">
        <Technology />
      </ScrollSpy> */}
      <ScrollSpy id="about">
        <AboutUs />
      </ScrollSpy>
      <ScrollSpy id="pricing">
        <Pricing />
      </ScrollSpy>
      {/* <ScrollSpy id="contact">
        <Contact />
      </ScrollSpy> */}
    </div>
  );
}

export default HomePage;
