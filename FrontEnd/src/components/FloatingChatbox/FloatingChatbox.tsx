import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MessageSquare, Mail, CheckSquare, X, GripVertical } from "lucide-react";
import ChatTab from "./tabs/ChatTab";
import MailTab from "./tabs/MailTab";
import TaskTab from "./tabs/TaskTab";

export default function FloatingChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark));
    };

    checkTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);
    window.addEventListener('storage', checkTheme);

    return () => {
      mediaQuery.removeEventListener('change', checkTheme);
      window.removeEventListener('storage', checkTheme);
    };
  }, []);

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-[999]">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/25 z-40" onClick={() => setIsOpen(false)} />
      <Rnd
        default={{
          x: window.innerWidth - 430,
          y: window.innerHeight - 680,
          width: 400,
          height: 600,
        }}
        minWidth={320}
        minHeight={450}
        bounds="window"
        dragHandleClassName="drag-handle"
        className="z-50"
      >
        <Card className="h-full w-full flex flex-col shadow-2xl rounded-xl overflow-hidden border border-transparent dark:border-slate-700">
          <div className={`drag-handle p-3 flex items-center justify-between cursor-move ${isDark ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-800 border-b border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <GripVertical className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <h2 className="text-md font-semibold">Chat</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}
              onClick={() => setIsOpen(false)}
            >
              <X className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </Button>
          </div>
          <Tabs defaultValue="chat" className="flex-1 flex flex-col bg-white dark:bg-slate-900">
            <TabsList className="w-full flex justify-around border-b border-gray-200 dark:border-slate-700 h-16 bg-white dark:bg-slate-800/50 px-2 shadow-sm">
              <TabsTrigger
                value="chat"
                className="flex-1 flex items-center gap-2 text-gray-500 dark:text-gray-400 data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-200 ease-in-out"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold">Chat</span>
              </TabsTrigger>
              <TabsTrigger
                value="mail"
                className="flex-1 flex items-center gap-2 text-gray-500 dark:text-gray-400 data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-200 ease-in-out"
              >
                <Mail className="h-5 w-5" />
                <span className="font-semibold">Mail</span>
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="flex-1 flex items-center gap-2 text-gray-500 dark:text-gray-400 data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-200 ease-in-out"
              >
                <CheckSquare className="h-5 w-5" />
                <span className="font-semibold">Tasks</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-auto p-4">
              <TabsContent value="chat" className="h-full m-0">
                <ChatTab />
              </TabsContent>
              <TabsContent value="mail" className="h-full m-0">
                <MailTab />
              </TabsContent>
              <TabsContent value="tasks" className="h-full m-0">
                <TaskTab />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </Rnd>
    </>
  );
}