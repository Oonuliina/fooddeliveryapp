import { SanityClient, createClient } from "@sanity/client"
import imageBuilder from "@sanity/image-url"

const client = createClient({
    projectId: 'd5b3zu4x',
    dataset: 'production',
    useCdn: true,
    apiVersion: "2021-10-21",   
})

const builder = imageBuilder(client)
export const urlFor = (source) => builder.image(source)

export default client