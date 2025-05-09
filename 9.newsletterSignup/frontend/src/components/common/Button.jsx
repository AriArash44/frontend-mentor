import { useDispatch, useSelector } from 'react-redux';
import { makeActive, makeInactive } from '../../stores/slices/buttonStateSlice';
import { useEffect } from 'react';

const Button = (props) => {
    const isActive = useSelector((state) => state.buttonStateSlice.active);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeInactive());
    }, [dispatch])
    return (
      <input type="submit" value={props.text} className={`rounded-lg text-white p-3 w-full mt-5 
        cursor-pointer text-sm ${isActive ? "custom-gradiant custom-shadow" : "bg-blue-800"}`} 
        onTouchStart={() => dispatch(makeActive())}
        onTouchEnd={() => dispatch(makeInactive())}
        onMouseEnter={() => dispatch(makeActive())}
        onMouseLeave={() => dispatch(makeInactive())}/>
    );
};

export default Button;