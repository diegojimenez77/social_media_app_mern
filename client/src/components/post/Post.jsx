import "./post.css"
import { MoreVert } from "@mui/icons-material"
import axios from "axios";
import {useEffect, useState} from "react";
import {format} from "timeago.js";
import {Link} from "react-router-dom";

export default function Post({post}) {
    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=> {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data)
        };
        fetchUser();
      },[post.userId]);

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked)
    }
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img className="postProfileImg" 
                    src={PF+user.profilePicture || PF+"person/noAvatar.png"} 
                    alt="" />
                    </Link>
                    <span className="postUsername">
                        {user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} commets</span>
                </div>
            </div>
        </div>
    </div>
  )
}
