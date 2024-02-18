import { Router } from 'express';
import ProductsManager from '../daos/ProductsManager.class.js';
import { productsModel } from '../daos/model/product.model.js';


const router = Router();


const productsManager = new ProductsManager();

router.get( '/products', async ( req, res ) => {

    let page = parseInt( req.query.page ) || 1;
    let sort = req.query.sort || 'asc';
    let filterField = req.query.filter;
    let filterValue = req.query.filterValue;

    try {
        // Build the query options based on the query parameters
        let queryOptions = {
            limit: 5,
            page: page,
            lean: true
        };

        // Handling sorting
        if ( sort ) {
            queryOptions.sort = { price: sort }; // Sorting by price as an example
        }

        // Handling filtering
        let filterOptions = {};
        if ( filterField && filterValue ) {
            filterOptions[ filterField ] = filterValue;
        }

        // Fetch the products with pagination, sorting, and filtering
        let result = await productsModel.paginate( filterOptions, queryOptions );

        // Build the links for pagination
        result.prevLink = result.hasPrevPage ? `http://localhost:8000/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8000/products?page=${result.nextPage}` : '';

        const categories = await categoriesManager.getCategories();

        res.render( 'products', { categories, result } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Internal server error' );
    }

} );

router.get( '/product-details/:pid', async ( req, res ) => {

    try {
        const pid = req.params.pid;

        const product = await productsManager.getProductById( pid );

        console.log( product );

        res.render( 'productDetails', { product } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Internal server error' );
    }

} );

export default router;