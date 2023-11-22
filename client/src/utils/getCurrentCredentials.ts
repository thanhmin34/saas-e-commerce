// export const fetchCredentials = async (Auth: string) => {
//   const currentAuth = await Auth.currentUserCredentials()
//   return currentAuth
// }

interface IIs {
  identityId: string
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
  authenticated: boolean
}
