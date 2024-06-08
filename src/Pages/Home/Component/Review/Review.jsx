import SectionTitle from "../../../../Component/SectionTitle";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

 

 

const Review = () => {
    const [review, setRiew] = useState([]);
     useEffect(()=>{
       fetch('http://localhost:5000/reviews')
       .then(res => res.json())
       .then(data => {
        setRiew(data)
        console.log(data);
       })
     },[])
    return (
        <div id="review" className="container">
            <div className="mt-24 mb-10">
                <SectionTitle subHeading={'Happy Client'} heading={"what's our client say"}></SectionTitle>
                <div className="flex gap-5 flex-wrap p-4">
                    <div className="md:w-2/5 w-full">
                        <img src='/happy.png' alt="" />
                    </div>
                    <div className="md:w-1/2 w-full md:flex-1">
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
            className="mySwiper"
        >
          {review.map((item) => (
            <SwiperSlide key={item._id}>

                <div className="text-center flex flex-col items-center justify-center mx-24 my-16">
                <div className="avatar">
  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mb-2">
    <img src={item.image} />
  </div>
</div>
                <h3 className="text-2xl">{item.name}</h3>
                    <Rating style={{ maxWidth: 200 }} value={item.rating} readOnly></Rating>
                     
                    <p className="py-8">{item.details}</p>
                    
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Review;