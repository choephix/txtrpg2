import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function PromptTesterView() {
  const [history, setHistory] = useState([
    {
      id: 1,
      prompt: "Hello! How can I assist you today?",
      result: "I'm an AI assistant created by Anthropic to help with a variety of tasks.",
    },
    {
      id: 2,
      prompt:
        "I'm wondering if you can help me understand how airplane turbulence works. I'm a bit nervous about my first flight coming up.",
      result:
        "Turbulence happens when the plane encounters pockets of air that are moving differently than the surrounding air. It's kind of like sailing a boat on choppy water - the boat will bounce and shake a bit, but it's completely normal and not dangerous at all.",
    },
    {
      id: 3,
      prompt: "Is there anything else I should know before I go?",
      result:
        "- Drink plenty of water to stay hydrated\n- Bring noise-cancelling headphones or earplugs\n- If you feel anxious, try some deep breathing or meditation exercises\n- Don't be afraid to ask the flight attendants for anything you need",
    },
    {
      id: 4,
      prompt: "What is the weather forecast for my destination?",
      result: "",
    },
    {
      id: 5,
      prompt: "Can you recommend a good restaurant near the airport?",
      result: "",
    },
  ])
  const [newPrompt, setNewPrompt] = useState("")
  const handleSendPrompt = () => {
    if (newPrompt.trim() !== "") {
      const newPromptObj = {
        id: history.length + 1,
        prompt: newPrompt,
        result: "",
      }
      setHistory([...history, newPromptObj])
      setNewPrompt("")
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          {history.map((message) => (
            <div key={message.id} className="flex flex-col items-start gap-2">
              <div className="rounded-lg p-3 max-w-[75%] bg-muted">
                <p className="text-sm">{message.prompt}</p>
                <Separator className="my-2" />
                {message.result ? (
                  <p className="text-sm">{message.result}</p>
                ) : (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[180px]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t p-4 flex items-center">
        <Textarea
          placeholder="Type your prompt..."
          className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary flex-1"
          rows={2}
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
        />
        <Button className="ml-2" onClick={handleSendPrompt}>
          Send
        </Button>
      </div>
    </div>
  )
}
