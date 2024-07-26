import { useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import usePromptHistoryStore from '@/stores/promptHistoryStore';

export function PromptTesterView() {
  const { history, addItem, updateItem, generateFromPrompt } = usePromptHistoryStore();

  const refPromptBox = useRef(null as any);
  const [newPrompt, setNewPrompt] = useState('');

  const handleSendPrompt = async () => {
    const _prompt = newPrompt.trim();

    if (_prompt === '') return;

    generateFromPrompt(_prompt);
    setNewPrompt('');
    updatePromptAreaSize();
  };

  const updatePromptAreaSize = () => {
    if (!refPromptBox?.current) return;
    refPromptBox.current.style.height = 'auto';
    refPromptBox.current.style.height = `${refPromptBox.current.scrollHeight}px`;
  };

  updatePromptAreaSize();

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 overflow-auto p-4'>
        <div className='grid gap-4'>
          {history.map(message => (
            <div key={message.id} className='flex flex-col items-start gap-2'>
              {/* <div className='rounded-lg p-3 max-w-[75%] bg-muted'> */}
              <div className='rounded-lg p-3 max-w-[75%] bg-primary text-primary-foreground'>
                <p className='text-sm'>{message.prompt}</p>
                <Separator className='my-2' />
                {message.result ? (
                  <p className='text-sm'>{message.result}</p>
                ) : (
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-[200px] opacity-20' />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='border-t p-4 flex items-center'>
        <Textarea
          ref={refPromptBox}
          placeholder='Type your prompt...'
          className='w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary flex-1'
          rows={2}
          value={newPrompt}
          onChange={e => setNewPrompt(e.target.value)}
          onInput={updatePromptAreaSize}
        />
        <Button className='ml-2' onClick={handleSendPrompt}>
          Send
        </Button>
      </div>
    </div>
  );
}
