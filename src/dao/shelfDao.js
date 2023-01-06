module.exports.selectShelf = async (connection) =>{
    const selectShelfListQuery = `
        SELECT booklist
        FROM ShelfInfo;
    `
    const [ShelfRows] = await connection.query(selectShelfListQuery);
    return ShelfRows;
}