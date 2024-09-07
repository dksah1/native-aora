import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.dk.aora",
  projectId: "66db426c00198dbc9a35",
  databaseId: "66db45e200370a7db031",
  userCollectionId: "66db461d0022fc41a5e0",
  videoCollectionId: "66db4661002ddcad35ce",
  storageId: "66db48c30000e02625cd",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw new Error("Failed to create user");
    }
    const avatarUrl = avatars.getInitials();

    await SignIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export async function SignIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Sign In
// export async function SignIn(email, password) {
//   try {
//     const session = await account.createSession(email, password);

//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
