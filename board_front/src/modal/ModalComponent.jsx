import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, CardBody, CardText, Col, FormGroup, Input, ModalBody, ModalHeader, Row } from 'reactstrap';
import update from 'immutability-helper';



// isModal : 모달창을 띄울지 말지 결정하는 상태값
// modalViewToggle : 모달 띄우는 이벤트
// createBoard : 삽입 메서드
// message : 버튼에 추가 or 수정 텍스트 표시하는 파라미터
//mode : 추가인지 수정인지 구분하는 파라미터
//updateData : 수정할 데이터
//updateIndex : 수정할 데이터의 인덱스
//updateBoard : 수정 메서드


const ModalComponent = ({ isModal, modalViewToggle, createBoard, message, mode, updateData, updateIndex, updateBoard }) => {

  const [inputCreate, setInputCreate] = useState();
  const [inputUpdate, setInputUpdate] = useState({ no: updateData?.no });

  //삽입용
  const createOnChange = (e) => {
    const { name, value } = e.target;
    setInputCreate({
      ...inputCreate,
      [name]: value
    })
  }

  //수정용
  const updateOnChange = (e) => {
    const { name, value } = e.target;
    setInputUpdate({
      ...inputUpdate,
      no: updateData?.no,
      [name]: value,
    });
    console.log(inputUpdate);
  }

  return (
    <Modal
      isOpen={isModal}
      toggle={modalViewToggle}
      centered={true}
      fullscreen={true}
    >
      <ModalHeader toggle={modalViewToggle}>
        {message + "게시글을 입력하세요."}
      </ModalHeader>
      <ModalBody>
        <Card className='my-2' color='primary' outline>
          <CardBody>
            <FormGroup>
              <CardText>
                제목
                {
                  mode === 'create' ?
                    <Input name='title' onChange={createOnChange} />
                    :
                    <Input name='title' defaultValue={updateData?.title} onChange={updateOnChange} />
                }
                내용
                {
                  mode === 'create' ?
                    <Input type='textarea' name='contents' onChange={createOnChange} />
                    :
                    <Input type='textarea' name='contents' defaultValue={updateData?.contents} onChange={updateOnChange} />
                }
              </CardText>
            </FormGroup>
            <Row>
              <Col sm={{ offset: 3, size: 'auto' }}>
                {
                  mode === 'create' ?
                    <Button color='success' onClick={() => { createBoard(inputCreate) }}>추가</Button>
                    :
                    <Button color='primary' onClick={() => { updateBoard(inputUpdate, updateIndex) }}>수정</Button>
                }
              </Col>
              <Col sm={{ offset: 4, size: 'auto' }}>
                <Button onClick={() => { modalViewToggle(); }}>닫기</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  )
}

export default ModalComponent;