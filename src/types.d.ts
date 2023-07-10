export interface Meal {
    mealTime: string;
    description: string;
    calories: number;
}
export interface ApiMeal extends Meal{
    id: string;
}
export interface ApiMealsList {
    [id: string]: Meal;
}



