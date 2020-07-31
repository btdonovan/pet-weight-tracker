package us.navonod.weighttracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    // Create
    @PostMapping("")
    public Pet create(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }
    // Read
    @GetMapping("/{id}")
    public Pet read(@PathVariable(value="id") Long id) {
        return petRepository.findById(id).orElse(new Pet());
    }
    // Update
    @PatchMapping("/{id}")
    public Pet update(
            @PathVariable(value="id") Long id,
            @RequestBody Pet newPetInfo
    ) {
        Optional<Pet> oldPetInfo = petRepository.findById(id);
        if (newPetInfo.getPetName() != null) {
            oldPetInfo.get().setPetName(newPetInfo.getPetName());
        }
        if (newPetInfo.getBirthday() != null) {
            oldPetInfo.get().setBirthday(newPetInfo.getBirthday());
        }
        return petRepository.save(oldPetInfo.get());
    }
    // Delete
    @DeleteMapping("/{id}")
    public Map<String, Long> delete(@PathVariable(value="id") Long id) {
        Map<String, Long> count = new HashMap<>();
        Optional<Pet> pet = petRepository.findById(id);
        pet.ifPresent(petRepository::delete);
        count.put("count", petRepository.count());
        return count;
    }
    // List
    @GetMapping("")
    public Iterable<Pet> getAll() {
        return petRepository.findAll();
    }
}
