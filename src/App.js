import React, { Suspense, useState } from 'react';
import './App.css';
import Header from './components/Layout/Header/Header';
import FileUpload from './components/Layout/FileUpload/FileUpload'; 
import { ItemContextProvider } from './store/item-context';

const RecordView = React.lazy(() => import('./components/Layout/RecordView/RecordView'))
function App() {
  const [showFileUpload, setShowFileUpload] = useState(false)

  return (
    <ItemContextProvider>
      <Header />
      <Suspense fallback={<p>Loading ...</p>}>
        {showFileUpload && <RecordView onGoBack={() => setShowFileUpload(false)} />}
      </Suspense>
      {!showFileUpload && <FileUpload onFileUpload={() => setShowFileUpload(true)} />}
    </ItemContextProvider>
  );
}

export default App;
