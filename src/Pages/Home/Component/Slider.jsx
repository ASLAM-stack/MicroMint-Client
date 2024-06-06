import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";

const Slider = () => {
    return (
        <div className="p-2 md:p-0 container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper mt-12"
          >
            <SwiperSlide>
              <div className="bg-[url('/slider.jpg')] space-y-4 w-full pl-4 md:pl-16 h-[600px]  flex flex-col justify-center rounded-2xl bg-no-repeat   silder_1 ">
                <div className="space-y-4 border-l-2 pl-4 border-[#c65ce0d2]">
                <Fade direction='down' triggerOnce={true}>
                  <p className="text-xl font-medium  text-[#e64210ec]">Welcome to <span className="font-satis"> MicroMint</span></p>
                  </Fade>
                  <h1 className="md:text-7xl font-bold text-white font-robo text-2xl">
                  Easy way to get <br />
                  your dream jobstalents
                  </h1>
                  <p className="text-white  mt-2"> Fill your job in hours, not weeks. Search for free.</p>
                  <Fade direction='up' triggerOnce={true}>
                  <Link className="btn btn-outline btn-secondary">Discover Now</Link>
                  </Fade>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[url('/banner.jpg')] space-y-4 w-full pl-4 md:pl-16 h-[600px] bg-cover flex flex-col justify-center bg-center rounded-2xl  silder_1" >
                <div className="space-y-2 border-l-2 pl-4 border-[#c65ce0d2]">
                <Slide direction='left' triggerOnce={true}>
                  <p className="text-xl font-medium  text-[#ffffffec]">Explore More</p>
                  
                  <h1 className="md:text-6xl font-bold text-[#ffffff] font-robo text-2xl">
                  Freelance Services <br /> For Your Business 
                  </h1>
                  <p className="text-white  mt-2"> Millions of people use freeio.com to turn their ideas into reality.</p>
                  <Link className="btn btn-outline btn-secondary">Discover Now</Link>
                   
                  </Slide>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[url('/slider3.jpg')] space-y-4 w-full pl-4 md:pl-16 h-[600px] bg-cover flex flex-col justify-center bg-center rounded-2xl silder_1" >
                <div className="space-y-2 border-l-2 pl-4 border-[#c65ce0d2]">
                <Fade direction='up' triggerOnce={true}>
                  <p className="text-xl font-medium  text-[#e64210ec]">
                    Make a new choice
                  </p>
                  
                  <h1 className="md:text-6xl font-bold text-white font-robo text-2xl">
                  Hire the best freelancers <br />
 for any job, online
                  </h1>
                   <p className="text-white  mt-2">Millions of people use freeio.com to turn their ideas into reality</p>
                  <Link className="btn btn-outline btn-secondary">Discover Now</Link>
                   
                  </Fade>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[url('/slider4.jpg')] space-y-4 w-full pl-4 md:pl-16 h-[600px]  flex flex-col justify-center  rounded-2xl silder_1" >
                <div className="space-y-2 border-l-2 pl-4 border-[#c65ce0d2]">
                <Fade direction='up' triggerOnce={true}>
                  <p className="text-xl font-medium  text-[#e64210ec]">
                    Make a new choice
                  </p>
                  
                  <h1 className="md:text-6xl font-bold text-white font-robo text-2xl">
                  Join us & Explore <br />
Thousands of Jobs 
                  </h1>
                  <p className="text-white  mt-2"> Work with talented people at the most affordable
                  price to get the most out of your time and cost.</p>
                   
                  <Link className="btn btn-outline btn-secondary">Discover Now</Link>
                   
                  </Fade>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      );
};

export default Slider;