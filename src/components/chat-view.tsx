import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ChatView() {
  const [history, setHistory] = useState([
    {
      id: 1,
      sender: "assistant",
      message:
        "Hello! How can I assist you today? I'm an AI assistant created by Anthropic to help with a variety of tasks.",
    },
    {
      id: 2,
      sender: "user",
      message:
        "Hi there! I'm wondering if you can help me understand how airplane turbulence works. I'm a bit nervous about my first flight coming up.",
    },
    {
      id: 3,
      sender: "assistant",
      message:
        "Absolutely, I'd be happy to explain airplane turbulence in a way that's easy to understand. Turbulence happens when the plane encounters pockets of air that are moving differently than the surrounding air. It's kind of like sailing a boat on choppy water - the boat will bounce and shake a bit, but it's completely normal and not dangerous at all.",
    },
    {
      id: 4,
      sender: "user",
      message:
        "That makes a lot of sense, thank you! I feel much better about my upcoming flight now. Is there anything else I should know before I go?",
    },
    {
      id: 5,
      sender: "assistant",
      message:
        "Here are a few other tips that can help make your first flight a smooth one:\n\n- Drink plenty of water to stay hydrated\n- Bring noise-cancelling headphones or earplugs\n- If you feel anxious, try some deep breathing or meditation exercises\n- Don't be afraid to ask the flight attendants for anything you need",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: history.length + 1,
        sender: "user",
        message: newMessage,
      }
      setHistory([...history, newMessageObj])
      setNewMessage("")
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          {history.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : ""}`}
            >
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{message.sender === "user" ? "YO" : "AC"}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 max-w-[75%] ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t p-4 flex items-center">
        <Textarea
          placeholder="Type your message..."
          className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary flex-1"
          rows={2}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button className="ml-2" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  )
}
