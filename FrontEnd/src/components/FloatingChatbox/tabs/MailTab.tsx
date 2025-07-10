import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Mail,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  Plus
} from "lucide-react";

interface Email {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  preview: string;
  isUnread: boolean;
  isStarred: boolean;
  timestamp: string;
  content: string;
}

const mockEmails: Email[] = [
  {
    id: "1",
    subject: "Weekly Team Update",
    sender: {
      name: "John Doe",
      email: "john@example.com"
    },
    preview: "Here's a summary of what we accomplished this week...",
    isUnread: true,
    isStarred: false,
    timestamp: "10:30 AM",
    content: `Hi team,\n\nHere's a summary of what we accomplished this week:\n- Completed the user authentication system\n- Fixed 3 critical bugs in the dashboard\n- Started working on the new reporting feature\n\nLet me know if you have any questions.\n\nBest regards,\nJohn`
  },
  {
    id: "2",
    subject: "Project Deadline Reminder",
    sender: {
      name: "Sarah Wilson",
      email: "sarah@example.com"
    },
    preview: "Just a friendly reminder about the upcoming deadline...",
    isUnread: false,
    isStarred: true,
    timestamp: "Yesterday",
    content: `Hi everyone,\n\nThis is a friendly reminder that the project deadline is approaching.\nPlease make sure to submit your deliverables by Friday.\n\nThanks,\nSarah`
  }
];

export default function MailTab() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>("1");
  const [composeMode, setComposeMode] = useState(false);

  const selectedEmailData = mockEmails.find(
    (email) => email.id === selectedEmail
  );

  return (
    <div className="flex h-full">
      {/* Email List */}
      <div className="w-1/2 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <Button
            className="w-full"
            onClick={() => setComposeMode(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>
        {mockEmails.map((email) => (
          <div
            key={email.id}
            className={`p-4 cursor-pointer hover:bg-accent ${
              selectedEmail === email.id ? "bg-accent" : ""
            } ${email.isUnread ? "font-medium" : ""}`}
            onClick={() => setSelectedEmail(email.id)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{email.sender.name}</span>
                  {email.isUnread && (
                    <Badge variant="secondary" className="rounded-full">
                      New
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {email.sender.email}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {email.timestamp}
              </span>
            </div>
            <h3 className="font-medium mb-1">{email.subject}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {email.preview}
            </p>
          </div>
        ))}
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {composeMode ? (
          <div className="flex-1 p-4">
            <div className="mb-4">
              <Input placeholder="To" className="mb-2" />
              <Input placeholder="Subject" className="mb-2" />
              <textarea
                className="w-full h-[300px] p-2 border rounded-md resize-none"
                placeholder="Write your message..."
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setComposeMode(false)}
              >
                Cancel
              </Button>
              <Button>Send</Button>
            </div>
          </div>
        ) : selectedEmailData ? (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedEmailData.subject}
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Reply className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Forward className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {selectedEmailData.sender.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedEmailData.sender.email}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedEmailData.timestamp}
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto whitespace-pre-line">
              {selectedEmailData.content}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
}