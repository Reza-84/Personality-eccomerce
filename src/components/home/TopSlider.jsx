import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function TopSlider() {
  const slides = [
    {
      image: '/images/banner/pic1.png',
      tag: '#FASHION DAY',
      offer: '35% Off',
      desc: 'Discover our latest Products',
      link: '/product',
      alignRight: false,
    },
    {
      image: '/images/banner/pic2.png',
      tag: '#WINTER SALE',
      offer: '35% Off',
      desc: 'Discover our latest Products',
      link: '/product',
      alignRight: true,
    },
    {
      image: '/images/banner/pic3.png',
      tag: '#FASHION DAY',
      offer: '35% Off',
      desc: 'Discover our latest Products',
      link: '/product',
      alignRight: false,
    },
    {
      image: '/images/banner/pic4.png',
      tag: '#SPRING OFFER',
      offer: '25% Off',
      desc: 'Hot deals just arrived!',
      link: '/product',
      alignRight: true,
    }
  ];

  return (
    <div className="dz-banner">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        dir="rtl"
        spaceBetween={0}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="banner-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="banner-bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div
              className={`banner-content ${slide.alignRight ? 'content-right' : ''}`}
            >
              <span className="font-w500">{slide.tag}</span>
              <h2 className="offer">{slide.offer}</h2>
              <p>{slide.desc}</p>
              <Link to={slide.link} className="btn btn-primary btn-sm">
                Shop Now
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination bullets */}
      <div className="swiper-pagination style-2 custom-swiper-pagination"></div>
    </div>
  );
}
