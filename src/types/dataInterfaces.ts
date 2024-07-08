import { MessageStatus } from "constants/enums";

export interface MessageInfo {
  id: string;
  name: string;
  photo: string;
  picture?: string | null;
  text: string;
  position?: string;
  time: string;
  status: MessageStatus;
}

export interface MessagesStoredInfo {
  msgs: MessageInfo[];
  addMessage: (newMessage: MessageInfo) => void;
  initStorage: (messages: MessageInfo[]) => void;
  editStorage: () => void;
  deleteMessage: (id: string) => void;
}
