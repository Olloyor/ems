package mr.olloyor.test.repository;

import mr.olloyor.test.entity.Role;
import mr.olloyor.test.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Integer> {

    List<Role> findAllByName(RoleName name);

    Optional<Role> findByName(RoleName name);

    List<Role> findAllByNameIn(List<RoleName> names);


}
