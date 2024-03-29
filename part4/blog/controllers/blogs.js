const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {  
    const authorization = request.get('authorization')  

    if (authorization && authorization.startsWith('Bearer ')) {
            return authorization.replace('Bearer ', '')  
        }

    return null
}
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
    }
)

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findOneAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate( request.params.id, blog, {new:true})
    response.status(200).json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    console.log(decodedToken.id)
    if(!decodedToken.id){
        return response.status(401).json({error:'token invalidad'})
    }
    const user = await User.findById(decodedToken.id)
   

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

module.exports = blogsRouter