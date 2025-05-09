import { useDispatch } from 'react-redux';
import { fetchData } from '../../stores/slices/fetchResultState';
import { useForm } from "react-hook-form";
import SignupLayout from "../layout/signup";
import ResponsiveImage from "../common/Image";
import ListItem from "../common/ListItem";
import illustrationSignupMobile from "../../assets/images/illustration-sign-up-mobile.svg";
import illustrationSignupDesktop from "../../assets/images/illustration-sign-up-desktop.svg";
import Button from '../common/Button';

const SignupPage = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);
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
          <p className="mt-2 mb-4">Join 60,000+ product managers receiving monthly updates on:</p>
          <ListItem title="Product discovery and building what matters"/>
          <ListItem title="Measuring to ensure updates are a success"/>
          <ListItem title="And much more!"/>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
            <div className='flex justify-around'>
              <p className='font-bold'>Email address</p>
              {errors["email"] && <p className='text-red-700'>{errors["email"]["message"]}</p>}
            </div>
            <input className={`p-4 w-full rounded-lg border-1 focus:outline-0 `.concat(
              errors["email"] ? "bg-red-100 border-red-700": "bg-white border-gray")}
            placeholder='email address' {...register("email", {
                required: "Email is required",
                minLength: { value: 7, message: "Email must be at least 7 characters" },
                maxLength: { value: 70, message: "Email cannot exceed 70 characters" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })} />
            <Button text="submit" />
          </form>
        </SignupLayout.Main>
      </SignupLayout>
    );
};

export default SignupPage;