import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useToast } from '@chakra-ui/react'
  import { useState } from 'react';
  import {  useRouter } from 'next/router';
  import axios from 'axios';
  import qs from 'qs';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  
  export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [register, setRegister] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const toast = useToast();
const router = useRouter() ;

    const onChange = (e: any) => {
        // varible name and value
        let name = e.target.name
        let value = e.target.value
        // setter hooks value and prev value
        setRegister(prev => ({...prev, [name]: value}))
    }

    const Register = async() => {

        try {
            setIsLoading(true)
            // je traite mes donnees
            let data = qs.stringify({
                'firstname': register.firstname,
                'lastname': register.lastname,
                'email': register.email,
                'password': register.password,
                'confirmPassword': register.confirmPassword
            });

            // axios et la route que je veux consommer
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/register',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            };

            // execute la route
            const response = await axios.request(config)

            // je récupère les données de mon api
            console.log(response.data.data)

            // verif

            // requete http -> symfony 
            
            toast({
                title: 'Votre compte est cree .',
                description: ".",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            
            setIsLoading(false)
            router.push('/dashboard');
          } catch (err:any) {
            
            setIsLoading(false)


            toast({
                title: err.response.data.data.titleError,
                description: err.response.data.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
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
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input onChange={onChange} name="firstname" type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input  onChange={onChange} name="lastname" type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input  onChange={onChange} name="email" type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input  onChange={onChange} name="password" type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input  onChange={onChange} name="confirmPassword" type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  onClick={Register}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }