import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {changeMessage} from '../../store/actions/messageAction';
import {fetchInn} from '../../store/actions/innAction';

const useHooks = () => {
  const {uid} =
    useSelector(state => state.userReducer.userInfo) ||
    useSelector(state => state.userReducer.userCredential);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .where('users', 'array-contains', uid)
      .onSnapshot(documentSnapshot => {
        dispatch(changeMessage(documentSnapshot.docChanges()));
      });
    return () => subscriber();
  }, []);
  const {inns, count, isLoading} = useSelector(state => state.innReducer);
  const {role} = useSelector(state => state.userReducer.userInfo) || {};

  const handleFetchInn = ({
    limit = 10,
    name,
    minPrice,
    maxPrice,
    city,
    district,
    address,
    reload,
    searchText,
  }) => {
    if (isLoading) {
      return;
    }

    dispatch(
      fetchInn({
        limit,
        name,
        minPrice,
        maxPrice,
        city,
        district,
        address,
        reload,
        searchText,
      }),
    );
  };

  return {
    handlers: {
      handleFetchInn,
    },

    selectors: {
      inns,
      count,
      role,
      isLoading,
    },
  };
};

export default useHooks;
