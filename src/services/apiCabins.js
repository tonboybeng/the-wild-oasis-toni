import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);

    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string" ? newCabin.image?.startsWith(supabaseUrl) : false;

  // 1. Create / Edit Cabin
  const imageName = hasImagePath ? "" : newCabin.image?.name ? `${Math.random()}-${newCabin.image?.name}`.replaceAll("/", "") : "";
  const imagePath = hasImagePath ? `${newCabin.image}` : imageName ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}` : null;

  let query = supabase.from("cabins");

  // A) Create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) Edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or edited.");
  }

  // 2. Upload Image only if hasImagePath === false

  if (!hasImagePath && imageName) {
    const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

    // 3. If error then throw error and delete the cabin

    if (storageError) {
      console.error(storageError.message);

      await supabase.from("cabins").delete().eq("id", data.id);

      throw new Error("Cabin image can not be uploaded and cabin can not be created.");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
