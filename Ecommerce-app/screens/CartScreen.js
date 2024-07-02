import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cart');
      setCartItems(jsonValue!= null? JSON.parse(jsonValue) : []);
      calculateTotalPrice();
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = JSON.parse(cart).filter(item => item.id!== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(cart);
      calculateTotalPrice();
    } catch (e) {
      console.error(e);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCartItems();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);
  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      title: 'Checkout',
      headerStyle: {
        backgroundColor: '#fff',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CHECKOUT</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.removeButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.bottomTab}>
        <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
        <Button style={styles.checkoutButton} title="Checkout" onPress={() => console.log('Checkout Competed')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
  },
  removeButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
  },
});

export default CartScreen;