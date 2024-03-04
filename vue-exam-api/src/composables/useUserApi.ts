export function useUserApi() {
  const baseUrl = "https://jsonplaceholder.typicode.com/users";
  async function getAll() {
    return await fetch(baseUrl)
      .then((e) => e.json())
      .then((e) => e)
      .catch((x) => x);
  }
    async function getById(id: string) {
        return await fetch(`${baseUrl}/${id}`)
            .then((e) => e.json())
            .then((e) => e)
            .catch((x) => x)
    }
  return {
      getAll,
      getById,
  }
}
