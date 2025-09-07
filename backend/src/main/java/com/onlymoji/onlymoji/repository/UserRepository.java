package com.onlymoji.onlymoji.repository;

import com.onlymoji.onlymoji.domain.AuthProvider;
import com.onlymoji.onlymoji.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/* User 데이터 입출력 */
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmailAndProvider(String email, AuthProvider provider);
    Optional<User> findByEmailAndProvider(String email, AuthProvider provider);
}
