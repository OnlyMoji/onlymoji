package com.onlymoji.onlymoji.domain;
import jakarta.persistence.*;
import lombok.*;

/* User 테이블 */

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name = "users",
        indexes = {
                @Index(name = "idx_users_email_provider", columnList = "email,provider", unique = true),
                @Index(name = "idx_users_provider_providerId", columnList = "provider,providerId")
        })
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private AuthProvider provider;    // 지금은 항상 LOCAL

    @Column(length = 128)
    private String providerId;        // 나중에 GOOGLE sub (지금은 null)

    @Column(nullable = false, length = 120)
    private String email;             // 로컬 로그인에 사용

    @Column(nullable = false)
    private String password;          // BCrypt 해시 저장 예정

    @Column(nullable = false, length = 64)
    private String nickname;          // 이모지 닉네임 가능

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Role role;                // USER / ADMIN
}
