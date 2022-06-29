import { Fragment, useState } from 'react';
import './App.css';
import Header from './components/Layout/Header/Header';
import FileUpload from './components/Layout/FileUpload/FileUpload';
function App() {
  const [data,setData] = useState(undefined)
  const retrieveDataHandler = (responseData) => {
    setData(responseData)
  }
  console.log(data);
  return (
    <Fragment>
      <Header />
      {data && <p>Report</p>}
      {!data && <FileUpload onFileUpload={retrieveDataHandler}/>}
    </Fragment>
  );
}

export default App;
