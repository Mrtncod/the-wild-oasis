import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins can not load ");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create/edit cabin
  let query = supabase.from("cabins");

  // a) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin can not be created ");
  }

  // 2) Upload image
  // if (hasImagePath) return data;   With this code ON, we cant make copy of the copy

  const { data, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3) Delete cabin if there was an error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image can not upload, cabin NOT created ");
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin can not be deleted ");
  }
}
