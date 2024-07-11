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
  id: string;
  msgs: MessageInfo[];
  addMessage: (newMessage: MessageInfo) => void;
  editMessage: (changedMessage: MessageInfo) => void;
  editStorage: () => void;
  deleteMessage: (id: string) => void;
  isCreated: (id: string) => boolean;
  findMessage: (id: string) => MessageInfo | null;
  setId: (id: string) => void;
}
