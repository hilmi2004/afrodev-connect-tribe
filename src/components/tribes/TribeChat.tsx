// src/components/tribes/TribeChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TribeMessage } from "@/types/tribe";

interface TribeChatProps {
  tribeId: string;
  messages: TribeMessage[];
  sendMessage: (message: string) => Promise<void>;
}

export const TribeChat: React.FC<TribeChatProps> = ({
                                                      tribeId,
                                                      messages,
                                                      sendMessage
                                                    }) => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(newMessage);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
      <div className="h-[500px] flex flex-col border rounded-lg overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                  <div key={message._id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                          src={message.user.profileImage || "/default-avatar.png"}
                          alt={message.user.fullName}
                      />
                      <AvatarFallback>
                        {message.user.fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium">{message.user.fullName}</span>
                        <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
  );
};