const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum += blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  function argMax(array) {
    return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0)
  }
  const likesArray = blogs.map(blog => blog.likes)
  const favorite = { ...blogs[argMax(likesArray)] }
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}