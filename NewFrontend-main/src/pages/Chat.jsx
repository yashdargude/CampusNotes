import React, { useEffect, useRef, useState } from 'react'
import { Input, Button, Textarea } from "@material-tailwind/react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import ChatBubbleRight from '../components/ChatBubbleRight';
import ChatBubbleLeft from '../components/ChatBubbleLeft';

import io from 'socket.io-client';
import axios from 'axios';


const socket = io.connect(import.meta.env.VITE_BACKEND_URL);
function Chat() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = useState([]);
  const [activeMessages, setActiveMessages] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const msgRef = useRef(null)

  useEffect(() => {
    socket.on('newMessage', (messageData) => {

      setActiveMessages([...activeMessages, messageData])
    });
    msgRef.current?.scrollIntoView()
  }, [activeMessages]);

  useEffect(() => {

    // Listen for new messages from the server
    axios.get('/api/message/allmessages')
      .then(res => {
        // console.log(res.data.data.chats);
        setMessages(res.data.data.chats);
        msgRef.current?.scrollIntoView()
      })
      .catch(err => {
        console.log(err);
      })

    // return () => {
    //   socket.disconnect();
    // };

  }, []);





  const sendMessage = () => {
    // Emit the message to the server
    const user_id = localStorage.getItem('user_id');
    // console.log(message);
    socket.emit('sendMessage', { text: message, user_id: user_id });
    setMessage('');
  };
  return (<>
    <div>
      <div className='container mx-auto px-4'>

        <section className='flex relative flex-col items-center justify-center '>
          <div id='chat-feed' className="relative flex flex-col w-full rounded-md h-[50rem] bg-deep-purple-50 overflow-y-auto px-4 py-4">

            {
              messages.length != 0 ? <>
                {
                  messages.map(msg => {
                    if (msg.user_id?._id === user_id) {
                      return (
                        <ChatBubbleRight key={msg._id} message={msg.messagedata} firstname={msg.user_id?.firstname} lastname={msg.user_id?.lastname}
                          email={msg.user_id?.email} branch={msg.user_id?.branch} year={msg.user_id?.year} />
                      )
                    }
                    else {
                      return (<ChatBubbleLeft key={msg._id} message={msg.messagedata} firstname={msg.user_id?.firstname} lastname={msg.user_id?.lastname}
                        email={msg.user_id?.email} branch={msg.user_id?.branch} year={msg.user_id?.year}
                      />)
                    }
                  })
                }
              </> : <>
                <div className='w-full flex items-center justify-center gap-20'>
                  <div>
                    <h1 className='text-center font-semibold text-2xl animate-bounce'>👋 Hi there! Welcome to the Chat.</h1>
                    <div className='w-full h-1 bg-black animate-pulse'></div>
                  </div>

                  <img className='w-64 rounded-full' src="https://i.pinimg.com/originals/63/fd/ff/63fdff4b7c1964f08c3c16f18f581bd7.gif" alt="chat gif" />
                </div>
              </>
            }
            {
              activeMessages.length != 0 ? <>
                {
                  activeMessages.map((msg, i) => {
                    if (msg.user_id?._id === user_id) {
                      return (<ChatBubbleRight key={i} message={msg.messagedata} firstname={msg.user_id?.firstname} lastname={msg.user_id?.lastname}
                        email={msg.user_id?.email} branch={msg.user_id?.branch} year={msg.user_id?.year} />)
                    }
                    else {
                      return (<ChatBubbleLeft key={i} message={msg.messagedata} firstname={msg.user_id?.firstname} lastname={msg.user_id?.lastname}
                        email={msg.user_id?.email} branch={msg.user_id?.branch} year={msg.user_id?.year} />)
                    }
                  })
                }
              </> : <>
                <div className='w-full flex flex-col items-center justify-center gap-8'>
                  <div>
                    <h1 className='text-center font-semibold text-2xl animate-bounce'>👋 Hi there! Start conversation...</h1>
                    <div className='w-full h-1 bg-black animate-pulse'></div>
                  </div>

                  <img className='w-64 rounded-full' src="https://i.pinimg.com/originals/63/fd/ff/63fdff4b7c1964f08c3c16f18f581bd7.gif" alt="chat gif" />
                </div>
              </>
            }




            <div ref={msgRef}></div>


          </div>
          <section className='flex  w-full flex-col items-center justify-center mt-4 mb-12'>
            <Textarea variant="outlined" label="Enter Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }} />
            <div className='flex justify-end w-full'>
              <Button
                size="sm"
                color={message ? "black" : "blue-gray"}
                disabled={!message}
                className=" rounded px-8"
                onClick={sendMessage}
              >
                Send
              </Button>
            </div>
          </section>

        </section>


      </div >
    </div >
  </>)
}

export default Chat;