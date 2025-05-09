import { useSelector } from 'react-redux';
import SignupPage from './components/page/Signup';
import ResultPage from './components/page/Result';

const App = () => {
    const { data, loading, error } = useSelector((state) => state.fetchResultSlice);
    console.log(data);
    console.log(error);
    return (
      <>
        {loading ? 
          <div className='spinner'></div> 
        : data ?
          <ResultPage title="Thanks for subscribing!" caption={data.signup}/>
        : error ? 
          <ResultPage title="Sorry, An error occured!" caption={error}/>
        :
          <SignupPage/>
        }
      </>
    );
}

export default App;