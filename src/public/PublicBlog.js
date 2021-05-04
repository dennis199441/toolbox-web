import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavBar } from '../common';
import useBlogPosts from '../hooks/useBlogPosts';
import BlogCard from './components/BlogCard';

const useStyles = makeStyles({
    scrollable: {
        marginTop: '10vh'
    }
});

export default function PublicBlog() {

    const classes = useStyles();
    const [page, setPage] = useState(1);
    const { blogs, hasNext } = useBlogPosts(page, 10);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    return (
        <div className="App">
            <NavBar />
            <header className="App-header">
                <div className={classes.scrollable}>
                    {blogs.map((blog, index) => {
                        return <BlogCard key={blog.id} title={blog.title} author={blog.author} creationTime={blog.creationTime} />
                    })}
                    {hasNext ? <Button onClick={loadMore} color="inherit">Load more</Button> : null}
                </div>
            </header>
        </div>
    )
}