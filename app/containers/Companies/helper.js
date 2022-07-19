import moment from 'moment';

const formatCompaniesList = (inputList) => {
  const outputList = [];
  inputList.forEach(item => {
    const listItem = { ...item };
    listItem.subsIsActive = item.subsIsActive === 1 ? 'Yes' : 'No';
    outputList.push(listItem);
  });
  return outputList;
};

export default formatCompaniesList;
