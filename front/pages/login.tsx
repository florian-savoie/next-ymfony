import Footer from '@/components/footer'
import Login from '@/components/login'
import Navbar from '@/components/navbar'
import cookies from "next-cookies";
import { GetServerSidePropsContext } from "next";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Login/>
      <Footer/>
    </>
  )
}
// back end
export const  getServerSideProps = async(context:GetServerSidePropsContext) => {

  const cookie = cookies(context)

  if (cookie.token){
    const { res } = context;
    res.setHeader('location',"/dashboard");
    res.statusCode = 302;
    res.end();
    return;
  }
  
  return {
    props : {}
  }

  }
