import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();


  const handleClick = ()=> setShow(!show);


  const submitHandler = async()=> {
    setLoading(true);
    
    if(!email || !password){
      toast({
        title: 'Please fill all the feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type" : "application/json", 
        },
      };

      const {data} = await axios.post("/api/user/login", {email, password}, config); // it creates account
      
      toast({
        title: 'Login Successful..',
        description: "It's great, Your are Welcome.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push('/chats');

    } catch (error) {
      toast({
        title: 'Error Occured',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };


  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
         value={email}
         placeholder='Enter your Email'
         onChange={(e)=>setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input 
          value={password}
          type={show ? 'text' : 'password'}
          placeholder='Enter your Password'
          onChange={(e)=>setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      
      <Button 
       colorScheme='blue'
       width='100%'
       style={{marginTop: 15}}
       onClick={submitHandler}
       isLoading={loading}
      >
        Login
      </Button>

      <Button 
       variant='solid'
       colorScheme='red'
       width='100%'
       onClick={()=>{
        setEmail('guest@gmail.com');
        setPassword('1234567');
       }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
};

export default Login