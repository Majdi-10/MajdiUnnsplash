import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
const HelloWorld = () => {
    return (
       <div>
           <App/>
       </div>
    );
}

ReactDOM.render(<HelloWorld />, document.getElementById("root"));