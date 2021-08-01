import axios from "axios"
import authAPI from "../api/auth"
import {
    domain
} from "../api/utils"


export const createCourse = async (data) => {
    const token = authAPI.isAuthenticated();
    try {
        const res = await axios.post(
            `${domain}/api/courses/by/${data.userId}`,
            data.course, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
        return res.data;
    } catch (error) {
        return {
            error: error.response.data.error
        };
    }
}





const createNewLesson = async (lesson, courseId) => {
    const token = authAPI.isAuthenticated();
        const res = await axios.put(
            `/api/courses/${courseId}/lesson/new`,
            lesson, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return res.data;
};


export const readCourse = async (courseId) => {
    const token = authAPI.isAuthenticated();
    try {
        let res = await axios.get(
            `${domain}/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return res.data
    } catch (error) {
        return {
            error: error.response.data.error
        };
    }
}


const removeCourse = async (courseId) => {
    const token = authAPI.isAuthenticated();
    try {
        const res = await axios.delete(
            `/api/courses/${courseId}`, {
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
    createCourse,
    createNewLesson,
    readCourse,
    removeCourse,
}