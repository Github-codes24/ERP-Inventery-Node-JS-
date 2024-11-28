//get warehouse

const getAllWareHouses = async (req, res) => {
    try {
        return res.status(200).json({
        success: true,
        "wareHouses": [
            "Warehouse 1",
            "Warehouse 2",
            "Warehouse 3",
            "Warehouse 4",
            "Warehouse 5"
        ]
        });
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
    }

module.exports = {
    getAllWareHouses
}