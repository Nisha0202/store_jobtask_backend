const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.5cua0xk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const ObjectId = require('mongodb').ObjectId;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// Function to connect to MongoDB and set up the routes
async function run() {
  try {
  

    const productsSort = client.db('productssort').collection('products');

    app.get('/products', async (req, res) => {
      const { page = 1, limit = 9, search = '', brand = '', category = '', priceRange = '', sort = '', order = 'asc' } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const sortOrder = order === 'desc' ? -1 : 1;
    
      // Build filter criteria
      const filters = {};
      if (search) {
        filters.productName = { $regex: search, $options: 'i' };
      }
      if (brand) {
        filters.brandName = brand;
      }
      if (category) {
        filters.category = category;
      }
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          filters.price = { $gte: minPrice, $lte: maxPrice };
        }
      }
    
      try {
        const totalProducts = await productsSort.countDocuments(filters);
        
        let productsQuery = productsSort.find(filters).skip(skip).limit(parseInt(limit));
        
        if (sort) {
          productsQuery = productsQuery.sort({ [sort]: sortOrder });
        }
    
        const products = await productsQuery.toArray();
    
        res.setHeader('X-Total-Count', totalProducts);
        res.send(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ message: 'Failed to fetch products', error });
      }
    });
    






  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('server running')
})

app.listen(port, () => {
  console.log(`Port:${port}`)
})
