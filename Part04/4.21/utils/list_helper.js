const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (list) => {
    let sum=0
    list.forEach(blog => {
        sum+=blog.likes
    });
    return sum>0 ? sum : 0
}

const favoriteBlog = (list) => {
    if(list && list.length>0) {
        let max=list[0].likes
        let result=list[0]
    
        list.forEach(blog => {
            if(blog.likes>max) {
                max=blog.likes
                result=blog
            }
        });
        return result
    } else
        return'List is null'
}

const mostBlogs = (list) => {
    var ordered_list = _.sortBy(list, [function(list) { return list.blogs; }]);
    return list && list.length>0 ? ordered_list[ordered_list.length-1] : 'List is not existed'
}

const mostLikes = (list) => {
    var ordered_list = _.sortBy(list, [function(list) { return list.likes; }]);
    return list && list.length>0 ? ordered_list[ordered_list.length-1] : 'List is not existed'
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}