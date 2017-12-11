import crud from './helpers/crud';

const getAllMajors = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_MAJORS',
      fail: 'FAILED_GET_MAJORS',
      end: 'END_GET_MAJORS',
    },
    method: 'GET',
    url: '/majors'
  })
);

const getAllClasses = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_ALL_CLASSES',
      fail: 'FAILED_GET_ALL_CLASSES',
      end: 'END_GET_ALL_CLASSES',
    },
    method: 'GET',
    url: '/classes'
  })
)

const getClasses = (id, takenClasses) => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_CLASSES',
      fail: 'FAILED_GET_CLASSES',
      end: 'END_GET_CLASSES',
    },
    method: 'PUT',
    data: {
      classes: takenClasses,
    },
    url: '/major_classes?major_id=' + id
  })
)

const getOverlap = (id1, id2) => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_OVERLAP',
      fail: 'FAILED_GET_OVERLAP',
      end: 'END_GET_OVERLAP',
    },
    method: 'GET',
    url: '/overlap?ids=' + id1 + ',' + id2
  })
)

export {
  getAllMajors,
  getAllClasses,
  getClasses,
  getOverlap,
};
