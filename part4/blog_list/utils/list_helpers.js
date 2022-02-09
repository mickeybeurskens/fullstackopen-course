function argMax(array) {
  return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0)
}

const dummy = () => {
  // console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum += blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes)
  const favorite = { ...blogs[argMax(likesArray)] }
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const numberBlogs = {}
  blogs.map(blog => {
    if (numberBlogs[blog.author]) {
      numberBlogs[blog.author] += 1
    } else {
      numberBlogs[blog.author] = 1
    }
  })
  const author = Object.keys(numberBlogs)[argMax(Object.values(numberBlogs))]
  return {
    author: author,
    blogs: numberBlogs[author]
  }
}

const mostLikes = (blogs) => {
  const likeTotal = {}
  blogs.map(blog => {
    if (likeTotal[blog.author]) {
      likeTotal[blog.author] += blog.likes
    } else {
      likeTotal[blog.author] = blog.likes
    }
  })
  const likedBestAuthor = Object.keys(likeTotal)[argMax(Object.values(likeTotal))]
  return {
    author: likedBestAuthor,
    likes: likeTotal[likedBestAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}