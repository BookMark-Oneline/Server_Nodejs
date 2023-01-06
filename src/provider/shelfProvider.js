exports.retrieveBookList = asnyc(req,res => {
    try {
    const connection = await pool.getConnection(async conn => conn);
    const shelfResult = await selectBookList(connection, userId);
    connection.release();
    return shelfResult; 
    } catch(err) {
        console.log("Error", err)
    }

})  