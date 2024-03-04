export function useCommentApi() {
    const baseUrl = 'https://jsonplaceholder.typicode.com/comments'
    async function getCommentByPostId(postId: string) {
        return fetch(`${baseUrl}?postId=${postId}`)
            .then((e) => e.json())
            .then((e) => e)
    }
    async function getCommentById(commentId: string) {
        return fetch(`${baseUrl}/${commentId}`)
            .then((e) => e.json())
            .then((e) => e)
    }
    return { getCommentByPostId, getCommentById }
}
