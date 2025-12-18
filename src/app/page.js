'use client';

import Acomplishments from '@/components/Acomplishments/Acomplishments';
import Hero from '@/components/Hero/Hero';
import Projects from '@/components/Projects/Projects';
import Technologies from '@/components/Technologies/Technologies';
import Timeline from '@/components/TimeLine/TimeLine';
import Blogs from '@/components/Blogs/Blogs';
import { Layout } from '@/layout/Layout';
const Home = () => {
    return (
        <Layout>
            <Hero />
            <Projects />
            <Technologies />
            <Timeline />
            {/* <Blogs /> */}
            {/* <Acomplishments /> */}
        </Layout>
    );
};

export default Home;
