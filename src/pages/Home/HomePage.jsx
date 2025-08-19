import React, {Fragment} from 'react';
import HomeHero from "../../components/Hero/HomeHero.jsx";
import FeaturesSection from "../../components/Features/FeaturesSection.jsx";
import HowItWorks from "../../components/HowWorks/HowItWorks.jsx";
import CTASection from "../../components/CTA/CTASection.jsx";
import TestimonialsSection from "../../components/Testimonials/TestimonialsSection.jsx";

function HomePage() {
    return (
       <Fragment>
           <HomeHero/>
           <FeaturesSection/>
           <HowItWorks/>
           <CTASection/>
           <TestimonialsSection/>
       </Fragment>
    );
}

export default HomePage;

