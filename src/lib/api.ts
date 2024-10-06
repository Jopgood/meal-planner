// lib/api.ts
type DirectusAction =
  | "readOne"
  | "readMany"
  | "createOne"
  | "updateOne"
  | "deleteOne";

async function fetchDirectusAPI(
  action: DirectusAction,
  collection: string,
  data?: any,
  id?: string | number
) {
  const response = await fetch("/api/directus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, collection, data, id }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export const databaseApi = {
  readOne: (collection: string, id: string | number) =>
    fetchDirectusAPI("readOne", collection, undefined, id),
  readMany: (collection: string, query?: any) =>
    fetchDirectusAPI("readMany", collection, query),
  createOne: (collection: string, item: any) =>
    fetchDirectusAPI("createOne", collection, item),
  updateOne: (collection: string, id: string | number, data: any) =>
    fetchDirectusAPI("updateOne", collection, data, id),
  deleteOne: (collection: string, id: string | number) =>
    fetchDirectusAPI("deleteOne", collection, undefined, id),
};
