import React , {useState,useEffect} from "react"
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    refreshToken();
  },[])

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token')
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      console.log(decoded);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>Dashboard</div>
  )
}
export default Dashboard