package us.navonod.weighttracker;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="measurements")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    @JsonIgnore
    private Pet pet;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date measurement_datetime;
    private float weight_kg;
//    private String species;
//    private String breed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public Date getMeasurement_datetime() {
        return measurement_datetime;
    }

    public void setMeasurement_datetime(Date measurement_datetime) {
        this.measurement_datetime = measurement_datetime;
    }

    public float getWeight_kg() {
        return weight_kg;
    }

    public void setWeight_kg(float weight_kg) {
        this.weight_kg = weight_kg;
    }
}
