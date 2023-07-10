import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ApiMeal} from "../../types";
import axiosApi from "../../axiosApi";
import MealForm from "../../components/MealForm/MealForm";

const EditMeal = () => {
    const {id} = useParams();
    const navigate = useNavigate();
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

    const updateMeal = async (meal: ApiMeal) => {
        try {
            setUpdating(true);
            await axiosApi.put('/meals/' + id + '.json', meal);
            navigate('/');
        }finally {
            setUpdating(false);
        }

    };

    return (
        <div className="row mt-2">
            <div className="col">
                 <MealForm
                    onSubmit={id ? updateMeal: createMeal}
                    updating={updating}
                    creating={creatLoading}
                 />
            </div>
        </div>
    )
};

export default EditMeal;