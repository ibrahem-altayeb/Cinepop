// // src/appwrite.js
// import { Client, Databases, ID, Query } from "appwrite";


// const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;



// const client = new Client()
// .setEndpoint("https://cloud.appwrite.io/v1")
// .setProject(PROJECT_ID);

// const database = new Databases(client);

// export const UpdateSearchCount = async ( searchTerm, movie) => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.equal('searchTerm', searchTerm),
//     ]);

//     if (result.documents.length > 0) {
//       const doc = result.documents[0];

//       await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
//         count: doc.count + 1,
//       });
//     } else {
      // await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//         searchTerm,
//         count: 1,
//         movie_id: movie.id,
//         poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const HistoryMovies = async () => {
//   try {
//     const result = await database.listDocuments(
//       DATABASE_ID,
//       COLLECTION_ID,
//       [
//         Query.limit(50),
//         Query.orderDesc("count")
//       ]
//     );
//     return result.documents;
//   } catch (error) {
//     console.log("Error in HistoryMovies:", error);
//   }
// };

// src/appwrite.js
import { Client, Account, Databases, ID, Query } from "appwrite";

// ✅ Load your Appwrite project info from Vite environment variables
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

// ✅ Anonymous login if not already logged in
export const loginAnonymously = async () => {
  try {
    await account.get(); // Check if already logged in
  } catch {
    try {
      await account.createAnonymousSession();
    } catch (error) {
      console.error("Anonymous login error:", error);
    }
  }
};

// ✅ Save search term + movie info to the database
export async function UpdateSearchCount(term, movie) {
  try {
    const user = await account.get();

    await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        searchTerm: term,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        count: 1,
      }
    );
  } catch (err) {
    console.error("Failed to update search count:", err);
  }
}


// ✅ Fetch user-specific history from the database
export const HistoryMovies = async () => {
  try {
    const user = await account.get();

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userId", user.$id),
      Query.orderDesc("count"), // optional
      Query.limit(50),
    ]);

    return result.documents;
  } catch (error) {
    console.error("Error in HistoryMovies:", error);
    return [];
  }
};