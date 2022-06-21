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
  closeNotifAction,
} from './reducers/todosActions';
import api from '../../redux/api';
// import data from './api/productData';

function Todos() {
  // Redux State
  const messageNotif = useSelector(state => state.todos.notifMsg);
  const todoData = useSelector(state => state.todos.todoData);

  // Dispatcher
  const fetchData = useDispatch();
  const closeNotif = useDispatch();

  const [listView, setListView] = useState('grid');

  const fetchTodoList = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = '/todos';
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        fetchData(fetchAction(res.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleStatus = async (id, todoIsCompleted) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `/todos/${id}`;
    try {
      const res = await api.put(url, { todoIsCompleted: !todoIsCompleted }, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        fetchTodoList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

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
      <PapperBlock whiteBg icon="ion-ios-list-box-outline" title="Todo Section" desc="Here you can add your todo and mark it completed once it is done.">
        <TaskWidget todoData={todoData} toggleStatus={(id, todoIsCompleted) => toggleStatus(id, todoIsCompleted)} />
      </PapperBlock>
    </div>
  );
}

export default Todos;
