import {
  MessageInfo,
  MessageStoredInfo,
  MessagesStoredInfo,
} from "types/dataInterfaces";
import { subscribeWithSelector } from "zustand/middleware";
import { create } from "zustand";
import { MessageStatus } from "constants/enums";
import { initialMessage } from "constants/constants";

export const useMessageStore = create(
  subscribeWithSelector<MessageStoredInfo>((set) => ({
    msg: initialMessage,
    setMessage: (message) =>
      set(() => {
        return { msg: message };
      }),
    initialMessage: () =>
      set(() => {
        return { msg: initialMessage };
      }),
  }))
);

export const useMessagesStore = create<MessagesStoredInfo>((set, get) => ({
  msgs: [],
  addMessage: (newMessage: MessageInfo) =>
    set((state) => {
      return { msgs: [...state.msgs, newMessage] };
    }),
  editMessage: (newMessage: MessageInfo) =>
    set((state) => {
      const ind = state.msgs.findIndex((elem) => elem.id === newMessage.id);
      state.msgs[ind] = newMessage;
      return { msgs: state.msgs };
    }),
  initStorage: (messages: MessageInfo[]) =>
    set(() => {
      return { msgs: messages };
    }),
  deleteMessage: (id: string) =>
    set((state) => {
      return { msgs: state.msgs.filter((elem) => elem.id !== id) };
    }),
  isCreated: (id: string) => {
    const state = get();
    return state.msgs.some((elem) => elem.id === id);
  },
  editStorage: () =>
    set((state) => {
      const newMessages: MessageInfo[] = state.msgs.map((elem) => {
        elem.status = MessageStatus.Readed;
        return elem;
      });
      return { msgs: newMessages };
    }),
}));
