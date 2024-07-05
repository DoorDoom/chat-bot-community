import { MessageStatus } from "constants/enums";

export interface MessageInfo {
  name: string;
  photo: string;
  picture?: string | null;
  text: string;
  position?: string;
  time: Date | null | string;
  status: MessageStatus;
}

export interface MessagesStoredInfo {
  msgs: MessageInfo[];
  addElement: (newMessage: MessageInfo) => void;
  initStorage: (messages: MessageInfo[]) => void;
  editStorage: () => void;
}
