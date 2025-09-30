package com.onlymoji.onlymoji.controller.user;

import com.onlymoji.onlymoji.dto.user.UserAuthDtos;
import com.onlymoji.onlymoji.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/user")
public class UserAuthController {

    private final AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<UserAuthDtos.ApiResponse<UserAuthDtos.UserResponse>> register(
            @RequestBody @Valid UserAuthDtos.RegisterRequest req) {

        // 서비스에서 실제 User 엔티티 저장 후 DTO로 변환
        UserAuthDtos.UserResponse userResponse = authService.registerUser(req);

        return ResponseEntity
                .status(HttpStatus.CREATED) // 201 Created
                .body(UserAuthDtos.ApiResponse.ok("register ok", userResponse));
    }

}
