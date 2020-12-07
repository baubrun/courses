import axios from "axios"
import authAPI from "../api/auth"


const createNewLesson = async (lesson, id) => {
    const token = authAPI.isAuthenticated();
    try {
        const res = await axios.post(
            `/api/courses/${id}/lesson/new`,
            lesson, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return res.data;
    } catch (error) {
        return {
            error: error.response.data.error
        };
    }
};



export default {
    createNewLesson,
}