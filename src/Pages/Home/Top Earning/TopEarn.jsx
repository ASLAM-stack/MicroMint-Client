import { useEffect, useState } from "react";
import SectionTitle from "../../../Component/SectionTitle";
import TopEarnCard from "./TopEarnCard";

 
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
const TopEarn = () => {
    const [top,setTop] = useState([])
    useEffect(()=> {
        fetch('/TopEarnin.json')
        .then(res => res.json())
        .then(data =>{
            setTop(data)
        })
    },[])
    return (
        <div className="container">
            <div id="topEarn" className="mt-24">
                <SectionTitle heading={'top Freelancer'} subHeading={'Make Money'}></SectionTitle>
                <div>
                <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper mb-12"
      > 
                    {
                        top.map((item,index) => <SwiperSlide key={index}>
                            <TopEarnCard key={index} item={item}></TopEarnCard>
                        </SwiperSlide>)
                    }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TopEarn;