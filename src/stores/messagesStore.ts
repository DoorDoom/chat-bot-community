import { MessageInfo, MessagesStoredInfo } from "types/dataInterfaces";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { MessageStatus } from "constants/enums";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

export const useMessagesStore = create(
  persist(
    immer<MessagesStoredInfo>((set, get) => ({
      msgs: [],
      id: "",
      addMessage: (newMessage: MessageInfo) =>
        set((state: MessagesStoredInfo) => {
          state.msgs.push(newMessage);
        }),
      editMessage: (newMessage: MessageInfo) =>
        set((state) => {
          const ind = state.msgs.findIndex(
            (elem: MessageInfo) => elem.id === newMessage.id
          );
          state.msgs[ind] = newMessage;
        }),
      setId: (id: string) => {
        set((state) => {
          state.id = id;
        });
      },
      deleteMessage: (id: string) =>
        set((state) => {
          state.msgs = state.msgs.filter((elem: MessageInfo) => elem.id !== id);
        }),
      isCreated: (id: string) => {
        const state = get();
        return state.msgs.some((elem) => elem.id === id);
      },
      findMessage: (id: string) => {
        const state = get();
        return state.msgs.find((elem) => elem.id === id) ?? null;
      },
      editStorage: () =>
        set((state) => {
          state.msgs.every(
            (_: MessageInfo, index: number) =>
              (state.msgs[index].status = MessageStatus.Readed)
          );
        }),
    })),
    {
      name: "message-storage",
    }
  )
);
