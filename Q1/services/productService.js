const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const BASE_URL = "http://20.244.56.144/test/companies";
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const CATEGORIES = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

async function getProductsFromCompany(company, category, topN, minPrice, maxPrice) {
    const url = `${BASE_URL}/${company}/categories/${category}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    try {
        const response = await axios.get(url,{headers:{'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTE0MjA4LCJpYXQiOjE3MTc1MTM5MDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM0OTg5MTYxLWNiMDYtNDNmMC04OGI0LWU1MDU2ZTY1OTE3OSIsInN1YiI6ImFheXVzaDEyOTcuYmUyMUBjaGl0a2FyYXVuaXZlcnNpdHkuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQ2hpdGthcmEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiMzQ5ODkxNjEtY2IwNi00M2YwLTg4YjQtZTUwNTZlNjU5MTc5IiwiY2xpZW50U2VjcmV0IjoiempkaUlZVk1HRkhXb2t1ayIsIm93bmVyTmFtZSI6IkFheXVzaCBraG9zbGEiLCJvd25lckVtYWlsIjoiYWF5dXNoMTI5Ny5iZTIxQGNoaXRrYXJhdW5pdmVyc2l0eS5lZHUuaW4iLCJyb2xsTm8iOiIyMTExOTgxMjk3In0.gGcD_XoTaXpmsRw3xAMqmX2Lrrbkd1iznoolrovcbDI'}});
        return response.data;
    } catch (error) {
        console.error(`Error fetching products from ${company}:`, error);
        return [];
    }
}

function generateProductId() {
    return uuidv4();
}

async function getTopProducts(categoryname, n, page, minPrice, maxPrice, sortBy, order) {
    if (!CATEGORIES.includes(categoryname)) {
        throw new Error("Invalid category name");
    }

    let allProducts = [];
    for (const company of COMPANIES) {
        const products = await getProductsFromCompany(company, categoryname, 50, minPrice, maxPrice);
        for (const product of products) {
            product.company = company;
            product.product_id = generateProductId();
            allProducts.push(product);
        }
    }
    if (sortBy) {
        allProducts.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const start = (page - 1) * n;
    const end = start + n;
    return allProducts.slice(start, end);
}

async function getProductById(categoryname, productid) {
    if (!CATEGORIES.includes(categoryname)) {
        throw new Error("Invalid category name");
    }

    
    for (const company of COMPANIES) {
        const products = await getProductsFromCompany(company, categoryname, 50, 0, Infinity);
        for (const product of products) {
            product.company = company;
            product.product_id = generateProductId();
            if (product.product_id === productid) {
                return product;
            }
        }
    }

    return null;
}

module.exports = {
    getTopProducts,
    getProductById
};
