const listHelper = require('../utils/list_helper').mostBlogs

describe('Which author has the largest amount of blogs?', () => {
  const blogs = [
    {
      author: "Robert C. Martin",
      blogs: 3
    },
    {
      author: "Thy Khuu",
      blogs: 1
    },
    {
      author: "Thao Khuu",
      blogs: 2
    }
  ]
    
  test('Which author has the largest amount of blogs?', () => {
    const result = listHelper(blogs)
    const value = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(value)
  })
})