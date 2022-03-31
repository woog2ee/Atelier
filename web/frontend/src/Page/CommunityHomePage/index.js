import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  FormControl,
  Row,
  Col,
  FormLabel,
  Pagination,
} from 'react-bootstrap'
import axios from 'axios'
import Exhibition from '../../Component/Exhibition'
import NavDropdown from 'react-bootstrap/NavDropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import Post from './Post'
import './style.css'
import PageBar from '../../Component/PageBar'
const CommunityHomePage = () => {
  const [onlineExhibition, setOnlineExhibition] = useState([])
  useEffect(() => {
    axios.get('/api/online-exhibition').then(res => {
      setOnlineExhibition(res.data)
    })
  }, [])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)

  const totalPage = onlineExhibition.length / postPerPage
  const indexOfLastPost = currentPage * postPerPage //1*10 = 10번 포스트
  const indexOfFirstPost = indexOfLastPost - postPerPage //10-10 = 0번 포스트
  const currentPosts = onlineExhibition.slice(indexOfFirstPost, indexOfLastPost) //0~10번까지 포스트
  const changeCurrentPage = num => {
    setCurrentPage(num)
  }
  return (
    <>
      <Container className="communityPage">
        <Container className="community-main">
          <FormLabel
            style={{ fontSize: '30px', color: '#DD9700', marginTop: '8px' }}
          >
            지금 나에게 맞는 전시회를 찾아보세요!
          </FormLabel>
          <Row>
            <InputGroup className="align-text">
              <InputGroup.Text>키워드를 입력하세요</InputGroup.Text>
              <FormControl
                aria-label="first keyword"
                placeholder="1st keyword"
              />
              <FormControl
                aria-label="second keyword"
                placeholder="2nd keyword"
              />
              <FormControl
                aria-label="third keyword"
                placeholder="3rd keyword"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Button
              </Button>
            </InputGroup>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <NavDropdown
                title="Dropdown"
                id="nav-dropdown"
                style={{ float: 'right' }}
              >
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">
                  Something else here
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Col>
          </Row>
          <Post posts={currentPosts}></Post>
          <PageBar
            lastIndex={totalPage}
            activePage={currentPage}
            changePage={changeCurrentPage}
          ></PageBar>
        </Container>
      </Container>
    </>
  )
}

export default CommunityHomePage
