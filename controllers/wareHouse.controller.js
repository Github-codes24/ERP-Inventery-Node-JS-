//get warehouse

const createWarehouse =  async (req, res) => {
    try {
        const {
            warehouseID,
            warehouseName,
            contactPerson1Name,
            contactPerson2Name,
            contactNumber,
            officialEmail,
            alternateNumber,
            personalEmail,
            location,
            postalAddress,
            pincode,
            type,
            storedMaterials
        } = req.body;
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Error updating vendor", error: error.message });
    }
}

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