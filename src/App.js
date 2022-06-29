import { Fragment, useState } from 'react';
import './App.css';
import Header from './components/Layout/Header/Header';
import FileUpload from './components/Layout/FileUpload/FileUpload'; 
import RecordView from './components/Layout/RecordView/RecordView';
function App() {
  const [data,setData] = useState(undefined)
  const retrieveDataHandler = (responseData) => {
    setData(responseData)
  }
  console.log(data);
  return (
    <Fragment>
      <Header />
      {data && <RecordView data={data} onGoBack={() => setData(undefined)}/>}
      {!data && <FileUpload onFileUpload={retrieveDataHandler}/>}
    </Fragment>
  );
}

export default App;
