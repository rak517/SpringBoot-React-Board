package org.zeus.board_back.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.zeus.board_back.entity.Board;
import org.zeus.board_back.service.BoardService;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class    BoardController {
    @Autowired //의존성 주입
    BoardService boardService;

    @GetMapping("/select/list")
    public List<Board> selectList() {
        return boardService.selectList();
    }

    @PostMapping("/insert/board")
    public Integer insertBoard(@RequestBody Board board) {
        System.out.println(board.toString());
        return boardService.insertBoard(board.getTitle(), board.getContents());
    }

    @PostMapping("/update/board")
    public Integer updateBoard(@RequestBody Board board) {
        System.out.println(board.toString());
        return boardService.updateBoard(board);
    }

    @PostMapping("/delete/board")
    public Integer deleteBoard(@RequestBody Board board) {
        return boardService.deleteBoard(board.getNo());
    }

}
