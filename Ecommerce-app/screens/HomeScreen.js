import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: '1',
      image: require('../assets/dress1.png'),
      title: 'Office Wear',
      description: 'Office Wear For Your Office',
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
      description: 'Recycle Bounce Knit Cardigan Pink',
      price: 120
    },
    {
      id: '4',
      image: require('../assets/dress4.png'),
      title: 'Lamerei',
      description: 'Recycle Bouncle Knit Cardiagn Pink',
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
    <SafeAreaView style={styles.container}>
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

      <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>OUR STORY</Text>
          <View style={styles.filterList}>
            <View style={styles.filter}>
            <Image source={require('../assets/Listview.png')}/>
          </View>
          <View style={styles.filter}>
          <Image source={require('../assets/Filter.png')}/>
          </View>
          </View>
          
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
           <View style={styles.product}>
           <Image source={item.image} style={styles.productImage} resizeMode='contain' />
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
                <Image source={require('../assets/add_circle.png')}/>
            </TouchableOpacity>
           </View>
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </View>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  firstSquare: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondSquare: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterList: {
    flexDirection: 'row'
  },
  filter: {
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10
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
    paddingBottom: 10,
    paddingHorizontal:10,
    width: "100%",
  },
  product : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  productImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain',  
  },
  productDetails: {
    padding: 5,
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 190,
    width: 50,
    height: 50,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: 200,
    letterSpacing: 2
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  line: {
    width: 15,
    height: 2,
    backgroundColor: '#ccc',
    marginTop: 5,
  }
});

export default HomeScreen;