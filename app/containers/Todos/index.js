import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import {
  SearchProduct, ProductGallery, Notification, PapperBlock, TaskWidget
} from 'dan-components';
import { EditableCellFrmDemo } from '../Tables/demos';
import {
  fetchAction,
  addAction,
  updateAction,
  closeNotifAction
} from './reducers/todosActions';
// import data from './api/productData';

function Todos() {
  // Redux State
  const messageNotif = useSelector(state => state.todos.notifMsg);

  // Dispatcher
  const fetchData = useDispatch();
  const closeNotif = useDispatch();

  const [listView, setListView] = useState('grid');

  // useEffect(() => {
  //   fetchData(fetchAction(data));
  // }, []);

  const title = brand.name + ' - Todos';
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
      <PapperBlock whiteBg icon="ion-ios-list-box-outline" title="Todo Section" desc="In the Editable Table Cell Form mode allow You to create or edit via dedicated form(Redux Form). The design form itself inspired by Gmail with floating design and it can be expanded become popup mode">
        <TaskWidget />
      </PapperBlock>
    </div>
  );
}

export default Todos;
