// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MessageStatus } from "constants/enums";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Bob Bot",
    photo:
      "https://sun1-27.userapi.com/s/v1/ig2/iJubJ3GIDmtdk-X1Jq7lN0UNmq3jfRaBe_isP2_trx71sLvKMPVVz-CUU_yESJWAqrF_LsKL2cUUBIiSifSLHVR4.jpg?size=841x900&quality=96&crop=29,0,841,900&ava=1",
    text: "Hello world!",
    time: new Date(),
    status: MessageStatus.Readed,
  });
}
