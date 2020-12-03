package mr.olloyor.test.service;


import lombok.AllArgsConstructor;
import mr.olloyor.test.entity.User;
import mr.olloyor.test.entity.enums.RoleName;
import mr.olloyor.test.exception.ResourceNotFoundException;
import mr.olloyor.test.payload.ApiResponse;
import mr.olloyor.test.payload.req.ReqLogin;
import mr.olloyor.test.payload.req.ReqRegister;
import mr.olloyor.test.repository.RoleRepository;
import mr.olloyor.test.repository.UserRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;


@Service
@AllArgsConstructor
@Transactional
public class AuthService implements UserDetailsService {


    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    }

    public UserDetails loadUserById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("ID not found: " + userId));
    }


    public ApiResponse register(ReqRegister reqRegister) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(reqRegister.getEmail());
            if (optionalUser.isPresent()) {
                return new ApiResponse("User Already Registered", false);
            } else {
                User user = new User(
                        reqRegister.getEmail(),
                        passwordEncoder.encode(reqRegister.getPassword()),
                        reqRegister.getFirstName(),
                        reqRegister.getLastName(),
                        reqRegister.getSureName(),
                        roleRepository.findAllByName(RoleName.ROLE_USER));
                userRepository.save(user);
                return new ApiResponse("Successfully Registered", true);
            }
        } catch (Exception e) {
            return new ApiResponse("Something went wrong!", false);
        }

    }

    public ApiResponse login(ReqLogin reqLogin) {
        Optional<User> optionalUser = userRepository.findByEmail(reqLogin.getEmail());
        if (optionalUser.isPresent() && passwordEncoder.matches(reqLogin.getPassword(), optionalUser.get().getPassword())) {
            return new ApiResponse("Success", true);
        }
        return new ApiResponse("Username or Password incorrect", false);
    }

}
