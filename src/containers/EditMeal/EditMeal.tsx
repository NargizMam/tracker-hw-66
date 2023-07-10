import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ApiMeal} from "../../types";
import axiosApi from "../../axiosApi";
import MealForm from "../../components/MealForm/MealForm";

const EditMeal = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState<ApiMeal| null>(null);
    const [updating, setUpdating] = useState(false);
    const [creatLoading, setCreateLoading] = useState(false);
    const createMeal = async (meal: ApiMeal) => {
        try{
            setCreateLoading(true);
            await axiosApi.post('/meals.json', meal);

        }finally {
            navigate('/');
        }
    };

    const fetchOneMeal = useCallback(async () => {
        const mealResponse = await axiosApi.get<ApiMeal>('/meals/' + id + '.json');
        setMeal(mealResponse.data);
    }, [id]);

    const updateMeal = async (meal: ApiMeal) => {
        try {
            setUpdating(true);
            await axiosApi.put('/meals/' + id + '.json', meal);
            navigate('/');
        }finally {
            setUpdating(false);
        }

    };
    useEffect(() => {
        void fetchOneMeal();
    }, [fetchOneMeal, id]);
    const existingMeal = meal && {
        ...meal
    };

    return (
        <div className="row mt-2">
            <div className="col">
                {existingMeal ? (
                    <MealForm
                        onSubmit={updateMeal}
                        existingMeal={existingMeal}
                        updating={updating}
                        creating={creatLoading}

                    />
                ):
                    <MealForm
                    onSubmit={createMeal}
                    updating={updating}
                    creating={creatLoading}

                /> }
            </div>
        </div>
    )
};

export default EditMeal;