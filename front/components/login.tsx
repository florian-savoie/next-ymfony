import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import axios from 'axios';
  import qs from 'qs';
  import {  useRouter } from 'next/router';

  export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const [login, setLogin] = useState({
      email: '',
      password: '',
  })
  const toast = useToast();
    const router = useRouter() ;
    
  const onChange = (e: any) => {
    // varible name and value
    let name = e.target.name
    let value = e.target.value
    // setter hooks value and prev value
    setLogin(prev => ({...prev, [name]: value}))
}

const Login = async() => {

  try {
  setIsLoading(true)
  // je traite mes donnees
  let data = qs.stringify({
      'email': login.email,
      'password': login.password
  });
  // axios et la route que je veux consommer
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/login',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
};

// execute la route
const response = await axios.request(config)

// je récupère les données de mon api

// verif

// requete http -> symfony 

toast({
    title: 'Vous etes bien connecter .',
    description: ".",
    status: 'success',
    duration: 3000,
    isClosable: true,
})

setIsLoading(false)
document.cookie = "token="+response.data.data.jwt+";path=/;"
router.push('/dashboard');
} catch (err:any) {

setIsLoading(false)

console.log(err.response.data);
toast({
  title: err.response.data.data.titleError,
  description: err.response.data.data.error,
  status: 'error',
  duration: 3000,
  isClosable: true,
});
}
}

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={onChange} name="email" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={onChange} name="password" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                isLoading={isLoading}
                onClick={Login}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }