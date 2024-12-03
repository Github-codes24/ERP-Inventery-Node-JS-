const salesByCompany = async (req, res) => {
    try{
        const data = [{ month: 'Jan', sales: 2200 }, { month: 'Feb', sales: 3000 }, { month: 'Mar', sales: 2500 }, { month: 'Apr', sales: 2800 }, { month: 'May', sales: 3500 }, { month: 'Jun', sales: 4000 }, { month: 'Jul', sales: 3200 }, { month: 'Aug', sales: 3500 }, { month: 'Sep', sales: 4000 }, { month: 'Oct', sales: 4500 }, { month: 'Nov', sales: 5000 }, { month: 'Dec', sales: 5500 }];
        return res.status(200).json(data);
    }catch(error){
        console.log("Error getting sales by company:", error);
        return res.status(500).json({ message: 'Error getting sales by company', error: error.message });
    }
}

const salesByProduct = async (req, res) => {
    try{
        const data = [{ product: 'Product 1', sales: 2200 }, { product: 'Product 2', sales: 3000 }, { product: 'Product 3', sales: 2500 }, { product: 'Product 4', sales: 2800 }, { product: 'Product 5', sales: 3500 }, { product: 'Product 6', sales: 4000 }, { product: 'Product 7', sales: 3200 }, { product: 'Product 8', sales: 3500 }];
        return res.status(200).json(data);
    }catch(error){
        console.log("Error getting sales by product:", error);
        return res.status(500).json({ message: 'Error getting sales by product', error: error.message });
    }
}

const salesByRegion = async (req, res) => {
    try{
        const data = [{ region: 'North', sales: 2200 }, { region: 'South', sales: 3000 }, { region: 'East', sales: 2500 }, { region: 'West', sales: 2800 }];
        return res.status(200).json(data);
    }catch(error){
        console.log("Error getting sales by region:", error);
        return res.status(500).json({ message: 'Error getting sales by region', error: error.message });
    }
}

const saleBySalesPerson = async (req, res) => { 
    try{
        const data = [{ salesPerson: 'Siddhant', sales: 2200 }, { salesPerson: 'Prince', sales: 3000 }, { salesPerson: 'Ankit', sales: 2500 }, { salesPerson: 'Deepanshu', sales: 2800 }];
        return res.status(200).json(data);
    }catch(error){
        console.log("Error getting sales by sales person:", error);
        return res.status(500).json({ message: 'Error getting sales by sales person', error: error.message });
    }
}

const salesByDistributor = async (req, res) => {
    try{
        const data = [{ distributor: 'Distributor 1', sales: 2200 }, { distributor: 'Distributor 2', sales: 3000 }, { distributor: 'Distributor 3', sales: 2500 }, { distributor: 'Distributor 4', sales: 2800 }];
        return res.status(200).json(data);
    }catch(error){
        console.log("Error getting sales by distributor:", error);
        return res.status(500).json({ message: 'Error getting sales by distributor', error: error.message });
    }
}

module.exports = {
    salesByCompany,
    salesByProduct,
    salesByRegion,
    saleBySalesPerson,
    salesByDistributor
}