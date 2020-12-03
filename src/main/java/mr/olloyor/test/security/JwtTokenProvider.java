package mr.olloyor.test.security;

import io.jsonwebtoken.*;
import mr.olloyor.test.entity.User;
import mr.olloyor.test.payload.JwtResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

//import org.springframework.security.core.GrantedAuthority;
//import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs:604800000}")
    private int jwtExpirationInMs;

    @Value("${app.jwtPrefix:Bearer}")
    private String jwtPrefix;

    private String issuer = "Mr.Olloyor";


    public JwtResponse generateToken(Authentication authentication) {

        User userPrincipal = (User) authentication.getPrincipal();

        Date issueDate = new Date();
        Date expireDate = new Date(issueDate.getTime() + jwtExpirationInMs);
//        final String authorities = authentication.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.joining(","));


        final String jwt = Jwts.builder()
                .setSubject(userPrincipal.getId().toString())
//                .claim("roles", authorities)
                .setIssuedAt(issueDate)
                .setExpiration(expireDate)
                .setIssuer(issuer)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
        return new JwtResponse(jwt, jwtPrefix);
    }

    public UUID getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        System.out.println(claims);
//        claims.get("by");
        return UUID.fromString(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).requireIssuer(issuer).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.warn("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.warn("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.warn("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.warn("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.warn("JWT claims string is empty.");
        }
        return false;
    }
}
