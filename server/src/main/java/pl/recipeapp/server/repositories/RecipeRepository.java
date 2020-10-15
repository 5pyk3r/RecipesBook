package pl.recipeapp.server.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.recipeapp.server.model.Recipe;
import pl.recipeapp.server.model.enums.MealType;


@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long> {

    Boolean existsByName(String name);

    Iterable<Recipe> findAllByMealType(MealType mealType);

}
