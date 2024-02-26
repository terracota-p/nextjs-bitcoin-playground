import { getSession } from "@auth0/nextjs-auth0";

export async function getAuthenticatedUser() {
  return (await getSession())?.user;
}
