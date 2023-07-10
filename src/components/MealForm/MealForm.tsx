import {useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {ApiMeal} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner/ButtonSpinner";
import {MEAL_TYPE} from "../../constant";
import axiosApi from "../../axiosApi";
interface Props {
    onSubmit: (meal: ApiMeal) => void;
    meal?: ApiMeal;
    updating: boolean;
    creating: boolean;
}
const initialState: ApiMeal = {
    id:'',
    mealTime: '',
    calories: 0,
    description: ''
}
const MealForm:React.FC<Props> = ({onSubmit, updating}) => {

    const {id} = useParams();
    const [newMeal, setNewMeal] = useState<ApiMeal>(initialState);

    const fetchOneMeal = useCallback(async () => {
        const mealResponse = await axiosApi.get<ApiMeal>('/meals/' + id + '.json');
        setNewMeal(mealResponse.data);
    }, [id]);

    useEffect(() => {
        void fetchOneMeal();
    }, [fetchOneMeal, id]);
    const onMealsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        const data = name === "calorie"? parseInt(value) : value;
        setNewMeal(prev => ({...prev,
            [name]: data,
        }));
    };
    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newMeal);
    };

    let pageTitle = 'Add new meal!'

    if(id){
        pageTitle = 'Edit this meal!'
    }
    const selectOption = MEAL_TYPE.map(type => (
        <option
            key = {Math.random()}
            value={type}
        >{type.toUpperCase()}</option>
    ));

    return (
        <div className='col-6 m-5'>
            <h4>{pageTitle}</h4>
            <form onSubmit={onFormSubmit} >
                <div className="form-group">
                    <label className='Label '>
                        Meal Type  <br/>
                        <select className='Label px-5 py-2'
                                name="mealTime"
                                value={newMeal.mealTime}
                                onChange={onMealsChange}
                        >
                            <option disabled value="">Выберите категорию</option>
                            {selectOption}
                        </select>
                    </label><br/>
                </div>
                <div className="form-group">
                    <label htmlFor="food">Text</label>
                    <textarea
                        id="food" name="description"
                        className="form-control"
                        value={newMeal.description}
                        onChange={onMealsChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calorie">Food</label>
                    <input
                        id="calorie" name="calories" type="number"
                        className="form-control"
                        value={newMeal.calories}
                        onChange={onMealsChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2"
                        disabled={updating || newMeal.calories === 0 || newMeal.mealTime === '' || newMeal.description === ''}
                >
                    {updating && <ButtonSpinner/>}
                    {id ? 'Edit' : 'Create'}
                </button>
            </form>

        </div>
    );
};

export default MealForm;