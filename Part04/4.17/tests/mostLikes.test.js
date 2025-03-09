const listHelper = require('../utils/list_helper').mostLikes

describe('Which author has the largest amount of likes?', () => {
  const blogs = [
    {
      author: "Edsger W. Dijkstra",
      likes: 17
    },
    {
      author: "Thy Khuu",
      likes: 15
    },
    {
      author: "Thao Khuu",
      likes: 10
    }
  ]
    
  test('Which author has the largest amount of likes?', () => {
    const result = listHelper(blogs)
    const value = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(result).toEqual(value)
  })
})