const ResponsiveImage = (props) => {
    return (
      <picture className="h-full w-full rounded-xl" >
        <source media="(min-width: 40rem)" srcSet={props.desktopImage} />
        <img className="w-full h-full" src={props.mobileImage} alt={props.alt} />
      </picture>
    );
}

export default ResponsiveImage;