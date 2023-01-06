const { retrieveBookList } = require('../provider/shelfProvider')

module.exports.findMyAllBooks = async(req,res)=> {
    try {
        const user_id = req.params;
        if(!user_id) {
            res.send("This is not proper id")
            res.redirect('/')
        }  else {
            const myBooks = await retrieveBookList(user_id)
            console.log(myBooks)
            
        }
        
    } catch(err) {
        console.log("Error" , err);
    }
    
};