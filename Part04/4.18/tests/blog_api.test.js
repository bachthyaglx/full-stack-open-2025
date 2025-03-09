const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// ...

test('4.8 Returns the amount of blog posts', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('4.9 Unique identifier property of the blog posts is named _id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(result => result.id)

  assert.strictEqual(ids.length, helper.initialBlogs.length)
})

test('4.10 POST request to /api/blogs creates a new blog', async () => {
  const newBlog = {
    title: "new blog",
    author: "Thy",
    url: "http://www.thythy.com",
    likes: 1
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)  

  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('new blog'))
})

test('4.11 If likes missing from request, set default to 0', async () => {
  const newBlog = {
    title: "new blog",
    author: "Thy",
    url: "http://www.thythy.com"
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  const foundBlog = blogsAtEnd.find(n => n.title === newBlog.title);

  assert.strictEqual(foundBlog.likes, 0)  
})

test('4.12 If title/url missing, backend responds 400 Bad Request', async () => {
  const newBlog = {
    url: "http://www.thythy.com",
    likes: 2
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)  
})

describe('4.13 Deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('4.14 Updating the information of an individual blog post', () => {
  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlogData = {
      author: 'Khuu Bach Thy',
      likes: 10
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);

    assert.strictEqual(updatedBlog.author, updatedBlogData.author)
  })
})

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('a specific blog is within the returned blogs', async () => {
//   const response = await api.get('/api/blogs')
//   const titles = response.body.map(r => r.title)
  
//   assert(titles.includes('Canonical string reduction'))
// })

// test('a valid blog can be added', async () => {
//   const newBlog = {
//     title: "new blog",
//     author: "Thy",
//     url: "http://www.google.com",
//     likes: 1
//   }
  
//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)
  
//   const blogsAtEnd = await helper.blogsInDb()
//   assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)  

//   const titles = blogsAtEnd.map(n => n.title)
//   assert(titles.includes('new blog'))
// })

// test('blog without title is not added', async () => {
//   const newBlog = {
//     author: 'unknown',
//     url: 'unknown',
//     likes: 'unknown' 
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)
  
//   const blogsAtEnd = await helper.blogsInDb()

//   assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
// })

// test('a specific blog can be viewed', async () => {
//   const blogsAtStart = await helper.blogsInDb()

//   const blogToView = blogsAtStart[0]

//   const resultBlog = await api    
//     .get(`/api/blogs/${blogToView.id}`)    
//     .expect(200)    
//     .expect('Content-Type', /application\/json/)

//   assert.deepStrictEqual(resultBlog.body, blogToView)
// })

// test('a blog can be deleted', async () => {
//   const blogsAtStart = await helper.blogsInDb()
//   const blogToDelete = blogsAtStart[0]

//   await api    
//     .delete(`/api/blogs/${blogToDelete.id}`)    
//     .expect(204)

//   const blogsAtEnd = await helper.blogsInDb()
//   const titles = blogsAtEnd.map(r => r.title)

//   assert(!titles.includes(blogToDelete.title))
//   assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
// })

//...

after(async () => {
  await mongoose.connection.close()
})