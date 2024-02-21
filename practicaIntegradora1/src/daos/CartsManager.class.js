import { cartModel } from './model/cart.model.js';
import ProductsManager from './ProductsManager.class.js';


export default class CartsManager {

    productsManager = new ProductsManager();

    async createCart () {

        const result = await cartModel.create( { products: [] } );
        return result;

    };

    async getCarts () {

        const result = await cartModel.find().lean();
        return result;

    };

    async getCartById ( id ) {

        const result = await cartModel.findOne( { _id: id } ).populate( 'products.product' );
        return result;

    };

    async addProductToCart ( cartId, productId ) {

        const product = await this.productsManager.getProductById( productId );

        const cart = await this.getCartById( cartId );

        cart.products.push( { product: product } );
        await cart.save();

        return;
    };

    async deleteProductFromCart ( cartId, productId ) {

        const cart = await this.getCartById( cartId );
        cart.products.pull( productId );
        await cart.save();

        return;
    };

    async deleteAllProductsFromCart ( cartId ) {
      
        const cart = await this.getCartById( cartId );
        cart.products = [];
        await cart.save();

        return;
    };

    async updateCart ( cartId, products ) {

        try {

            
            const cart = await this.getCartById( cartId );

        
            if ( !cart ) {
                throw new Error( 'Cart not found' );
            }

       
            cart.products = products;

            console.log( cart );

       
            await cart.save();

        
            return cart;

        } catch ( error ) {
            console.error( error );
            throw new Error( 'Failed to update cart' );
        }
        // try {

        //     const updatedCart = await cartsModel.findByIdAndUpdate(
        //         { _id: cartId },
        //         { $set: { products: products } }
        //     );

        //     return updatedCart;

        // } catch ( error ) {
        //     console.error( error );
        //     throw new Error( 'Failed to update cart' );
        // }
    }
};