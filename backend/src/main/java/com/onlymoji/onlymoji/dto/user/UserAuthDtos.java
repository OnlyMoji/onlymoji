package com.onlymoji.onlymoji.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserAuthDtos {

    // 회원가입 요청 JSON을 받는 그릇
    public record RegisterRequest(
            @Email @NotBlank String email,
            @NotBlank String password,
            @NotBlank String nickname
    ) {}

    // 응답을 일정한 형태로 주기 위한 그릇
    // record는 불변 DTO를 간단히 만드는 자바 문법
    // 필드 두 개 (success, message)만 가지는 응답 전용 그릇
    public record SimpleResponse(boolean success, String message) {
        // record도 결국 클래스이기 때문에, static 메서드 다질 수 있음
        public static SimpleResponse ok(String msg) { return new SimpleResponse(true, msg); }
        public static SimpleResponse fail(String msg) { return new SimpleResponse(false, msg); }
    }

}
