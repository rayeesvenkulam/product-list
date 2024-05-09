import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const baseUrl = "https://product-list-server.vercel.app";
  const [products, setProducts] = useState([]);
  const [successTrigger, setSuccessTrigger] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mrp: 0,
    srp: 0,
  });
  const [selectedFile, setSelectedFile] = useState('');
  const [searchKey, setSearchKey] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products/getProducts`, { withCredentials: true });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [successTrigger]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.length === 0)
      fetchProducts();
    setSearchKey(search);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDatas = new FormData();

    formDatas.append('name', formData.name);
    formDatas.append('mrp', formData.mrp);
    formDatas.append('srp', formData.srp);
    formDatas.append('file', selectedFile);

    try {
      const response = await axios.post(`${baseUrl}/products/add`, formDatas, { withCredentials: true });
      if (response.data.success) {
        setSuccessTrigger(prevState => !prevState);

        window.alert("Added Successfully")
        const product = {
          name: '',
          mrp: 0,
          srp: 0,
          image: ''
        }
        setFormData(product);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const searchProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/products/search`, { key: searchKey }, { withCredentials: true });
      if (response.data.success) {

        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">

        <div className="col-md-8">
          <div className="card">
            {/* <div className="card-header d-flex justify-content-between align-items-center">
              All Products
            </div> */}
            <div className="card-header d-flex justify-content-between align-items-center">
              All Products
              <div className="input-group" style={{ width: '400px' }}>
                <input type="text" name="search" value={searchKey} onChange={handleSearch} className="form-control" placeholder="Search..." />
                <button className="btn btn-outline-secondary" type="button" onClick={searchProduct}>
                  Search
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="container mt-2">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">MRP</th>
                      <th scope="col">SRP</th>
                      <th scope="col">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="5" className='text-center'>No data</td>
                      </tr>
                    ) : (
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.mrp}</td>
                          <td>{product.srp}</td>
                          <td><img src={product.image} style={{ height: '35px' }} alt="Product Image" /></td>
                        </tr>
                      ))
                    )}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              Add Product
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Product Name</label>
                  <input type="text" className="form-control" id="productName" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="mrp" className="form-label">MRP</label>
                  <input type="number" className="form-control" id="mrp" name="mrp" value={formData.mrp} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="sellingPrice" className="form-label">Selling Price</label>
                  <input type="number" className="form-control" id="sellingPrice" name="srp" value={formData.srp} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>

                  <input type="file" accept="image/*" className="form-control" id="image" name="image" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}


export default App;
