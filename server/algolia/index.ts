import algoliasearch from 'algoliasearch'
import Post from '../database/models/post'

const config = useRuntimeConfig()

const algoliaClient = algoliasearch(config.algoliaAppId, config.algoliaApiKey)
const algoliaIndex = algoliaClient.initIndex(config.algoliaIndexName)

export default async () => {
    try {
        const posts = (await Post.find().populate("userId").populate("comment.userId").populate("admire.userId").lean()).reverse()
        const modiPosts = [...posts]
        modiPosts.forEach((post) => {
          post["objectID"] = String(post._id)
        })        
        const changeStream = Post.watch()
        changeStream.on('change', async (change) => {
            const posts = (await Post.find().populate("userId").populate("comment.userId").populate("admire.userId").lean()).reverse()
            const modiPosts = [...posts]
            modiPosts.forEach((post) => {
              post["objectID"] = String(post._id)
            })   
            await algoliaIndex.clearObjects();
            await algoliaIndex.saveObjects(modiPosts);
        });
        const content = await algoliaIndex.saveObjects(modiPosts)
    } catch (err) {
        console.log(err)
    }
}