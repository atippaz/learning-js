export function usePostApi(){
  const baseUrl = "https://jsonplaceholder.typicode.com/posts"
  async function getAll(): Promise<[]> {
      return await fetch(baseUrl)
          .then((e) => e.json())
          .then((e) => e)
          .catch((x) => x)
  }
  async function getById(id:string) {
      return await fetch(`${baseUrl}/${id}`)
          .then((e) => e.json())
          .then((e) => e)
          .catch((x) => x)
  }
  return {
      getById,
      getAll,
  }
}