import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx'




const MyApp = () => {
    return (
       <div>
           <App/>
       </div>
    );
}

ReactDOM.render(<MyApp  />, document.getElementById("root"));