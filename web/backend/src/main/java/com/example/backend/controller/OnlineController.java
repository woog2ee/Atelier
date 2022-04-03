package com.example.backend.controller;


import com.example.backend.model.dto.OnlineExhibitionDto;
import com.example.backend.model.entity.OnlineExhibition;
import com.example.backend.model.entity.User;
import com.example.backend.repository.OnlineExhibitionRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.OnlineExhibitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class OnlineController {

    private final OnlineExhibitionService onlineExhibitionService;




    @GetMapping("/online-exhibition")
    private List<OnlineExhibitionDto> showOnlineExhibitions(){
        return onlineExhibitionService.showAllOnlineExhibition();
    }
    @GetMapping("/user/likes")
    private Boolean isHeart(@RequestParam String id, Principal principal){
        System.out.println("1");
        Long onlineId=Long.parseLong(id);
        System.out.println("2");
        return onlineExhibitionService.isHeartClicked(onlineId,principal);
    }
}
