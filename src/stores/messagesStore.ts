import { MessageInfo, MessagesStoredInfo } from "types/dataInterfaces";
import { subscribeWithSelector } from "zustand/middleware";
import { create } from "zustand";
import { MessageStatus } from "constants/constants";

export const useMessageStore = create(
  subscribeWithSelector(() => ({
    name: "Katerina",
    picture:
      "https://s3-alpha-sig.figma.com/img/dbaa/16a5/0e7db451d868b67382bd8b61d8ac3da1?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lTi9iOOzYNF5Hb-lEagNUVezR6pKP-hAksNHwoMIqAHUuYAJiy5itKZcxN0d4nI0Q6ygYagXZcIFIviGRpy21Fo028Hg6VEchwlQKDDxiYcIgIwjHs0G1Suto6N5K4NkJFFU6IBrVlmC6SdQus9wQFeyeqDfcCY5ovGtp17AzUDvTznjEJXTCO68XBMM9IRMs5imZPqktZ2ey9EKYHDdgsDrCibK2Nn4R83ocxkLkPc2dvYTAK8eV4gPfVjqyTIcjFdZCptcDTvgKi3UUKoA2WpD9a0ld-E89IiEfKnvyv65fqVSmQMI7x12igrVfzqTfSh62OWiyEj9C3zAoxJwXg__",
    text: "",
    position: "Engineering",
    time: new Date(),
    status: MessageStatus.Readed,
  }))
);

export const useMessagesStore = create<MessagesStoredInfo>((set) => ({
  msgs: [],
  addElement: (newMessage: MessageInfo) =>
    set((state) => {
      return { msgs: [...state.msgs, newMessage] };
    }),
  initStorage: (messages: MessageInfo[]) =>
    set(() => {
      return { msgs: messages };
    }),
}));