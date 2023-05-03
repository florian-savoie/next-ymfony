import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import axios from 'axios';
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";

//front end
const Dashboard = (props: any) => {
  return <>
      <Navbar token={props.token}/>
      <Footer/>
  </>
}

// back end
export const  getServerSideProps = async(context:GetServerSidePropsContext) => {
  try {
const cookie = cookies(context)
let config : any = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8000/auth',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Baerer '+cookie.token
  },
};
// execute la route 
const response = await axios.request(config)
return {
  props : {
    data: response.data.data,
    token: cookie.token
  }
}
}catch (err) {
  const { res } = context;
  res.setHeader(
      "Set-Cookie", [
      `token=deleted; Max-Age=0`,
    ]);
  res.setHeader("location", "/login");
  res.statusCode = 302;
  res.end();
  return;
}
}
export default Dashboard ;