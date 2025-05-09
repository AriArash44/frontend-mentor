import { useDispatch } from 'react-redux';
import { fetchData } from '../../stores/slices/fetchResultState';
import { useForm } from "react-hook-form";
import SignupLayout from "../layout/Signup";
import ResponsiveImage from "../common/Image";
import ListItem from "../common/ListItem";
import illustrationSignupMobile from "../../assets/images/illustration-sign-up-mobile.svg";
import illustrationSignupDesktop from "../../assets/images/illustration-sign-up-desktop.svg";
import Button from '../common/Button';

const emailValidationMessage = "Valid email required";

const SignupPage = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {dispatch(fetchData(`signup(${Object.keys(data).map((key) => {return (`${key}: "${data[key]}"`)})})`))};
    return (
      <SignupLayout> 
        <SignupLayout.Figure>
          <ResponsiveImage desktopImage={illustrationSignupDesktop} mobileImage={illustrationSignupMobile} alt="illustration sign up image"/>
        </SignupLayout.Figure>
        <SignupLayout.Header>
          <h1 className="font-bold">Stay Updated!</h1>
        </SignupLayout.Header>
        <SignupLayout.Main>
          <p className="mt-3 mb-5">Join 60,000+ product managers receiving monthly updates on:</p>
          <ListItem title="Product discovery and building what matters"/>
          <ListItem title="Measuring to ensure updates are a success"/>
          <ListItem title="And much more!"/>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
            <div className='flex justify-between'>
              <span className='font-bold text-xs text-left text-blue-800'>Email address</span>
              {errors["email"] && <span className='text-custom-red text-bold text-xs text-right'>{errors["email"]["message"]}</span>}
            </div>
            <input className={`p-3 mt-1 pl-5 w-full rounded-lg border-1 border-gray
              focus:outline-0 focus:border-black focus:bg-white focus:text-blue-800 `.concat(
              errors["email"] ? "bg-red-50 border-red-600 text-custom-red": "")}
            placeholder='email address' {...register("email", {
                required: emailValidationMessage,
                minLength: { value: 7, message: emailValidationMessage },
                maxLength: { value: 70, message: emailValidationMessage },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: emailValidationMessage,
                },
              })} />
            <Button text="Subscribe to mountly newsletter" />
          </form>
        </SignupLayout.Main>
      </SignupLayout>
    );
};

export default SignupPage;