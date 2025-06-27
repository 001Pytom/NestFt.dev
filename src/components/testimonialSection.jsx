import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import { Testimonial } from './testimonial';

export default function TestimonialsSwiper() {
  return (
    <section className="py-8 md:px-24 px-6 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="sm:text-3xl text-2xl md:text-4xl font-bold mb-4">
            What Developers Say
          </h2>
          <p className="sm:text-lg text-base text-slate-600/80 max-w-2xl mx-auto">
            Hear from developers who have boosted their careers through our platform.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            el: '.my-custom-pagination',
            clickable: true
          }}
        >
          <SwiperSlide>
            <Testimonial
              quote="After completing 5 projects on NestFt.dev, I landed my first developer job! The real-world experience and code reviews made all the difference."
              name="Alex Johnson"
              title="Frontend Developer at TechCorp"
              avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              quote="The collaborative aspect of this platform is amazing. I learned so much working with other developers and receiving feedback on my code."
              name="Sarah Chen"
              title="Full Stack Developer"
              avatar="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              quote="NestFt.dev filled the gap in my resume. I had the knowledge from bootcamp, but needed real projects to show employers. This platform delivered exactly that."
              name="Marcus Williams"
              title="Software Engineer at StartupX"
              avatar="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              quote="The mentorship program here is incredible. Having senior developers review my code and provide personalized feedback accelerated my learning beyond expectations."
              name="Emily Rodriguez"
              title="React Developer at InnovateLab"
              avatar="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              quote="I went from tutorial hell to building production-ready applications. The structured project approach and peer collaboration transformed my coding skills completely."
              name="David Park"
              title="Backend Engineer at CloudTech"
              avatar="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </SwiperSlide>
        </Swiper>

        <div className="my-custom-pagination"></div>
      </div>
    </section>
  );
}
