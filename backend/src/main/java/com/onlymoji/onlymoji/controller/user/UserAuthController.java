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
@RequestMapping("/api/user/auth")
public class UserAuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserAuthDtos.SimpleResponse> register(@RequestBody @Valid UserAuthDtos.RegisterRequest req) {
        authService.registerUser(req);
        return ResponseEntity.ok(UserAuthDtos.SimpleResponse.ok("register ok"));
    }
}
