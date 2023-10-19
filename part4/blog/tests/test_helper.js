const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'El quijote',
      author: 'Barbarrosa',
      url: 'http://www.og.com',
      likes: 95,

    },
    {
      title: 'La danza profunda',
      author: 'Tito Leo',
      url: 'http://www.aññs.com',
      likes: 24,
    
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
  const users = await User.find({})
  return users.map( u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}