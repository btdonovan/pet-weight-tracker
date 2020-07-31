package us.navonod.weighttracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/pet/{pet_id}/measurements")
public class MeasurementController {

    @Autowired
    private MeasurementRepository measurementRepository;

    @Autowired
    private PetRepository petRepository;

    // Create
    @PostMapping("")
    public Measurement create(
            @RequestBody Measurement measurement,
            @PathVariable(value="pet_id") Long pet_id
    ) {
        Optional<Pet> pet = petRepository.findById(pet_id);
        measurement.setPet(pet.get());
        return measurementRepository.save(measurement);
    }

    // Read
    @GetMapping("/{measurement_id}")
    public Measurement read(@PathVariable(value="measurement_id") Long measurement_id) {
        return measurementRepository.findById(measurement_id).orElse(new Measurement());
    }

    // Update
    @PatchMapping("/{measurement_id}")
    public Measurement update(
            @PathVariable(value="measurement_id") Long measurement_id,
            @RequestBody Measurement newMeasurementInfo,
            @PathVariable(value="pet_id") Long pet_id
    ) {
//        Optional<Pet> pet = petRepository.findById(pet_id);
        Optional<Measurement> oldMeasurementInfo = measurementRepository.findById(measurement_id);
        // Measurement DateTime
        if (newMeasurementInfo.getMeasurement_datetime() != null) {
            oldMeasurementInfo.get().setMeasurement_datetime(newMeasurementInfo.getMeasurement_datetime());
        }
        // Measurement Value
        if (newMeasurementInfo.getWeight_kg() != 0) {
            oldMeasurementInfo.get().setWeight_kg(newMeasurementInfo.getWeight_kg());
        }

        // Associated Pet
        if (newMeasurementInfo.getPet() != null) {
            if (newMeasurementInfo.getPet().getId() != oldMeasurementInfo.get().getPet().getId()) {
                oldMeasurementInfo.get().setPet(newMeasurementInfo.getPet());
            }
        }
        return measurementRepository.save(oldMeasurementInfo.get());
    }
    // Delete
    @DeleteMapping("/{measurement_id}")
    public Map<String, Long> delete(@PathVariable(value="measurement_id") Long measurement_id) {
        Map<String, Long> count = new HashMap<>();
        Optional<Measurement> measurement = measurementRepository.findById(measurement_id);
        measurement.ifPresent(measurementRepository::delete);
        count.put("count", measurementRepository.count());
        return count;
    }
    // List
    @GetMapping("")
    public Iterable<Measurement> getAll(@PathVariable(value="pet_id") Long pet_id) {
        Optional<Pet> pet = petRepository.findById(pet_id);
        return pet.get().getMeasurements();
    }

}
