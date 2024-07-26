import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StringConstants } from '@/lib/defaultHistory';
import { useState } from 'react';

export function ChatView() {
  const [history, setHistory] = useState(StringConstants.defaultHistory);
  const [newMessage, setNewMessage] = useState('');
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: history.length + 1,
        sender: 'user',
        message: newMessage,
      };
      setHistory([...history, newMessageObj]);
      setNewMessage('');
    }
  };
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 overflow-auto p-4'>
        <div className='grid gap-4'>
          {history.map(message => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              <Avatar className='w-8 h-8 border'>
                <AvatarImage src='/placeholder-user.jpg' />
                <AvatarFallback>{message.sender === 'user' ? 'YO' : 'AC'}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 max-w-[75%] ${
                  message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                <p className='text-sm'>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='border-t p-4 flex items-center'>
        <Textarea
          placeholder='Type your message...'
          className='w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary flex-1'
          rows={2}
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <Button className='ml-2' onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
