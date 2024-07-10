import {
  MessageInfo,
  MessageStoredInfo,
  MessagesStoredInfo,
} from "types/dataInterfaces";
import { subscribeWithSelector, persist } from "zustand/middleware";
import { create } from "zustand";
import { MessageStatus } from "constants/enums";
import { initialMessage } from "constants/constants";
import { produce } from "immer";

//в этом хранилище не думаю, что нужно использовать immer
export const useMessageStore = create(
  subscribeWithSelector<MessageStoredInfo>((set) => ({
    msg: initialMessage,
    setMessage: (message) => set(() => ({ msg: message })),
    initialMessage: () => set(() => ({ msg: initialMessage })),
  }))
);

export const useMessagesStore = create(
  persist<MessagesStoredInfo>(
    (set, get) => ({
      msgs: [],
      addMessage: (newMessage: MessageInfo) =>
        set(
          produce((state: MessagesStoredInfo) => {
            state.msgs.push(newMessage);
          })
        ),
      editMessage: (newMessage: MessageInfo) =>
        set(
          produce((state) => {
            const ind = state.msgs.findIndex(
              (elem: MessageInfo) => elem.id === newMessage.id
            );
            state.msgs[ind] = newMessage;
          })
        ),
      deleteMessage: (id: string) =>
        set(
          produce((state) => {
            state.msgs = state.msgs.filter(
              (elem: MessageInfo) => elem.id !== id
            );
          })
        ),
      isCreated: (id: string) => {
        const state = get();
        return state.msgs.some((elem) => elem.id === id);
      },
      editStorage: () =>
        set(
          produce((state) => {
            state.msgs.every(
              (_: MessageInfo, index: number) =>
                (state.msgs[index].status = MessageStatus.Readed)
            );
          })
        ),
    }),
    {
      name: "message-storage",
    }
  )
);
