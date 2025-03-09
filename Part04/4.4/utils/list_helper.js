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

module.exports = {
    dummy,
    totalLikes
}