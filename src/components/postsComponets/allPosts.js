import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../userContext';
import { FETCH_POSTS_QUERY } from '../../util/graphql';
import '../styles/posts.css';
import AppBar from '../appBar';
import PostCard from './postCard';
import PostForm from './postForm';
import Loading from '../loading';

function AllPosts() {

    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <AppBar backgroundColor={"#4A156B"} />
            {
                loading ? <Loading /> :
                    (
                        <div className="posts-container">
                            {user && <PostForm user={user} />}
                            {
                                data.getPosts.map(post => (
                                    <PostCard key={post.id} post={post} user={user} fromDashboard={false} />
                                ))
                            }
                        </div>
                    )
            }
        </div>
    );
}

export default AllPosts;