import React, { useState } from 'react';
import { Button, Form, TextField, Flex, Text, View, Heading } from '@adobe/react-spectrum';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');


  // handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(`Error signing up: ${error.message}`);
      } else {
        setMessage('Sign up successful! Check your email for verification.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(`Error logging in: ${error.message}`);
      }
    }
  };

  return (
    <View width="100%" height="100vh">
      <Flex direction="column" alignItems="center" justifyContent="center" height="100%">
        <View width="size-3600" padding="size-400" borderWidth="thin" borderColor="dark" borderRadius="medium">
          <Heading level={2} marginBottom="size-300">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </Heading>
          <Form onSubmit={handleSubmit} width="100%">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              width="100%"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              width="100%"
            />
            <Button type="submit" variant="cta" width="100%" marginTop="size-200">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </Button>
          </Form>
          <Flex alignItems="center" justifyContent="center" gap="size-100" marginTop="size-300">
            <Text>{isSignUp ? 'Already have an account?' : 'Need an account?'}</Text>
            <Button variant="primary" onPress={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Log In' : 'Sign Up'}
            </Button>
          </Flex>
          {message && <Text marginTop="size-200">{message}</Text>}
        </View>
      </Flex>
    </View>
  );
}