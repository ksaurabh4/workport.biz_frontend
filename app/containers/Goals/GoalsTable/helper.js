import moment from 'moment';

const formatGoalsList = (inputList) => {
  const outputList = [];
  inputList.forEach(item => {
    const listItem = { ...item };
    listItem.goalReviewEndDate = moment(item.goalReviewEndDate).format('DD-MM-YYYY');
    listItem.goalReviewStartDate = moment(item.goalReviewStartDate).format('DD-MM-YYYY');
    listItem.goalTerm = item.goalTerm.includes('Week') ? `Week ${item.goalWeekNum}` : 'Entire Month';
    outputList.push(listItem);
  });
  return outputList;
};

export default formatGoalsList;
