
import CircularGallery from "./bits/CircularGallery";
import SplitText from "./bits/SplitText";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";



const images = [
    {
        image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778088/8_i9r6an.jpg',
        text: 'Bhutki 💕'
      },
    //   {
    //     image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778088/3_khc8a9.jpg',
    //     text: 'Palm Trees'
    //   },
      {
        image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778088/7_rluwdl.jpg',
        text: 'Forever 💖'
      },
      {
        image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778088/23_cmeiv9.jpg',
        text: 'Pasand6ida Aurat 😘'
      },
      {
        image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778089/9_ytlvyl.jpg',
        text: 'Best Friend 💛'
      },
    //   {
    //     image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778088/2_ziowgt.jpg',
    //     text: 'Special One'
    //   },
      {
        image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778088/5_feqia8.jpg',
        text: 'Mahila Mitra 🤞'
      },
      {
        image: 'https://res.cloudinary.com/danishcloudnary/image/upload/v1757778088/4_jpcz9e.jpg',
        text: 'Friendship 🤝'
      }
]


const HeroSection = () => {
  return (
    <div className="">
    <BackgroundBeamsWithCollision className="flex flex-col items-center justify-center py-20">
      <div className="my-10 relative z-20">
        <SplitText text="Pasandida Aurat" className="text-5xl md:text-7xl font-bold" />
        <div className="relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>
      </div>

{/* Circular Gallery */}
      <CircularGallery
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.02}
        />
    </BackgroundBeamsWithCollision>

        {/* Infinite Moving Images */}
        <InfiniteMovingCards items={images} />
    </div>

  );
};

export default HeroSection;
