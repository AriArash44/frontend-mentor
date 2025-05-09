import { useSelector } from 'react-redux';

const ResponsiveImage = (props) => {
    const isActive = useSelector((state) => state.buttonStateSlice.active);
    return (
      <div
        className={`
          relative h-full w-full 
          ${isActive ? "overflow-hidden rounded-none" : "rounded-xl"}
        `}
      >
        <picture className="w-full h-full">
          <source media="(min-width: 40rem)" srcSet={props.desktopImage} />
          <img
            className={`
              w-full h-full object-cover transition-transform duration-300
              ${isActive ? "scale-105" : ""}
            `}
            src={props.mobileImage}
            alt={props.alt}
          />
        </picture>
      </div>
    );
};

export default ResponsiveImage;
