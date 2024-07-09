import dayjs from "dayjs";
import { MessageInfo } from "types/dataInterfaces";

export const formatAMPM = (date: string) => {
  return dayjs(date).format("HH:mm A");
};

export const getDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const toTop = (container: HTMLDivElement | null) => {
  if (container) container.scrollTop = container.scrollHeight;
};

export const fileToString = (
  file: File,
  callback: (elem: string) => void | string
) => {
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      callback(reader.result as string);
    },
    false
  );
  reader.readAsDataURL(file);
};

export const save = (messages: MessageInfo[]) => {
  localStorage.setItem("messages", JSON.stringify(messages));
};

export const checkPicture = (picture: string | File): string => {
  if (typeof picture === "string") return picture;
  let newPicture = "";
  fileToString(picture, (file: string) => (newPicture = file));
  return newPicture;
};
