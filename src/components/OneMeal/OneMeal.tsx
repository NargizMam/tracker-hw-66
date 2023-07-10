import {ApiMeal} from "../../types";
import {NavLink} from "react-router-dom";
import ButtonSpinner from "../Spinner/ButtonSpinner/ButtonSpinner";

interface Props {
    meal: ApiMeal;
    onDelete: React.MouseEventHandler;
    loading: boolean;
}

const OneMeal: React.FC<Props> = ({meal, onDelete, loading}) => {

    return (
        <div className="card col-7 m-2">
            <div className="card-header">
                {meal.mealTime}
            </div>
            <div className="card-body ">
                <article className="d-flex justify-content-between">
                    <h5 className="card-title">{meal.description}</h5>
                    <p className="card-text">{meal.calories}</p>
                </article>

                <NavLink to={`/edit-meal/${meal.id}`} className="btn btn-warning">EDIT</NavLink>
                <button className="btn btn-warning mx-2"
                        onClick={onDelete}
                        disabled={loading}>{loading ? <ButtonSpinner/> : 'DELETE'}</button>
            </div>
        </div>
    );
};

export default OneMeal;