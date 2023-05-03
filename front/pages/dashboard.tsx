import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Search from '@/components/search';
import axios from 'axios';
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { LineChart } from '@/components/line';
import { useEffect } from 'react';
import {useState} from 'react';

//front end
const Dashboard = (props: any) => {

const [ data ,setData] = useState(null)
const Axios = async() => {
  let config = { methode: 'get',
  maxBodyLength: Infinity,
  url: process.env.NEXT_PUBLIC_BASE_URL+'/discover/movie?query='+search.name+'sort_by=release_date.desc&include_video=false&page=1&primary_release_date.gte='+search.start+'&primary_release_date.lte='+search.end+'&api_key='+process.env.NEXT_PUBLIC_API,   headers: {
  'Content-Type': 'application/x-www-form-urlencoded',
}
 }
  try{
    const response = await axios.request(config)
 setData(response.data)
  }catch (err){
console.log(err)
  }
}

const [ search , setSearch ] = useState({
  name: '',
  start: '',
  end:''
})
const onChange = (e:any) => {
setSearch(e);
Axios()
}

  return <>
      <Navbar token={props.token}/>
      <Search onChange={onChange}/>
      <LineChart data={data}/>
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