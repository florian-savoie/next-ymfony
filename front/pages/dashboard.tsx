import Footer from "@/components/footer";
import { LineComposant } from "@/components/line";
import Navbar from "@/components/navbar";
import Search from "@/components/search";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import cookies from 'next-cookies'
import { useEffect, useState } from "react";


// front end
const Dashboard = (props: any) => {

    const [data, setData] = useState(null)

    const Axios = async() => {
        let config= { method: 'get',
                maxBodyLength: Infinity,
                url: process.env.NEXT_PUBLIC_BASE_URL+'/discover/movie?query='+search.name+'sort_by=release_date.desc&include_video=false&page=1&primary_release_date.gte='+search.start+'&primary_release_date.lte='+search.end+'&api_key='+process.env.NEXT_PUBLIC_API,
                headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
            }
        }
        try {
            const response = await axios.request(config)
            setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const [search, setSearch] = useState({
        name: 'Avengers',
        start: '2000-01-01',
        end: '2023-01-01'
    })

    const onChange = (e:any) => {
        setSearch(e)
        setTimeout(() => {
            Axios()
        },500)
    }

    return <> 
        <Navbar token={props.token}/>
        <Box width={"100vw"} height={"100vh"}>
            <Search onChange={onChange}/>
            <LineComposant data={data}/>
        </Box>
        <Footer/>
    </>
}

// back end
export const getServerSideProps = async(context:GetServerSidePropsContext) => {
    try {
        const cookie = cookies(context)

        // axios et la route que je veux consommer
        let config : any = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/auth',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer '+ cookie.token
            },
        };

        // execute la route
        const response = await axios.request(config)

        return {
            props: {
                data: response.data.data,
                token: cookie.token
            }
        }
    } catch (err) {
        const { res } = context;
        res.setHeader(
            "Set-Cookie", [
            `token=deleted; Max-Age=0`,
          ]);
        res.setHeader("location", "/");
        res.statusCode = 302;
        res.end();
        return;
    }
  
}

export default Dashboard