// const { test } = require('node:test')

// const listHelper = require('../utils/list_helper').dummy

// test('dummy returns one', () => {
//   const blogs = ['ThyKhuu','LongTran']

//   const result = listHelper(blogs)

//   expect(result).toBe(1)
// })

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})