import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Paperclip, Smile, Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface Message {
  id: string;
  content: string;
  sender: string;
  isUser: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Alice Smith",
    avatar: "",
    lastMessage: "Hey, how are you doing?",
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: "1",
        content: "Hey, how are you doing?",
        sender: "Alice Smith",
        isUser: false
      },
      {
        id: "2",
        content: "I'm good, thanks! How about you?",
        sender: "You",
        isUser: true
      }
    ]
  },
  {
    id: "2",
    name: "Bob Johnson",
    avatar: "",
    lastMessage: "Can we schedule a meeting?",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: "1",
        content: "Can we schedule a meeting?",
        sender: "Bob Johnson",
        isUser: false
      }
    ]
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "",
    lastMessage: "The project looks great!",
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: "1",
        content: "The project looks great!",
        sender: "Emma Davis",
        isUser: false
      }
    ]
  }
];

// Update DragState interface
interface DragState {
  isDragging: boolean;
  startY: number;
  startHeight: number;
}

export default function ChatTab() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startY: 0,
    startHeight: 500, // Default height
  });
  const [chatHeight, setChatHeight] = useState(500);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !emojiButtonRef.current?.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update drag handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.isDragging) return;
      
      if (dragState.startY !== undefined && dragState.startHeight !== undefined) {
        // Vertical dragging
        const deltaY = e.clientY - dragState.startY;
        const newHeight = Math.max(300, Math.min(800, dragState.startHeight - deltaY));
        setChatHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setDragState(prev => ({ ...prev, isDragging: false }));
    };

    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState]);

  const selectedChat = mockConversations.find(
    (conversation) => conversation.id === selectedConversation
  );

  const filteredConversations = mockConversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      sender: "You",
      isUser: true
    };

    selectedChat.messages.push(newMessage);
    selectedChat.lastMessage = messageInput;
    setMessageInput("");  
  };

  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

    if (isToday) {
      return format(date, "h:mm a");
    } else if (isYesterday) {
      return "Yesterday " + format(date, "h:mm a");
    } else {
      return format(date, "MMM d, h:mm a");
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessageInput(prev => prev + emoji.native);
  };

  return (
    <div 
      ref={chatContainerRef}
      className="flex h-full relative"
      style={{ height: `${chatHeight}px` }}
    >
      {/* Drag handle */}
      <div
        ref={dragHandleRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-300 rounded-full cursor-ns-resize"
        onMouseDown={(e) => {
          setDragState({
            isDragging: true,
            startY: e.clientY,
            startHeight: chatHeight,
          });
        }}
      />

      {/* Conversation List */}
      <div className="w-1/3 border-r overflow-y-auto pt-4">
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent ${
              selectedConversation === conversation.id ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedConversation(conversation.id)}
          >
            <Avatar className={`h-12 w-12 border-2 ${conversation.isOnline ? 'border-green-500' : 'border-transparent'}`}>
              <AvatarImage src={conversation.avatar} alt={conversation.name} />
              <AvatarFallback>{conversation.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{conversation.name}</h3>
                {conversation.unreadCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {conversation.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center gap-4 p-4 border-b">
              <Avatar className={`h-10 w-10 ${selectedChat.isOnline ? 'border-2 border-green-500' : ''}`}>
                <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedChat.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {selectedChat.messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-3 mb-4 ${message.isUser ? "justify-end" : ""}`}>
                  {!message.isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                      <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                    <p>{message.content}</p>
                    <span className="text-xs text-muted-foreground/80 mt-1 block text-right">
                      {formatMessageDate(new Date())}
                    </span>
                  </div>
                  {message.isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="You" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t relative">
              {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute bottom-full mb-2">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
              <div className="relative">
                <Input
                  placeholder="Type a message..."
                  className="pr-28"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    ref={emojiButtonRef}
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowEmojiPicker(prev => !prev)}
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}