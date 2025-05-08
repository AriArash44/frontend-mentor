import { useSelector } from 'react-redux';
import SignupPage from './components/page/Signup';

const App = () => {
    const { data, loading, error } = useSelector((state) => state.fetchResultSlice);
    return (
      <>
        {loading && <div className='spinner'></div>}
        <SignupPage/>
      </>
    );
}

export default App;