package org.zeus.board_back.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Board {
    private int no;
    private String title;
    private String contents;
}
