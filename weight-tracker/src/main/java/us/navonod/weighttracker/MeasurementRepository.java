package us.navonod.weighttracker;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MeasurementRepository extends CrudRepository<Measurement, Long> {

//    @Query("select m from measurements where m.pet_id = ?1")
//    Iterable<Measurement> findByPetId(Long pet_id);
}
