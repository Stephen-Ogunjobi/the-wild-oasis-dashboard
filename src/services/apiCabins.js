import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins not found");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  let imagePath = newCabin.image;
  let imageName;

  // Only generate new image path if a new file is provided
  if (!hasImagePath && newCabin.image && newCabin.image.name) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  let data, error;

  if (!id) {
    // Create
    ({ data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single());
  } else {
    // Edit
    ({ data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single());
  }

  if (error) {
    throw new Error("Cabins could not be created");
  }

  // Only upload if a new file is provided

  if (!hasImagePath && newCabin.image && newCabin.image.name) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      // Rollback only if it was a create
      if (!id) await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(
        "Cabins could not be created due to image uploading fail"
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
