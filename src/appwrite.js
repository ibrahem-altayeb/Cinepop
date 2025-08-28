// src/appwrite.js
import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // ← Use this!
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const UpdateSearchCount = async (searchTerm, movie) => {
  console.log("UpdateSearchCount called with:", searchTerm, movie);
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    console.log("Found docs:", result.documents.length);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      console.log("Updating doc id:", doc.$id, "with count:", doc.count + 1);

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      console.log("Successfully updated document");
    } else {
      console.log("Creating new doc");
      try {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });
        console.log("Successfully created new doc");
      } catch (createError) {
        console.error("Error creating new document:", createError);
      }
    }
  } catch (error) {
    console.error("Error in UpdateSearchCount:", error);
  }
};

export const HistoryMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(50),
      Query.orderDesc("count"),
    ]);
    return result.documents;
  } catch (error) {
    console.log("Error in HistoryMovies:", error);
  }
};
