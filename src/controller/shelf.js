

const findMyAllBooks = async (req,res => {
    try {
        const userId = req.params;
        if(!userId) {
            return  res.redirect('/')
        }  else {
            const myBooks = await findBooks(userId)
        }
        
    } catch(err) {
        console.log("Error" , err);
    }
    
})