//import axios from "axios";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./home/components/Home";

function App() {

  // axios.get('http://localhost:8080/').then( res => {
  //   console.log(res.data)
  // }).catch( e => {
  //   console.log(e)
  // })

  return (
    <div className="container p-5">
      <Home></Home>
    </div>
  )
}

export default App
