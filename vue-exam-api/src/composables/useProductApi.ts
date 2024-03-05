export function useProductApi() {
    const baseUrl = 'https://dummyapi.online/api/products'
    async function getAll(): Promise<[]> {
        return await fetch(baseUrl)
            .then((e) => e.json())
            .then((e) => e)
            .catch((x) => x)
    }
    async function getById(id: string) {
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
