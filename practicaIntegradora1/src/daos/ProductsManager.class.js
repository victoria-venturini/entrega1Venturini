import  productModel  from './model/product.model.js';

export default class ProductsManager {

    async addProduct ( product ) {
        const result = await productModel.create( product );
        return result;
    };

    // async getProducts (
    //     limit = 10,
    //     page = 1,
    //     sort = 'price:asc',
    //     filter = null,
    //     filterValue = null
    // ) {

    //     let whereOptions = {};

    //     if ( filter && filterValue ) {
    //         whereOptions = { [ filter ]: filterValue };
    //     }

    //     // Split the sort parameter into field and order
    //     const [ sortField, sortOrder ] = sort.split( ':' );
    //     const sortOptions = { [ sortField ]: sortOrder === 'desc' ? -1 : 1 };

    //     const result = await productModel.paginate( whereOptions, {
    //         limit: limit,
    //         page: page,
    //         sort: sortOptions
    //     } );

    //     console.log( result );

    //     return result;
    // }

    async getProducts (
        limit = 10,
        page = 1,
        sort = 'asc',
        filter = null,
        filterValue = null
    ) {

        let whereOptions = {};

        if ( filter && filterValue ) {
            whereOptions = { [ filter ]: filterValue };
        }

        // if ( filter != '' && filterValue != '' ) {
        //     whereOptions = { [ filter ]: filterValue };
        // }

        // Determine the sort order
        let sortOrder;
        if ( sort === 'desc' ) {
            sortOrder = -1;
        } else {
            sortOrder = 1; // Default to ascending if anything other than 'desc' is passed
        }

        const result = await productModel.paginate( whereOptions,
            {
                limit: limit,
                page: page,
                sort: { price: sortOrder },
            }
        );

        return result;
    };

    async getProductById ( id ) {
        const result = await productModel.findOne( { _id: id } );
        return result;
    };

    async getProductsByCategory ( category ) {
        const result = await productModel.find( category );
        return result;
    };

    async updateProduct ( id, productData ) {
        const result = await productModel.updateOne(
            { _id: id },
            { $set: productData }
        );
        return result;
    };

    async deleteProduct ( id ) {
        const result = await productModel.deleteOne( { _id: id } );
        return result;
    };

};

