import React, { useEffect, useState } from 'react'
import './App.css'
import { Card, CardHeader, CardBody, CardText, Row, Col, Button } from 'reactstrap'
import ModalComponent from './modal/ModalComponent'
import update from 'immutability-helper'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

// const data = [
//   { no: 1, title: '제목1', contents: '내용1' },
//   { no: 2, title: '제목2', contents: '내용2' },
//   { no: 3, title: '제목3', contents: '내용3' },
//   { no: 4, title: '제목4', contents: '내용4' }
// ]

function App() {
  const [board, setBoard] = useState();
  // 모달 띄울것인지 아닌지 상태 변수를 가리킴
  const [isModal, setIsModal] = useState(false);
  // 모달 화면 띄우는 함수
  const modalViewToggle = () => setIsModal(!isModal);
  // 모드에 수정모드 or 삽입 모드 설정하는 모달창
  const [mode, setMode] = useState('create');
  // 모달에 버튼 기능 추가 or 수정 텍스트 표시할 변수
  const [message, setMessage] = useState();
  // state 값 변화시 각 state 변화된 결과를 렌더링 하기 위해 추가
  // board state 값을 위한 메서드
  const [isStateChange, setIsStateChange] = useState(false);
  // 수정용 state 값 : data - 해당 index의 데이터 전달, index - 해당 인덱스 전달
  const [updateData, setUpdateData] = useState();
  const [updateIndex, setUpdateIndex] = useState();

  //페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:8080/api/board/select/list')
      .then((response) => {
        setBoard(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      })
  }, [isStateChange])


  // 모달에 전달해주는 메서드
  const readyChnage = () => {
    setMessage('추가');
    setMode('create');
    modalViewToggle();
  }

  //생성 메서드, 원본을 변경하지 않고 새로운 배열을 생성
  const createBoard = (data) => {
    axios.post('http://localhost:8080/api/board/insert/board', data)
      .then((response) => {
        alert('게시글이 추가되었습니다.');
        setBoard(
          update(board, {
            $push: [data],
          })
        )
      }).catch((e) => {
        console.error(e);
      })
    modalViewToggle();
  }

  // 모달에 전달해주는 값 메소드 추가
  const readyUpdate = (data, index) => {
    setMessage('수정');
    setMode('update');
    modalViewToggle();
    setUpdateData(data);
    setUpdateIndex(index);
  }

  // 수정 이벤트
  const updateBoard = (data, index) => {
    axios.post('http://localhost:8080/api/board/update/board', data)
      .then((response) => {
        alert('게시글이 수정되었습니다.');
        setBoard(
          update(board, {
            $merge: { [index]: data }
          })
        )
      })
      .catch((e) => {
        console.error(e);
      })
    modalViewToggle();
    setIsStateChange(!isStateChange);
  }

  // 삭제 메서드
  const deleteBoard = (index) => {
    const deleteData = board[index];
    axios.post('http://localhost:8080/api/board/delete/board', deleteData)
      .then((response) => {
        alert('게시글이 삭제되었습니다.');
        setBoard(
          update(board, {
            $splice: [[index, 1]]
          })
        )
      })
      .catch((e) => {
        console.error(e);
      })
  }

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  }

  const offset = currentPage * itemsPerPage;
  const currentPageData = Array.isArray(board) ? board.slice(offset, offset + itemsPerPage) : [];
  const pageCount = Array.isArray(board) ? Math.ceil(board.length / itemsPerPage) : 0;

  return (
    <div className='container'>
      <h1>게시판 프로젝트</h1>
      <br /><br /><br /><br />
      {/* board?.map >> board가 null이나 undefined일 경우 map 호출안하고 undefined 반환 */}
      {currentPageData.length > 0 ? (
        currentPageData.map((board, index) => (
          <Card key={index} className='my-2' color='primary' outline>
            <CardHeader>{board?.title}</CardHeader>
            <CardBody>
              <CardText>{board?.contents}</CardText>
              <br />
              <br />
              <Row>
                <Col sm={{ offset: 3, size: 'auto' }}>
                  <Button color='primary' onClick={() => readyUpdate(board, index)}>수정</Button>
                </Col>
                <Col sm={{ offset: 4, size: 'auto' }}>
                  <Button color='danger' onClick={() => deleteBoard(index)}>삭제</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Button color='success' onClick={() => readyChnage()}>추가</Button>
      </Row>
      <ModalComponent
        isModal={isModal}
        modalViewToggle={modalViewToggle}
        mode={mode}
        message={message}
        createBoard={createBoard}
        updateBoard={updateBoard}
        updateData={updateData}
        updateIndex={updateIndex}
      />
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default App
