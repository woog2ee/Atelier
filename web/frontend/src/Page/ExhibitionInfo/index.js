import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Figure,
  Row,
  Col,
  Badge,
  FormLabel,
} from 'react-bootstrap'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import HeartImg from './heart.png'
import EmptyHeartImg from './heart-2.png'
import Comment from '../../Component/Comment'
import isLogin from '../../utils/isLogin'
import axios from 'axios'
import { header } from '../../config'
import './style.css'
import OfflineExhibition from '../../Component/OfflineExhibition'
const ExhibitionInfo = () => {
  const { id, title, date, keyword, poaster, description, like, author } =
    useLocation().state //state
  const { key } = useParams()
  //const { id, title, date, keyword, poaster, description, like } = useLocation().state //state
  //console.log(title + " " + date + " " + keyword)
  const [favorite, setFavorite] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [commentList, setCommentList] = useState([])
  const [commentLength, setCommentLength] = useState(0)
  const [likecount, setLikecount] = useState(like)
  const navigate = useNavigate()
  const commentChange = e => {
    setComment(e.target.value)
    setCommentLength(e.target.value.length)
  }
  const onHeartClick = () => {
    setFavorite(!favorite)
    if (favorite === true) {
      if (likecount - 1 < 0) {
        setLikecount(0)
      } else {
        setLikecount(likecount - 1)
      }
    } else {
      setLikecount(likecount + 1)
    }
  }
  const addComment = newComment => {
    var _commentList = [...commentList]
    _commentList.push(newComment)
    setCommentList(_commentList)
  }

  //댓글 등록
  const onCommentClick = () => {
    var body = {
      description: comment,
      online_exhibition_id: id,
    }
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    axios.post('/api/user/comment', body).then(res => {
      console.log(res.data)
      addComment(res.data)
    })
    //적었던 댓글 초기화
    document.getElementById('commentArea').value = ''
    setComment('')
    setCommentLength(0)
  }
  const deleteComment = target => {
    var _commentList = [...commentList]
    var idx = _commentList.findIndex(comment => comment.id === target.id)
    _commentList.splice(idx, 1)
    setCommentList(_commentList)
  }

  //상세보기 페이지 이동
  const moveToExhibition = () => {
    navigate('/show-exhibition', {
      state: {
        id: id,
      },
    })
  }

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    if (isLogin()) {
      axios.get('/api/user/likes', { params: { id: id } }).then(res => {
        setFavorite(res.data.clicked)
        setLikecount(res.data.likeCount)
      })
    }
    //댓글 가져오기
    axios.get('/api/comment', { params: { id: id } }).then(res => {
      setCommentList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    if (isLogin()) {
      //console.log(favorite)
      var body = {
        id: id,
        clicked: favorite,
        likeCount: likecount,
      }
      //console.log(body)

      async function post() {
        axios.post('/api/user/likes', body, header).then(res => {})
      }

      post()
    }
  }, [favorite])

  return (
    //console.log(parms.key)
    <Container>
      <Container
        className="exhibitionInfo-container"
        style={{ padding: '5px', display: 'block' }}
      >
        <Container style={{ width: '80%' }}>
          <Row style={{ marginTop: '20px' }}>
            <Col>
              <Container className="exhibition-img-container">
                <Figure.Image className="img" src={poaster} />
              </Container>
            </Col>
            <Col xs={6}>
              <Container className="title-container">
                <Badge
                  className="title-badge1"
                  bg="None"
                  style={{ margin: 'auto' }}
                >
                  {title}
                </Badge>
              </Container>
              <Container className="author-container">
                {author} 님의 작품
              </Container>

              <Container className="tag-label-container1">
                <Badge className="tag-badge" bg="None" pill>
                  #{keyword[0]}
                </Badge>
                <Badge className="tag-badge" bg="None" pill>
                  #{keyword[1]}
                </Badge>
                <Badge className="tag-badge" bg="None" pill>
                  #{keyword[2]}
                </Badge>
              </Container>
              <Container className="description-container">
                {description}
              </Container>

              <Container className="heart-container">
                <img
                  src={favorite ? HeartImg : EmptyHeartImg}
                  style={{ width: '20px' }}
                  onClick={onHeartClick}
                ></img>
                {likecount} likes
              </Container>
              <Container className="date-container">{date}</Container>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col></Col>
          <Button
            style={{
              width: '80%',
              marginTop: '40px',
              marginBottom: '40px',
              background: '#daa520',
              border: '#daa520',
            }}
            onClick={moveToExhibition}
          >
            전시회 바로 이동
          </Button>
          <Col></Col>
        </Row>
        <Row>
          {commentList.map(comment => (
            <Comment comment={comment} deleteFunc={deleteComment}></Comment>
          ))}
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Container>
            <Row
              style={{
                fontStyle: 'oblique',
                fontWeight: 'bold',
                textAlign: 'left',
              }}
            >
              <Container style={{ width: '80%' }}>
                <Container
                  style={{ width: '90%', marginLeft: '0px', padding: '0px' }}
                >
                  <div style={{ float: 'right' }}>{commentLength}/400</div>
                </Container>
              </Container>
            </Row>
            <Row>
              <Container style={{ width: '80%' }}>
                {isLogin() ? (
                  <textarea
                    id="commentArea"
                    maxLength={400}
                    placeholder="댓글을 남겨보세요"
                    style={{ width: '90%', height: '70px' }}
                    onChange={commentChange}
                  ></textarea>
                ) : (
                  <textarea
                    maxLength={400}
                    placeholder="로그인을 해주세요"
                    style={{ width: '90%', height: '70px' }}
                    onChange={commentChange}
                    disabled={true}
                  ></textarea>
                )}
                <Button
                  style={{
                    background: '#daa520',
                    border: '#daa520',
                    width: '10%',
                    height: '70px',
                    float: 'right',
                  }}
                  disabled={!isLogin()}
                  onClick={onCommentClick}
                >
                  게시
                </Button>
              </Container>
            </Row>
          </Container>
        </Row>
        <Container className="recommend-container">
          <FormLabel>안녕하세요</FormLabel>
        </Container>
      </Container>
    </Container>
  )
}

export default ExhibitionInfo