import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import {
  SearchProduct, ProductGallery, Notification, PapperBlock
} from 'dan-components';
import EmployeeTable from './EmployeeTable';
import {
  fetchAction,
  addAction,
  updateAction,
  searchAction,
  closeNotifAction
} from './reducers/employeesActions';
// import data from './api/productData';

function Employees({ classes }) {
  // Redux State
  // const keyword = useSelector(state => state.ecommerce.keywordValue);
  // const dataProduct = useSelector(state => state.ecommerce.productList);
  // const dataCart = useSelector(state => state.ecommerce.cart);
  // const productIndex = useSelector(state => state.ecommerce.productIndex);
  // const totalItems = useSelector(state => state.ecommerce.totalItems);
  // const totalPrice = useSelector(state => state.ecommerce.totalPrice);
  const messageNotif = useSelector(state => state.employees.notifMsg);

  // Dispatcher
  const fetchData = useDispatch();
  // const search = useDispatch();
  // const handleAddToCart = useDispatch();
  // const removeItem = useDispatch();
  // const showDetail = useDispatch();
  // const checkout = useDispatch();
  const closeNotif = useDispatch();

  const [listView, setListView] = useState('grid');

  // useEffect(() => {
  //   fetchData(fetchAction(data));
  // }, []);

  // const handleSwitchView = (event, value) => {
  //   setListView(value);
  // };

  const title = brand.name + ' - Employees';
  const description = brand.desc;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification close={() => closeNotif(closeNotifAction)} message={messageNotif} />
      <PapperBlock whiteBg icon="ion-ios-list-box-outline" title="Employees Goals & Performance Management System" desc="In the Editable Table Cell Form mode allow You to create or edit via dedicated form(Redux Form). The design form itself inspired by Gmail with floating design and it can be expanded become popup mode">
        <EmployeeTable />
      </PapperBlock>
    </div>
  );
}

export default Employees;
