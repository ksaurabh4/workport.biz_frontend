import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import {
  SearchProduct, ProductGallery, Notification, PapperBlock, TaskWidget, ComposeTodo
} from 'dan-components';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { EditableCellFrmDemo } from '../Tables/demos';
import {
  fetchAction,
  addAction,
  updateAction,
  closeNotifAction,
  composeAction,
  discardAction,
  showErrorNotifAction,
} from './reducers/todosActions';
import api from '../../redux/api';

function Todos() {
  // Redux State
  const messageNotif = useSelector(state => state.todos.notifMsg);
  const openFrm = useSelector(state => state.todos.openFrm);
  const todoData = useSelector(state => state.todos.todoData);

  // Dispatcher
  const fetchData = useDispatch();
  const closeNotif = useDispatch();
  const showNotif = useDispatch();
  const compose = useDispatch();
  const discard = useDispatch();
  const addTodo = useDispatch();

  const [field, setField] = useState({
    date: '',
    content: ''
  });

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

  const handleCompose = () => {
    compose(composeAction);
    setField({
      date: '',
      content: '',
    });
  };

  const handleChange = (event, name) => {
    const { value } = event.target;
    setField(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (datePayload, content) => {
    const payloadData = { todoDueDateTime: datePayload, todoContent: content.trim() };
    console.log();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await api.post('/todos/create', { ...payloadData }, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res.data) {
        addTodo(addAction(datePayload, content));
        fetchTodoList();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes('todoDueDateTime')) {
        showNotif(showErrorNotifAction('Task due time can not be before current time!'));
      } else {
        showNotif(showErrorNotifAction(error.response.data.message));
      }
    }
  };
  const title = brand.name + ' - Tasks';
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
      <>
        <TaskWidget todoData={todoData} toggleStatus={(id, todoIsCompleted) => toggleStatus(id, todoIsCompleted)} />
        <ComposeTodo
          date={field.date}
          content={field.content}
          compose={handleCompose}
          addTodo={(datePayload, content) => handleSubmit(datePayload, content)}
          inputChange={(e, name) => handleChange(e, name)}
          open={openFrm}
          closeForm={() => discard(discardAction)}
        />
      </>
    </div>
  );
}

export default Todos;
