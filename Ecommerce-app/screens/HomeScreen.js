import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: '1',
      image: require('../assets/dress1.png'),
      title: 'Office Wear',
      description: 'reversible angora cardigan',
      price: 120
    },
    {
      id: '2',
      image: require('../assets/dress2.png'),
      title: 'Black',
      description: 'reversible angora cardigan',
      price: 120
    },
    {
      id: '3',
      image: require('../assets/dress3.png'),
      title: 'Church Wear',
      description: 'reversible angora cardigan',
      price: 120
    },
    {
      id: '4',
      image: require('../assets/dress4.png'),
      title: 'Lamerei',
      description: 'reversible angora cardigan',
      price: 120
    },
    {
      id: '5',
      image: require('../assets/dress5.png'),
      title: '21WN',
      description: 'reversible angora cardigan',
      price: 120
    },
    {
      id: '6',
      image: require('../assets/dress6.png'),
      title: 'Lopo',
      description: 'reversible angora cardigan',
      price: 120
    },
    {
      id: '7',
      image: require('../assets/dress7.png'),
      title: '21WN',
      description: 'reversible angora cardigan',
      price: 120
    },
    {
      id: '8',
      image: require('../assets/dress3.png'),
      title: 'lame',
      description: 'reversible angora cardigan',
      price: 120
    }
  ]);

  const addToCart = async (product) => {
    try {
      const jsonValue = await AsyncStorage.getItem('cart');
      let cart = jsonValue != null ? JSON.parse(jsonValue) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Menu.png')}/>
        <Image style={styles.logo} source={require('../assets/Logo.png')}/>
        <View style={styles.searchShop}>
        <Image source={require('../assets/Search.png')}/>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{marginLeft: 10}}>
            <Image source={require('../assets/shoppingBag.png')}/>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
           <View style={styles.product}>
           <Image source={item.image} style={styles.productImage} />
            <ImageBackground>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
                <Image source={require('../assets/add_circle.png')}/>
            </TouchableOpacity>
            </ImageBackground>
           </View>
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </View>
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  searchShop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    width: '50%',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productDetails: {
    padding: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#D39679'
  },
  addToCartButton: {
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;