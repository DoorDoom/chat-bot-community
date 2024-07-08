import { create } from "zustand";

export const useUserStore = create(() => ({
  name: "Katerina",
  position: "Engineering",
  photo:
    "https://s3-alpha-sig.figma.com/img/dbaa/16a5/0e7db451d868b67382bd8b61d8ac3da1?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aYTgfeQm7VtwMdQbVKQb9zAIdrtbM~pJ3XzoIGqqrPq6s62PTBHoCSzzjwmW6~Zaa9T~QszYdLZLw-rZ8Zcsmj-jhSYVOuk9fwGysMkjIaJWwgGLPnJ7GbPOmq5yqGzV2euXiXNg0cwm1P~riKyGLrYVVzt2sH5e4AN25LP9p9dvAlEu09VorvkN-V3VcGZL5PK7fsFF40BmKIEWm1J3rIjRfZ3fWWdgvleETIHjlkYPrPRkqNB~KIZB~Fe7E2WJeoIXKHXEYeUpt1vCldTp7FfyxTXYA7CWKtFGv3e5sOM11kmDV5~59NvoCEPKjFiMtM4gAl5Mjr409dz2g6TRXQ__",
}));
