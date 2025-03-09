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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}