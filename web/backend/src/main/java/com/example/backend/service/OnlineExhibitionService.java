package com.example.backend.service;

import com.example.backend.model.dto.OnlineExhibitionDto;
import com.example.backend.model.entity.Good;
import com.example.backend.model.entity.OnlineExhibition;
import com.example.backend.repository.OnlineExhibitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Component
public class OnlineExhibitionService {

    private final OnlineExhibitionRepository onlineExhibitionRepository;

    public List<OnlineExhibitionDto> showAllOnlineExhibition(){
        List<OnlineExhibitionDto> result=new ArrayList<>();
        onlineExhibitionRepository.findAll().forEach((data)->{
            result.add(OnlineExhibitionDto.builder()
                            .id(data.getId())
                            .title(data.getTitle())
                            .description(data.getDescription())
                            .startDate(data.getStartDate())
                            .endDate(data.getEndDate())
                            .tag1(data.getTag1())
                            .tag2(data.getTag2())
                            .tag3(data.getTag3())
                            .poster(data.getPoster())
                            .likeCount(data.getLikeCount())
                            .author(data.getUser().getNickname())
                    .build());
        });
        return result;
    }
    public Boolean isHeartClicked(Long onlineExhibitionId, Principal user){
        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findOnlineExhibitionById(onlineExhibitionId);
        List<Good> goods=onlineExhibition.getLikes();
        for (Good good : goods) {
            if(good.getUser()==user){
                return true;
            }
        }
        return false;
    }

}
