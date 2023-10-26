package com.RP.ControleDeJornada.infra.security;

import com.RP.ControleDeJornada.domain.entitys.user.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.auth0.jwt.exceptions.JWTVerificationException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${dragons.api.tocken.secret}")
    private String secret;

    public String tokenGeneration(User user){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("Dragons")
                    .withSubject(user.getEmail())
                    .withClaim("jobrole", user.getJobrole().toString())
                    .withExpiresAt(expire())
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException("Error to generated tocken:", exception);
        }
    }

    private Instant expire(){
        return LocalDateTime.now().plusMinutes(30l).toInstant(ZoneOffset.of("-03:00"));
    }

    public String getSubject(String tokenJWT) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("Dragons")
                    .build()
                    .verify(tokenJWT)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Invalid Token or Expired!");
        }
    }
}