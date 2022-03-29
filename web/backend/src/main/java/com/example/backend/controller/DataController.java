package com.example.backend.controller;


import com.example.backend.config.JWTUtil;
import com.example.backend.model.dto.LoginFailDto;
import com.example.backend.model.dto.RegisterDto;
import com.example.backend.model.entity.OnlineExhibition;
import com.example.backend.model.entity.User;
import com.example.backend.repository.OnlineExhibitionRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.EmailConfirmationTokenService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/data")
public class DataController {
    private final UserRepository userRepository;
    private final OnlineExhibitionRepository onlineExhibitionRepository;

    private String posterURL="https://atelierbucket.s3.ap-northeast-2.amazonaws.com/profile/8273cd44-ecb9-4147-a58b-c0ffb3c16fddui1_a_1.png";


    @PostMapping("/make-dummy-online-exhibition")
    private String makeDummyOnlineExhibition(){

        for (int i=1;i<=50;i++){

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime start=now.minusDays(i);
            LocalDateTime end=start.plusDays(3);
            User user=userRepository.findUserById(1L);
            OnlineExhibition onlineExhibition=OnlineExhibition.builder()
                    .title("Title "+i)
                    .description("Description Test "+i)
                    .startDate(start)
                    .endDate(end)
                    .tag1("tag1")
                    .tag2("tag2")
                    .tag3("tag3")
                    .theme("theme1")
                    .poster(posterURL)
                    .likeCount(i)
                    .user(user)
                    .build();
            onlineExhibitionRepository.save(onlineExhibition);
        }
        for (int i=1;i<=50;i++){

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime start=now.minusDays(i);
            LocalDateTime end=start.plusDays(3);
            User user=userRepository.findUserById(2L);
            OnlineExhibition onlineExhibition=OnlineExhibition.builder()
                    .title("Title "+i)
                    .description("Description Test "+i)
                    .startDate(start)
                    .endDate(end)
                    .tag1("tag1")
                    .tag2("tag2")
                    .tag3("tag3")
                    .theme("theme1")
                    .poster(posterURL)
                    .likeCount(i)
                    .user(user)
                    .build();
            onlineExhibitionRepository.save(onlineExhibition);
        }
        return "success";
    }
}
