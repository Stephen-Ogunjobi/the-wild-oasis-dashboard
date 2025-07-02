import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  //check if there is a current active section
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  //redownload user from supabase, for safety

  const { data } = await supabase.auth.getUser();

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
