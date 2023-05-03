import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as ChakraLink } from '@chakra-ui/react';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navbar(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
  <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
    <Box>Logo</Box>
    <ChakraLink as={Link} href="/register">
          inscription
        </ChakraLink>
    <ChakraLink as={Link} href="/login">
          connexion
        </ChakraLink>
    <ChakraLink as={Link} href="/dashboard">
          Dashboard
        </ChakraLink>
   {props.token ? <Flex alignItems={'center'}>
      <Stack direction={'row'} spacing={7}>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>

        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar
              size={'sm'}
              src={'https://avatars.dicebear.com/api/male/username.svg'}
            />
          </MenuButton>
          <MenuList alignItems={'center'}>
            <br />
            <Center>
              <Avatar
                size={'2xl'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </Center>
            <br />
            <Center>
              <p>Username</p>
            </Center>
            <br />
            
            <MenuDivider />
            <MenuItem as={Link} href="/dashboard">Mon compte</MenuItem>
            <MenuItem as={Link} href="/logout">Deconnexion</MenuItem>
          </MenuList>
        </Menu>


      </Stack>
    </Flex> :  <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={Link}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'/login'}>
            connexion
          </Button>
          <Button
            as={Link}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            href={'/register'}
            _hover={{
              bg: 'pink.300',
            }}>
            Insciption
          </Button>
        </Stack> }
  </Flex>
</Box>
    </>
  );
}