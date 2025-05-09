import ResultLayout from "../layout/Result";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import SuccessIcon from "../../assets/images/icon-success.svg";
import { extractEmail } from "../../utils/extractEmail";
import { useDispatch } from 'react-redux';
import { resetState } from '../../stores/slices/fetchResultState';

const highlightEmail = (text, email) => {
    if (!email) return text;
    const parts = text.split(email);
    return parts.reduce((acc, part, index) => {
        if (index === 0) {
            return [part];
        } else {
            return [
                ...acc,
                <b key={`email-${index}`} className="font-bold">{email}</b>,
                part,
            ];
        }
    }, []);
};

const ResultPage = (props) => { 
    const emailAddress = extractEmail(props.caption);
    const dispatch = useDispatch();
    const { _register, handleSubmit, formState: { _errors } } = useForm();
    const onSubmit = () => {dispatch(resetState())};
    return (
      <ResultLayout>
        <ResultLayout.Header>
          <img className="w-16" src={SuccessIcon} alt="Success!!!" />
          <h1 className="font-bold leading-none mt-8">{props.title}</h1>
        </ResultLayout.Header>
        <ResultLayout.Main>
          <p>{highlightEmail(props.caption, emailAddress)}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <Button text="Dismiss message"/>
          </form>
        </ResultLayout.Main>
      </ResultLayout>
    );
};

export default ResultPage;