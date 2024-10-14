import prisma from "../lib/prisma.js";


export const postBook = async (req, res) => {

    const {ISBN, title, author, summary, image, price} = req.body;

    try {
        const existingBook = await prisma.book.findUnique({
            where : {ISBN}
        })

        if(existingBook){
            return res.status(400).json({message: "ISBN Number already exists..!"})
        }

        const newBook = await prisma.book.create({
            data: {
                ISBN,
                title,
                author,
                summary,
                image,
                price : {
                    currency : price.currency,
                    value : price.value,
                    displayValue: price.displayValue,
                }
            }
        })

        res.status(200).json(newBook)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to post the books..!!"})
    }
}


export const getBooks = async(req, res) => {
  
    try {
        const bookData = await prisma.book.findMany();
        res.status(200).json(bookData);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to Fetch the books..!!"})
    }
}


