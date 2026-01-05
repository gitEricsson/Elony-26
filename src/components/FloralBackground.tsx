import floral1 from '@/assets/floral-1.svg';
import floral2 from '@/assets/floral-2.svg';
import floral3 from '@/assets/floral-3.svg';
import floral4 from '@/assets/floral-4.svg';

interface FloralBackgroundProps {
  variant?: 'scattered' | 'corners' | 'sides';
  opacity?: number;
}

const FloralBackground = ({
  variant = 'corners',
  opacity = 0.7,
}: FloralBackgroundProps) => {
  if (variant === 'corners') {
    return (
      <>
        {/* Top Left */}
        <img
          src={floral1}
          alt=""
          className="absolute top-0 left-0 w-32 md:w-48 lg:w-64 pointer-events-none"
          style={{ opacity }}
        />
        {/* Top Right */}
        <img
          src={floral3}
          alt=""
          className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 pointer-events-none transform scale-x-[1]"
          style={{ opacity }}
        />
        {/* Bottom Left */}
        <img
          src={floral4}
          alt=""
          className="absolute bottom-0 left-0 w-32 md:w-48 lg:w-64 pointer-events-none transform scale-y-[-1]"
          style={{ opacity }}
        />
        {/* Bottom Right */}
        <img
          src={floral2}
          alt=""
          className="absolute bottom-0 right-0 w-32 md:w-48 lg:w-64 pointer-events-none transform scale-x-[1] scale-y-[-1]"
          style={{ opacity }}
        />
      </>
    );
  }

  if (variant === 'sides') {
    return (
      <>
        {/* Left Side */}
        <img
          src={floral1}
          alt=""
          className="absolute top-1/4 left-0 w-24 md:w-40 pointer-events-none"
          style={{ opacity }}
        />
        <img
          src={floral4}
          alt=""
          className="absolute bottom-1/4 left-0 w-24 md:w-40 pointer-events-none"
          style={{ opacity }}
        />
        {/* Right Side */}
        <img
          src={floral3}
          alt=""
          className="absolute top-1/4 right-0 w-24 md:w-40 pointer-events-none transform scale-x-[1]"
          style={{ opacity }}
        />
        <img
          src={floral2}
          alt=""
          className="absolute bottom-1/4 right-0 w-24 md:w-40 pointer-events-none transform scale-x-[1] scale-y-[-1]"
          style={{ opacity }}
        />
      </>
    );
  }

  // Scattered variant
  return (
    <>
      <img
        src={floral1}
        alt=""
        className="absolute top-[10%] left-[5%] w-20 md:w-32 pointer-events-none"
        style={{ opacity }}
      />
      <img
        src={floral2}
        alt=""
        className="absolute top-[30%] right-[3%] w-24 md:w-40 pointer-events-none"
        style={{ opacity }}
      />
      <img
        src={floral3}
        alt=""
        className="absolute bottom-[20%] left-[8%] w-20 md:w-36 pointer-events-none"
        style={{ opacity }}
      />
      <img
        src={floral4}
        alt=""
        className="absolute bottom-[40%] right-[5%] w-24 md:w-36 pointer-events-none transform scale-x-[-1]"
        style={{ opacity }}
      />
    </>
  );
};

export default FloralBackground;
