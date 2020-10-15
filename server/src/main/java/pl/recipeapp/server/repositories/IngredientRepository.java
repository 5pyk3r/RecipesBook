package pl.recipeapp.server.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.recipeapp.server.model.Ingredient;

public interface IngredientRepository extends CrudRepository<Ingredient, Long> {
}
