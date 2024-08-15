import React, { useState, useEffect } from 'react';
import { Button, Form, TextField, TableView, TableHeader, TableBody, Row, Cell, Column, View, Flex, Heading } from '@adobe/react-spectrum';
import { supabase } from '../lib/supabase';

interface Row {
  id: number;
  content: string;
}

export default function App() {
  const [content, setContent] = useState('');
  const [rows, setRows] = useState<Row[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    const { data, error } = await supabase.from('rows').select('*');
    if (error) console.error('Error fetching rows:', error.message);
    else setRows(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('rows').insert({ content });
    if (error) {
      console.error('Error creating row:', error.message);
      setFeedback('Failed to create row');
    } else {
      setContent('');
      fetchRows();
      setFeedback('Row created successfully');
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('rows').delete().eq('id', id);
    if (error) {
      console.error('Error deleting row:', error.message);
      setFeedback('Failed to delete row');
    } else {
      fetchRows();
      setFeedback('Row deleted successfully');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View width="100%" height="100vh" padding="size-400">
      <Flex direction="column" alignItems="center" width="100%">
        <View width="size-6000">
          <Flex justifyContent="flex-end" marginBottom="size-300">
            <Button onPress={handleLogout}>Log Out</Button>
          </Flex>
          <Heading level={2} marginBottom="size-300">Create New Row</Heading>
          <Form onSubmit={handleSubmit}>
            <Flex direction="row" gap="size-200">
              <TextField
                label="Content"
                value={content}
                onChange={setContent}
                flex={1}
              />
              <Button type="submit" variant="cta">
                Create Row
              </Button>
            </Flex>
          </Form>
          {feedback && <Text marginTop="size-200">{feedback}</Text>}
          <Heading level={2} marginY="size-300">Existing Rows</Heading>
          <TableView aria-label="Rows" width="100%">
            <TableHeader>
              <Column>ID</Column>
              <Column width="60%">Content</Column>
              <Column>Actions</Column>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id}>
                  <Cell>{row.id}</Cell>
                  <Cell>{row.content}</Cell>
                  <Cell>
                    <Button onPress={() => handleDelete(row.id)}>Delete</Button>
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </TableView>
        </View>
      </Flex>
    </View>
  );
}