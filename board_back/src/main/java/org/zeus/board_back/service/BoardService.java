package org.zeus.board_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zeus.board_back.entity.Board;
import org.zeus.board_back.mapper.BoardMapper;

import java.util.List;

@Service
public class BoardService {
    @Autowired
    BoardMapper boardMapper;

    public List<Board> selectList() {
        return boardMapper.selectList();
    }

    public Integer insertBoard(String title, String contents) {
        return boardMapper.insertBoard(title, contents);
    }

    public Integer updateBoard(Board board) {
        return boardMapper.updateBoard(board);
    }

    public Integer deleteBoard(int no) {
        return boardMapper.deleteBoard(no);
    }
}
