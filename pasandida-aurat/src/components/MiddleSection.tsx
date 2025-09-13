import { WavyBackground } from "./ui/wavy-background"

const MiddleSection = ()=>{

    return(
        <div className="relative h-[35rem] top-0 overflow-hidden flex items-center justify-center">
        <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-6xl text-white font-bold text-center mb-2">Best Friend Forever</h2>
        <p className="text-base italic md:text-lg text-white text-center px-4">We’ve shared eight wonderful years of friendship, creating countless memories together, and I wish we could stay like this forever.</p>
        <p className="text-base italic md:text-lg text-white text-center">My Bhutki 💕</p>
        <div className="flex flex-row justify-center items-center w-full mb-10">
            {/* <AnimatedTooltip items={instructors} /> */}
        </div>
        </WavyBackground>
    </div>
    )
}

export default MiddleSection;