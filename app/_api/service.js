import axios from "axios";
import toast from "react-hot-toast";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BaseUrl,
});

//Register user
export async function registerUser(userData) {
  try {
    const { data } = await axiosInstance.post("/register", userData);
    console.log(data);
    if (data.success) {
      toast.success(data.message || "Registered successfully!");
    } else {
      toast.error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || "Registration failed.");
  }
}

//login

export async function loginUser(userData) {
  try {
    const { data } = await axiosInstance.post("/login", userData);
    console.log(data);
    if (data.success) {
      toast.success(data.message || "Login successfully!");
    } else {
      toast.error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || "login failed.");
  }
}

export async function getTodo(id) {
  try {
    const { data } = await axiosInstance.get(`/todo/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addTodo(userData) {
  try {
    const { data } = await axiosInstance.post("/todo", userData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
