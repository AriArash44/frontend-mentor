const ResponsiveImage = (props) => {
    return (
      <picture>
        <source media="(min-width: 640px)" srcSet={props.desktopImage} />
        <img className="h-full w-full rounded-xl" src={props.mobileImage} alt={props.alt} />
      </picture>
    );
}

export default ResponsiveImage;