package mr.olloyor.test.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import mr.olloyor.test.entity.tmp.AbsEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(
        value = {"password", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"},
        allowGetters = true,allowSetters = true)
@Entity(name = "users")
//@Where(clause = "enabled=true")
public class User extends AbsEntity implements UserDetails {

    @Column(unique = true)
    private String phoneNumber;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 80)
    private String firstName;

    @Column(nullable = false, length = 80)
    private String lastName;

    @Column(length = 80)
    private String sureName;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Resume resume;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private List<Role> roles;

    @JsonIgnore
    private boolean accountNonExpired = true;
    @JsonIgnore
    private boolean accountNonLocked = true;
    @JsonIgnore
    private boolean credentialsNonExpired = true;
    @JsonIgnore
    private boolean enabled = true;


    public User(String email, String password, String firstName, String lastName, String sureName, List<Role> roles) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sureName = sureName;
        this.roles = roles;
    }

//    public User(String phoneNumber, String password, String firstName, String lastName, UserType userType, List<Role> roles) {
//        this.phoneNumber = phoneNumber;
//        this.password = password;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.userType = userType;
//        this.roles = roles;
//    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
