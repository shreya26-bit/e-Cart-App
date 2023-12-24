// import React, { useEffect, useState } from 'react';
// import { imgDB, textDB } from './Firebase'; // Adjust this import based on your Firebase setup
// import { v4 } from 'uuid';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { addDoc, collection } from 'firebase/firestore';
// import Cardsdata from './CardsData';

// export const AddProducts = () => {
//   const [rname, setRName] = useState('');
//   const [address, setAddress] = useState('');
//   const [rating, setRating] = useState(0);
//   const [productPrice, setProductPrice] = useState(0);
//   const [productImg, setProductImg] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (productImg) {
//       submitForm();
//     }
//   }, [productImg]);

//   const productImgHandler = (e) => {
//     let selectedFile = e.target.files[0];
//     const imgs = ref(imgDB, `Imgs/${v4()}`);

//     uploadBytes(imgs, selectedFile)
//         .then((data) => {
//             console.log(data, "imgs");
//             getDownloadURL(data.ref)
//                 .then((val) => {
//                     console.log("Value", val);
//                     setProductImg(val);
//                 })
//                 .catch((error) => {
//                     console.error('Error getting download URL:', error);
//                     setError('Error getting download URL');
//                 });
//         })
//         .catch((error) => {
//             console.error('Error uploading image:', error);
//             setError('Error uploading image');
//         });

//     console.log("fhhjg",selectedFile);
// };

//   const submitForm = async () => {
//     try {
//       const valRef = collection(textDB, 'Products');
//       await addDoc(valRef, { rname: rname, imgdata: productImg, address: address, price: productPrice, rating: rating });
//       alert("Data added successfully");
//     } catch (error) {
//       console.error('Error adding product to database:', error);
//       setError(`Error adding product to the database: ${error.message}`);
//       alert("Error adding product to the database. Please check the console for details.");
//     }
//   };

//   const addProduct = (e) => {
//     e.preventDefault();
//     // submitForm();
//   };
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const unsubscribe = textDB.collection('Products').onSnapshot((snapshot) => {
//       const updatedProducts = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(updatedProducts);
//     });
// console.log("gtdrstr",products);
//     return () => unsubscribe();
//   }, []);


//   return (
//     <div className='container'>
//       <br />
//       <h2>ADD PRODUCTS</h2>
//       <hr />
//       <form autoComplete="off" className='form-group' onSubmit={addProduct}>
//         <label htmlFor="product-name">Restrodent Name</label>
//         <input type="text" className='form-control' required onChange={(e) => setRName(e.target.value)} value={rname} />
//         <br />
//         <label htmlFor="product-img">Product Image</label>
//         <input type="file" className='form-control' id="file" required onChange={productImgHandler} />
//         <br />
//         <label htmlFor="product-price">Product Price</label>
//         <input type="number" className='form-control' required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
//         <br />
//         <label htmlFor="product-price">Rating</label>
//         <input type="number" className='form-control' required onChange={(e) => setRating(e.target.value)} value={rating} />
//         <br />
//         <label htmlFor="product-price">Address</label>
//         <input type="text" className='form-control' required onChange={(e) => setAddress(e.target.value)} value={address} />
//         <br />
//         <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
//       </form>
//       {error && <span className='error-msg'>{error}</span>}
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import { imgDB, textDB } from './Firebase'; // Adjust this import based on your Firebase setup
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SETITEMS } from '../redux/Slice/cartSlice';
import Cardsdata from './CardsData';


export const AddProducts = () => {
  const [rname, setRName] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  const dispatch=useDispatch();

  useEffect(() => {
    const fetchData = async () => {
        // let list=[];
      try {
        const querySnapshot = await getDocs(collection(textDB, 'Products'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch(SETITEMS(data));
        console.log("Data is:",data);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
    const unsubscribe = onSnapshot(collection(textDB, 'Products'), (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(SETITEMS(updatedProducts));
      console.log("ygutfyrf", updatedProducts)
    });

    return () => unsubscribe();
  }, [dispatch]);

 

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    const imgs = ref(imgDB, `Imgs/${v4()}`);

    uploadBytes(imgs, selectedFile)
      .then((data) => {
        console.log(data, "imgs");
        getDownloadURL(data.ref)
          .then((val) => {
            console.log("Value", val);
            setProductImg(val);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            setError('Error getting download URL');
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setError('Error uploading image');
      });

    console.log("fhhjg", selectedFile);
  };

  const submitForm = async () => {
    try {
      const valRef = collection(textDB, 'Products');
      await addDoc(valRef, { rname: rname, imgdata: productImg, address: address, price: productPrice, rating: rating });
      alert("Data added successfully");
      console.log("hjsdbc",valRef);

//Fetch updated product list after adding
const querySnapshot = await getDocs(collection(textDB, 'Products'));
const updatedProducts = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
console.log("jjn",querySnapshot)
dispatch(SETITEMS(updatedProducts));
console.log("Updated Product",updatedProducts);


    } catch (error) {
      console.error('Error adding product to database:', error);
      setError(`Error adding product to the database: ${error.message}`);
      alert("Error adding product to the database. Please check the console for details.");
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    submitForm();
  };


  return (
    <div className='container'>
      <br />
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete="off" className='form-group' onSubmit={addProduct}>
        <label htmlFor="product-name">Restrodent Name</label>
        <input type="text" className='form-control' required onChange={(e) => setRName(e.target.value)} value={rname} />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <input type="file" className='form-control' id="file" required onChange={productImgHandler} />
        <br />
        <label htmlFor="product-price">Product Price</label>
        <input type="number" className='form-control' required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
        <br />
        <label htmlFor="product-price">Rating</label>
        <input type="number" className='form-control' required onChange={(e) => setRating(e.target.value)} value={rating} />
        <br />
        <label htmlFor="product-price">Address</label>
        <input type="text" className='form-control' required onChange={(e) => setAddress(e.target.value)} value={address} />
        <br />
        <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
      </form>
      {error && <span className='error-msg'>{error}</span>}

      {/* Display Products */}
      <h2>Products</h2>
      <div>
        {products.map((product) => (
       console.log("gfdxfghj",product)
        ))}
      </div>
    </div>
  );
};
