export interface Product {
    id: number;
    productName: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export let products: Product[] = [
    {
      id: 1,
      productName: "Cam",
      price: 12.000,
      image: "https://up.yimg.com/ib/th?id=OIP.PKHYlstDYAp3lswvX1o0aAHaE8&pid=Api&rs=1&c=1&qlt=95&w=185&h=123",
      quantity: 10,
    },
    {
      id: 2,
      productName: "Táo",
      price: 15.000,
      image: "https://tse3.mm.bing.net/th?id=OIP.ev_NT1Muw-dO_Z8rgA2YKgHaHa&pid=Api&P=0&h=220",
      quantity: 5,
    },
    {
      id: 3,
      productName: "Nho",
      price: 20.000,
      image: "https://tse3.mm.bing.net/th?id=OIP.OsGjVh7pq1Ziaa147HJKMQHaE8&pid=Api&P=0&h=220",
      quantity: 20,
    },
  ];
  