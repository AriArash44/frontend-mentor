import SignupLayout from "../layout/signup";
import ResponsiveImage from "../common/Image";
import ListItem from "../common/ListItem";
import illustrationSignupMobile from "../../assets/images/illustration-sign-up-mobile.svg";
import illustrationSignupDesktop from "../../assets/images/illustration-sign-up-desktop.svg";

const SignupPage = () => {
    return (
      <SignupLayout> 
        <SignupLayout.Figure>
          <ResponsiveImage desktopImage={illustrationSignupDesktop} mobileImage={illustrationSignupMobile} alt="illustration sign up image"/>
        </SignupLayout.Figure>
        <SignupLayout.Header>
          <h1 className="font-bold">Stay Updated!</h1>
        </SignupLayout.Header>
        <SignupLayout.Main>
          <p className="mt-2 mb-4">Join 60,000+ product managers receiving monthly updates on:</p>
          <ListItem title="Product discovery and building what matters"/>
          <ListItem title="Measuring to ensure updates are a success"/>
          <ListItem title="And much more!"/>
          
        </SignupLayout.Main>
      </SignupLayout>
    );
};

export default SignupPage;