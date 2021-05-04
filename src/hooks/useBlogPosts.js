import { useState, useEffect } from 'react';
import { queryBlogs } from '../utils/blog';

export default function useBlogPosts(page, size) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    async function fetchData() {
      try {
        let res = await queryBlogs(page, size);
        let newBlogs = blogs;
        let check = new Set();
        for (let i = 0; i < newBlogs.length; i++) {
          check.add(newBlogs[i].id);
        }

        for (let i = 0; i < res.data.blogs.length; i++) {
          let blog = res.data.blogs[i];
          if (!check.has(blog.id)) {
            newBlogs.push(blog);
          }
        }
        setBlogs(newBlogs);
        setHasNext(res.data.hasNext)
        setLoading(false)
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }

    fetchData();
  }, [page, size, blogs]);

  return { loading, error, blogs, hasNext }
};