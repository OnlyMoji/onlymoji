package com.onlymoji.onlymoji.service;


import com.onlymoji.onlymoji.domain.AuthProvider;
import com.onlymoji.onlymoji.domain.Role;
import com.onlymoji.onlymoji.domain.User;
import com.onlymoji.onlymoji.dto.user.UserAuthDtos;
import com.onlymoji.onlymoji.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void registerUser(UserAuthDtos.RegisterRequest req) {
        if (userRepository.existsByEmailAndProvider(req.email(), AuthProvider.LOCAL)) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        String hashed = encoder.encode(req.password());

        User user = User.builder()
                .provider(AuthProvider.LOCAL)
                .email(req.email())
                .password(hashed)
                .nickname(req.nickname())
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }
}
