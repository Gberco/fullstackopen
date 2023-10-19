
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {

    const arrLikes = blogs.map( blogs => blogs.likes )

    return arrLikes.reduce(( resultado, likes ) => {
        return resultado + likes
    }, 0)

    /*
    let sumOfLikes = 0;
    
    blogs.forEach( blog => {
        sumOfLikes = blog.likes + sumOfLikes;
    })
    
    return blogs.length === 0 ? 0 : sumOfLikes;
*/
}

const favoriteBlogs = (blogs) => {
    //tiene que devolver el blog con más likes
    //title, author, likes
    const orderedArrayBlogLikes = blogs.sort( (a, b) => { return b.likes - a.likes })
    
    return  { 
        title: orderedArrayBlogLikes[0].title,
        author: orderedArrayBlogLikes[0].author,
        likes: orderedArrayBlogLikes[0].likes
     }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs
}