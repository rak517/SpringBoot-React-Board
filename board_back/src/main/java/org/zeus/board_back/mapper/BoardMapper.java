package org.zeus.board_back.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.zeus.board_back.entity.Board;

import java.util.List;

@Repository
@Mapper
public interface BoardMapper {
    List<Board> selectList();

    Integer insertBoard(String title, String contents);

    Integer updateBoard(Board board);

    Integer deleteBoard(int no);
}
