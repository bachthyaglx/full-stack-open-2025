## 2.3*: Course information step8
If you haven't done so already, calculate the sum of exercises with the array method reduce.

**Pro tip 1**: when your code looks as follows:
```ruby
const total = 
  parts.reduce((s, p) => someMagicHere)
 ```
and does not work, it's worth to use console.log, which requires the arrow function to be written in its longer form:
```ruby
const total = parts.reduce((s, p) => {
  console.log('what is happening', s, p)
  return someMagicHere 
})
```
**Pro tip 2**: There is a [plugin for VS Code](https://marketplace.visualstudio.com/items?itemName=cmstead.jsrefactor) that automatically changes short form arrow functions into their longer form, and vice versa.

![image](https://user-images.githubusercontent.com/62774638/119367272-7357b980-bcba-11eb-8be8-f58e2d0d8f1a.png)
