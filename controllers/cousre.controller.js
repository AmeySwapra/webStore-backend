import prisma from "../lib/prisma.js";

export const getCourse = async(req, res) =>{
    try {
       const fetchCourses = await prisma.course.findMany();
       res.status(200).json(fetchCourses) 
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Failed to fetch the courses..!!"})
    }
}