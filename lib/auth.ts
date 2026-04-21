export async function login(email: string) {
  return {
    success: true,
    user: {
      email,
    },
  };
}
