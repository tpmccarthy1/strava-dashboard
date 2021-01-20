import React from "react";
import { useHistory } from 'react-router-dom';

const WorkoutDetail = ({id}: {id: number}) => {
  const history = useHistory();
  return (
    <div className='col-md-12 mt-4'>
      Some text {id}
      <button onClick={() => history.goBack()}>Go Back</button>
    </div>

  );
}

export default WorkoutDetail;
