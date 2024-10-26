import pandas as pd
from typing import List, Dict, Generator, Optional

class Recipe:
    def __init__(self, 
                 name: str, 
                 recipe_id: int, 
                 minutes: int, 
                 tags: List[str], 
                 nutrition: List[float], 
                 steps: List[str], 
                 description: str, 
                 ingredients: List[str]):
        
        self.name = name
        self.recipe_id = recipe_id
        self.minutes = minutes
        self.tags = tags
        self.nutrition = {
            "calories": nutrition[0],
            "fat": nutrition[1],
            "sugar": nutrition[2],
            "sodium": nutrition[3],
            "protein": nutrition[4],
            "saturated_fat": nutrition[5],
            "carbs": nutrition[6]
        }
        self.steps = steps
        self.description = description
        self.ingredients = ingredients

    def matches_dietary_restrictions(self, restrictions: List[str]) -> bool:
        return all(restriction in self.tags for restriction in restrictions)

    def meets_nutrition_requirements(self, nutrition_requirements: Dict[str, Dict[str, float]]) -> bool:
        """
        Check if the recipe's nutrition meets specified min and/or max requirements.

        Parameters:
        - nutrition_requirements (Dict[str, Dict[str, float]]): A dictionary where each key is a nutrient
        and its value is another dictionary with optional 'min' and/or 'max' keys.

        Returns:
        - bool: True if all nutrition requirements are met, False otherwise.
        """
        for nutrient, limits in nutrition_requirements.items():
            # Retrieve the nutrient value from self.nutrition, default to None if not found
            nutrient_value = self.nutrition.get(nutrient, None)
            
            # Ensure nutrient is found
            if nutrient_value is None:
                return False
            
            # Check minimum requirement if specified
            if 'min' in limits and nutrient_value < limits['min']:
                return False
            
            # Check maximum requirement if specified
            if 'max' in limits and nutrient_value > limits['max']:
                return False

        return True
    
    def __repr__(self):
        tags = ""
        for tag in self.tags:
            tags += f"{tag}, "
        tags = tags[:len(tags)-2]

        return (f"{self.name}: {self.recipe_id}\n{self.minutes} minutes\ntags: {tags}"
                f"\nnutrition: {self.nutrition}\ningredients: {self.ingredients}")


def load_recipes(filepath: str, 
                 restrictions: Optional[List[str]] = None, 
                 max_nutrition: Optional[Dict[str, float]] = None, 
                 chunksize: int = 10000) -> Generator[Recipe, None, None]:
    """
    Load recipes from CSV in chunks, applying optional filtering by dietary restrictions and nutrition.
    """
    for chunk in pd.read_csv(filepath, chunksize=chunksize):
        for _, row in chunk.iterrows():
            # Convert row to a Recipe instance
            recipe = Recipe(
                name=row['name'],
                recipe_id=row['id'],
                minutes=row['minutes'],
                tags=eval(row['tags']),  # Convert string representation of list to list
                nutrition=eval(row['nutrition']),  # Convert string to list
                steps=eval(row['steps']),  # Convert string to list
                description=row['description'],
                ingredients=eval(row['ingredients']),  # Convert string to list
            )
            
            # Apply filters if specified
            if (not restrictions or recipe.matches_dietary_restrictions(restrictions)) and \
               (not max_nutrition or recipe.meets_nutrition_requirements(max_nutrition)):
                yield recipe


# Example dietary restrictions and nutrition requirements
restrictions = ["vegetarian"]
nutrition_requirements = {
    "calories": {"min": 100, "max": 500},  # Minimum of 100 calories and a maximum of 500 calories
    "sugar": {"max": 15},                   # Maximum of 15 grams of sugar
    "protein": {"min": 15}                  # Minimum of 15 grams of protein
}

# Load and filter recipes
i = 0
for recipe in load_recipes("recipes.csv", restrictions=restrictions):
    # Check if the recipe meets the specified nutrition requirements
    if recipe.meets_nutrition_requirements(nutrition_requirements):
        print(f"{recipe}\n\n")
        i += 1
        if i >= 10:  # Limit to the first 10 recipes that match
            break    
