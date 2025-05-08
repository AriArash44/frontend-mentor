import { useSelector } from 'react-redux';
import SignupPage from './components/page/Signup';
import ResultPage from './components/page/Result';

const App = () => {
    const { data, loading, error } = useSelector((state) => state.fetchResultSlice);
    return (
      <>
        {loading ? 
          <div className='spinner'></div> 
        : data ?
          <ResultPage/>
        : error ? 
          <ResultPage/>
        :
          <SignupPage/>
        }
      </>
    );
}

export default App;