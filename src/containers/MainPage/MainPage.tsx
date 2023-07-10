import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {ApiMeal, ApiMealsList} from "../../types";
import {NavLink, useLocation} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner/Spinner";
import OneMeal from "../../components/OneMeal/OneMeal";

const MainPage = () => {
    const [mealList, setMealList] = useState<ApiMeal[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const getTotal = (array: ApiMeal[]) => {
        const total = array.reduce((acc, meal) => {
            return acc + meal.calories;
        }, 0);
        setTotalPrice(total);
    };

    const fetchMeals = useCallback(async () => {
        try{
            setLoading(true);
            let mealsResponse = await axiosApi.get<ApiMealsList>('/meals.json');
            const meals = mealsResponse.data;
            let newMeal: ApiMeal[] = [];
            if (meals) {
                newMeal = Object.keys(meals).map(id => {
                    const meal = meals[id];
                    return {
                        ...meal,
                        id
                    }
                });
            }
            setMealList(newMeal);
            getTotal(newMeal);
        }finally {
            setLoading(false);
        }
    }, []);

    const onDelete = async (id: string) => {
        try{
            setLoading(true);
            await axiosApi.delete<ApiMeal>('/meals/' + id + '.json');
            await fetchMeals().catch(console.error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.pathname === '/') {
            fetchMeals().catch(console.error);
        }
    }, [location, fetchMeals]);

    let mealsInfo = mealList.map(meal => (
        <OneMeal key={meal.id}
                  meal={meal}
                  onDelete={() => onDelete(meal.id)}
                  loading={loading}
        />
    ));
    return (
        <>
            <div className="container d-flex justify-content-between mt-3">
                <article>
                    <h4>Total Calories: <strong>{totalPrice}</strong> kcal</h4>
                </article>
                <button className="btn btn-dark btn-box-shadow e" >
                    <NavLink to="/new-meal" className=" fs-4 text-decoration-none text-white"> Add new meal</NavLink>
                </button>
            </div>

            <div className='container-sm'>
                {loading && <Spinner/>}
                {mealsInfo}
            </div>
        </>
    );
};

export default MainPage;