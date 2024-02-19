import { Text, Box, Card, Input, Loader } from '@wix/design-system';
import { products } from '@wix/stores';
import React from 'react';
import * as Icons from '@wix/wix-ui-icons-common';
import styles from './ProductChat.module.css';

import { fetchWithWixInstance } from '../../utils';

type Message = {
  author: 'Business Buddy' | 'User';
  text: string;
};

export function ProductChat(props: { product: products.Product }) {
  const [isWaitingForBusinessBuddy, setIsWaitingForBusinessBuddy] =
    React.useState(false);
  const [messageDraft, setMessageDraft] = React.useState<string | undefined>(
    undefined
  );
  const [chatMessages, setChatMessages] = React.useState([] as Message[]);
  


  // submitting messages and sending them to the server
  async function submitMessage() {
    // const newMessage: Message = {
    //   author: "User",
    //   text: messageDraft ?? "",
    // };

    const newMessage: string = messageDraft?? "";

    const stateMessage: Message = {
      author: "User",
      text: newMessage
    }

    
    setChatMessages((state) => [...state, stateMessage]);
    setMessageDraft("");
    // setIsWaitingForBusinessBuddy(true);

    // const message = await fetchWithWixInstance('/', "GET");
    // console.log(message)

    try {

      setIsWaitingForBusinessBuddy(true);

      const  { response }  = await fetchWithWixInstance(`/chat/product`, "POST", {
        // message: [...chatMessages, newMessage],
        prompt: newMessage,
        product: JSON.stringify(props.product, null, 2),
      });

      // console.log(response)
      setChatMessages((state) => [
        ...state,
        {
          author: "Business Buddy",
          text: response,
        },
      ]);
      setIsWaitingForBusinessBuddy(false);
      
    } catch (error) {

      console.log(error);
      
    }
    
  }


  return (
    <Card>
      <Card.Header
        title={`Ask Business Buddy about "${props.product.name}"`}
        subtitle={`SKU: ${props.product.sku}`}
      />
      <Card.Content>
        <Box width={'100%'}>
          <Input
            disabled={isWaitingForBusinessBuddy}
            className={styles.userInput}
            onEnterPressed = { submitMessage }
            suffix={
              <Input.IconAffix>
                <Icons.Send onClick={submitMessage} />
              </Input.IconAffix>
            }
            placeholder='Ask Business Buddy something...'
            onChange={(e) => {
              setMessageDraft(e.target.value);
            }}
            value={messageDraft}
          />
        </Box>
        {chatMessages.map((message) => (
          <Box>
            <Text tabName='p'>
              <b>{message.author}</b>: {message.text}
            </Text>
          </Box>
        ))}
        {isWaitingForBusinessBuddy && (
          <Box align='center' padding='8px 0px'>
            <Loader size='small' />
          </Box>
        )}
      </Card.Content>
    </Card>
  );
}