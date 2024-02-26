import { linkTokenCreate } from "@/app/lib/repository/bank-api-client";

export async function POST() {
  const token = await linkTokenCreate();

  return Response.json(token);
}
