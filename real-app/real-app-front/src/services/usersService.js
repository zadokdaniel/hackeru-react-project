import httpService from "./httpService";

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function loginUser(credentials) {
  const { data } = await httpService.post("/auth", credentials);
  console.log(data.token);
}

const usersService = {
  createUser,
  loginUser,
};

export default usersService;
