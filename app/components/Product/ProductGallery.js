import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../CardPaper/ProductCard';
import ProductDetail from './ProductDetail';

function ProductGallery(props) {
  const [open, setOpen] = useState(false);
  const {
    dataProduct,
    handleAddToCart,
    productIndex,
    keyword,
    listView,
    showDetail
  } = props;

  const handleDetailOpen = (product) => {
    setOpen(true);
    showDetail(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {dataProduct.length > 0 && (
        <ProductDetail
          open={open}
          close={handleClose}
          detailContent={dataProduct}
          productIndex={productIndex}
          handleAddToCart={handleAddToCart}
        />
      )}
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-start"
        direction="row"
        spacing={3}
      >
        {dataProduct.length > 0 && dataProduct.map((product, index) => {
          if (product.name.toLowerCase().indexOf(keyword) === -1) {
            return false;
          }
          const itemAttr = {
            id: product.id,
            name: product.name,
            thumbnail: product.thumbnail,
            price: product.price,
            quantity: 1
          };
          return (
            <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
              <ProductCard
                list={listView === 'list'}
                name={product.name}
                thumbnail={product.thumbnail}
                desc={product.desc}
                ratting={product.ratting}
                price={product.price}
                prevPrice={product.prevPrice}
                discount={product.discount}
                soldout={product.soldout}
                detailOpen={() => handleDetailOpen(product)}
                addToCart={() => handleAddToCart(itemAttr)}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

ProductGallery.propTypes = {
  dataProduct: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired
};

export default ProductGallery;
