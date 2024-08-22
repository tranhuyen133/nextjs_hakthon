'use client';
import { useEffect, useState } from 'react';
import { Product } from './api/database/products';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    productName: '',
    price: 0,
    image: '',
    quantity: 1,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    if (isEditing && editProductId !== null) {
      await fetch(`/api/products/${editProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      setIsEditing(false);
      setEditProductId(null);
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, id: products.length + 1 }),
      });
    }
    setNewProduct({ id: 0, productName: '', price: 0, image: '', quantity: 1 });
    fetchProducts();
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Danh Sách Sản Phẩm</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>STT</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tên sản phẩm</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hình ảnh</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Số lượng</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.productName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <img src={product.image} alt={product.productName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.price.toLocaleString()} VND</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.quantity}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleEditProduct(product)}>Sửa</button>
                <button style={{ padding: '4px 8px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>{isEditing ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}</h3>
        <input
          type="text"
          name="productName"
          placeholder="Tên sản phẩm"
          value={newProduct.productName}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="text"
          name="image"
          placeholder="URL hình ảnh"
          value={newProduct.image}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Số lượng"
          value={newProduct.quantity}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={handleAddProduct}
          style={{ width: '100%', padding: '10px', backgroundColor: '#186b75', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isEditing ? 'Cập nhật' : 'Thêm'}
        </button>
      </div>
    </div>
  );
}
