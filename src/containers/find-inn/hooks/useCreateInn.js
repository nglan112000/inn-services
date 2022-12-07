import {useCallback, useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';

import {
  createInn,
  deleteInn,
  resetCreateInnStatus,
} from '../../../store/actions/innAction';
import {
  formatString,
  getCity,
  isPhoneNumber,
  showMessageFail,
  unFormatString,
} from '../../../utils/utils';
import {selectCreateInnStatus, selectDeleteInnStatus} from '../selectors';
import {selectUserInfo} from '../../login/selectors';
import {uploadImagesToFirebase} from '../../../service/firebaseService';
import {status} from '../../../constants/constants';
import {navigationName} from '../../../constants/navigation';

export const useCreateInn = ({data = {}, navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const {status: createInnStatus} = useSelector(selectCreateInnStatus);
  const {status: deleteInnStatus} = useSelector(selectDeleteInnStatus);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [inn, setInn] = useState({
    images: data.upload_room_images?.map(item => ({uri: item})) || [],
    innName: data.room_name,
    type: 1,
    innOwner: userInfo?.displayName,
    innStatus: data.available_status || 1,
    innPrice: formatString(data.room_price, 'currency'),
    innAddress: data.exact_room_address,
    innElectricPrice: formatString(data.electric_price, 'currency'),
    innWaterPrice: formatString(data.water_price, 'currency'),
    innArea: data.room_area,
    innDeposit: formatString(data.deposit, 'currency'),
    innWifi: data.room_wifi,
    innGarage: data.parking_situation,
    innDistrict: data.full_address_object?.district.code,
    innCity: data.full_address_object?.city.code || '48',
    innContact: formatString(
      data.phone_number || userInfo?.phoneNumber,
      'phoneNumber',
    ),
    innMaxRoommate: data.max_roommate,
    innAttention: data.attention,
    innNotes: data.notes,
    roomBed: data.room_bed || false,
    roomCloset: data.room_closet || false,
    roomKetchen: data.room_ketchen || false,
    roomPetsAllowed: data.room_pets_allowed || false,
    roomTivi: data.room_tivi || false,
    roomRefrigerator: data.room_refrigerator || false,
    roomWashingMachine: data.room_washing_machine || false,
    roomAirConditioner: data.air_conditioner || false,
    coordinate: data.coordinate || null,
  });

  const [validation, setValidation] = useState({
    name: {
      required: true,
      hint: 'Tên không được trống',
      showHint: false,
      inputRef: useRef(),
      error: false,
    },
    city: {
      required: true,
      error: false,
    },
    district: {
      required: true,
      error: false,
    },
    address: {
      required: true,
      error: false,
      hint: 'Địa chỉ không được trống',
      showHint: false,
      inputRef: useRef(),
    },
    price: {
      required: true,
      error: false,
      hint: 'Giá không được trống',
      showHint: false,
      inputRef: useRef(),
    },
    phoneNumber: {
      error: false,
      hint: 'Số điện thoại không đúng',
      inputRef: useRef(),
    },
  });

  const validateField = useCallback(
    (value, field) => {
      const check =
        field !== 'phoneNumber'
          ? !!value
          : !!isPhoneNumber(unFormatString(value, 'phoneNumber'));
      if (check) {
        setValidation(preState => {
          const newValidation = {
            ...preState,
            [field]: {
              ...preState[field],
              showHint: false,
              error: false,
            },
          };
          return {...newValidation};
        });
      } else {
        setValidation(preState => {
          const newValidation = {
            ...preState,
            [field]: {
              ...preState[field],
              showHint: true,
              error: true,
            },
          };
          return {...newValidation};
        });
      }
    },
    [setValidation],
  );

  const validateData = () => {
    const errors = [];
    if (!inn.innName) {
      errors.push('name');
    }
    if (inn.innDistrict) {
      const city = getCity(inn.innCity);
      const district = city.Districts?.find(
        item => item.Id === inn.innDistrict,
      );
      if (!district) {
        errors.push('district');
      }
    } else {
      errors.push('district');
    }
    if (!inn.innAddress) {
      errors.push('address');
    }
    if (!inn.innPrice) {
      errors.push('price');
    }
    if (!isPhoneNumber(unFormatString(inn.innContact, 'phoneNumber'))) {
      errors.push('phoneNumber');
    }

    setValidation(preState => {
      const newValidation = {...preState};
      let focused = false;
      Object.keys(newValidation).forEach(item => {
        newValidation[item] = {
          ...newValidation[item],
          showHint: false,
          error: false,
        };
      });
      errors.forEach(error => {
        newValidation[error] = {
          ...newValidation[error],
          showHint: true,
          error: true,
          validate: value => validateField(value, error),
        };
        if (!focused && newValidation[error]?.inputRef?.current) {
          focused = true;
          newValidation[error]?.inputRef?.current.focus();
        }
      });
      return {...newValidation};
    });
    return !errors.length;
  };

  const handleChangeInn = useCallback(
    (value, field) => {
      setInn(preState => ({
        ...preState,
        [field]: value,
      }));
    },
    [setInn],
  );

  const onCreateInn = async () => {
    await handleCreateInn();
  };

  const onChangeName = useCallback(
    value => {
      handleChangeInn(value, 'innName');
    },
    [handleChangeInn],
  );

  const onChangeAddress = useCallback(
    value => {
      handleChangeInn(value, 'innAddress');
    },
    [handleChangeInn],
  );

  const onChangeImages = useCallback(
    value => {
      handleChangeInn(value, 'images');
    },
    [handleChangeInn],
  );

  const onChangeCity = useCallback(
    value => {
      handleChangeInn(value(), 'innCity');
    },
    [handleChangeInn],
  );

  const onChangeDistrict = useCallback(
    value => {
      handleChangeInn(value(), 'innDistrict');
    },
    [handleChangeInn],
  );

  const onChangeStatus = useCallback(
    value => {
      handleChangeInn(value(), 'innStatus');
    },
    [handleChangeInn],
  );

  const onChangePrice = useCallback(
    value => {
      handleChangeInn(formatString(value, 'currency'), 'innPrice');
    },
    [handleChangeInn],
  );

  const onChangeElectricPrice = useCallback(
    value => {
      handleChangeInn(formatString(value, 'currency'), 'innElectricPrice');
    },
    [handleChangeInn],
  );

  const onChangeWaterPrice = useCallback(
    value => {
      handleChangeInn(
        handleChangeInn(formatString(value, 'currency'), 'innWaterPrice'),
      );
    },
    [handleChangeInn],
  );

  const onChangeArea = useCallback(
    value => {
      handleChangeInn(value, 'innArea');
    },
    [handleChangeInn],
  );

  const onChangeDeposit = useCallback(
    value => {
      handleChangeInn(formatString(value, 'currency'), 'innDeposit');
    },
    [handleChangeInn],
  );

  const onChangeMaxRoommate = useCallback(
    value => {
      handleChangeInn(value, 'innMaxRoommate');
    },
    [handleChangeInn],
  );

  const onChangeOwner = useCallback(
    value => {
      handleChangeInn(value, 'innOwner');
    },
    [handleChangeInn],
  );

  const onChangeContact = useCallback(
    value => {
      handleChangeInn(formatString(value, 'phoneNumber'), 'innContact');
    },
    [handleChangeInn],
  );

  const onChangeWifi = useCallback(
    value => {
      handleChangeInn(value, 'innWifi');
    },
    [handleChangeInn],
  );

  const onChangeGarage = useCallback(
    value => {
      handleChangeInn(value, 'innGarage');
    },
    [handleChangeInn],
  );

  const onChangeRoomBed = useCallback(
    value => {
      handleChangeInn(value, 'roomBed');
    },
    [handleChangeInn],
  );

  const onChangeRoomCloset = useCallback(
    value => {
      handleChangeInn(value, 'roomCloset');
    },
    [handleChangeInn],
  );

  const onChangeRoomKetchen = useCallback(
    value => {
      handleChangeInn(value, 'roomKetchen');
    },
    [handleChangeInn],
  );

  const onChangeRoomPetsAllowed = useCallback(
    value => {
      handleChangeInn(value, 'roomPetsAllowed');
    },
    [handleChangeInn],
  );

  const onChangeRoomRefrigerator = useCallback(
    value => {
      handleChangeInn(value, 'roomRefrigerator');
    },
    [handleChangeInn],
  );

  const onChangeRoomAirConditioner = useCallback(
    value => {
      handleChangeInn(value, 'roomAirConditioner');
    },
    [handleChangeInn],
  );

  const onChangeType = useCallback(
    value => {
      handleChangeInn(value, 'type');
    },
    [handleChangeInn],
  );

  const onChangeRoomTivi = useCallback(
    value => {
      handleChangeInn(value, 'roomTivi');
    },
    [handleChangeInn],
  );

  const onChangeRoomWashingMachine = useCallback(
    value => {
      handleChangeInn(value, 'roomWashingMachine');
    },
    [handleChangeInn],
  );

  const onChangeAttention = useCallback(
    value => {
      handleChangeInn(value, 'innAttention');
    },
    [handleChangeInn],
  );

  const onChangeNotes = useCallback(
    value => {
      handleChangeInn(value, 'innNotes');
    },
    [handleChangeInn],
  );

  const onChangeCoordinate = useCallback(
    value => {
      handleChangeInn(value, 'coordinate');
    },
    [handleChangeInn],
  );

  const handleCreateInn = async () => {
    let check = false;
    try {
      if (!validateData()) {
        throw new Error('ERR_VALIDATE_DATA');
      }
      const city = getCity(inn.innCity);
      const district = city.Districts?.find(
        item => item.Id === inn.innDistrict,
      );
      const payload = {
        ...data,
        room_name: inn.innName,
        type: inn.type,
        room_owner: inn.innOwner,
        created_by: userInfo || data.created_by,
        available_status: inn.innStatus,
        room_price: unFormatString(inn.innPrice, 'currency'),
        exact_room_address: inn.innAddress,
        electric_price: unFormatString(inn.innElectricPrice, 'currency'),
        water_price: unFormatString(inn.innWaterPrice, 'currency'),
        room_area: numeral(inn.innArea).value(),
        deposit: unFormatString(inn.innDeposit, 'currency'),
        room_wifi: inn.innWifi,
        parking_situation: inn.innGarage,
        full_address_object: {
          city: {
            code: city.Id,
            text: city.Name,
          },
          district: {
            code: district.Id,
            text: district.Name,
          },
        },
        phone_number: unFormatString(inn.innContact, 'phoneNumber'),
        max_roommate: numeral(inn.innMaxRoommate).value(),
        attention: inn.innAttention,
        notes: inn.innNotes,
        room_bed: inn.roomBed,
        room_closet: inn.roomCloset,
        room_ketchen: inn.roomKetchen,
        room_pets_allowed: inn.roomPetsAllowed,
        room_tivi: inn.roomTivi,
        room_refrigerator: inn.roomRefrigerator,
        air_conditioner: inn.roomAirConditioner,
        room_washing_machine: inn.roomWashingMachine,
        upload_room_images: inn.images.map(image => image.uri),
        coordinate: inn.coordinate,
      };
      dispatch(createInn(payload));
      check = true;
    } catch (error) {
      switch (error.message) {
        case 'ERR_UPLOAD_IMAGE':
          showMessageFail('Lỗi đăng hình ảnh.');
          break;

        case 'ERR_VALIDATE_DATA':
          showMessageFail('Vui lòng điền đầy đủ thông tin.');
          break;
        default:
          console.log('need handle error at handleCreateInn', error);
          break;
      }
      check = false;
    } finally {
      return check;
    }
  };

  const onDeleteInn = useCallback(() => {
    setShowDeleteConfirmModal(true);
  }, []);

  const onCloseDeleteConfirmModal = useCallback(() => {
    setShowDeleteConfirmModal(false);
  }, []);

  const onConfirmDelete = useCallback(() => {
    try {
      setShowDeleteConfirmModal(false);
      dispatch(deleteInn(data.uid));
    } finally {
      navigation.goBack(navigationName.findInn.myInn);
    }
  }, [dispatch, data, navigation]);

  useEffect(() => {
    if (createInnStatus === status.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (createInnStatus === status.SUCCESS || createInnStatus === status.FAIL) {
      dispatch(resetCreateInnStatus());
    }
    if (createInnStatus === status.SUCCESS) {
      navigation.goBack(navigationName.findInn.findInn);
    }
  }, [createInnStatus, dispatch, navigation]);

  useEffect(() => {
    if (deleteInnStatus === status.PENDING) {
      setDeleteLoading(true);
    } else {
      setDeleteLoading(false);
    }
  }, [deleteInnStatus]);

  return {
    handlers: {
      onCreateInn,
      onChangeType,
      onDeleteInn,
      onCloseDeleteConfirmModal,
      onConfirmDelete,
      handleCreateInn,
      handleChangeInn,
      onChangeName,
      onChangeAddress,
      onChangeImages,
      onChangeCity,
      onChangeDistrict,
      onChangeStatus,
      onChangePrice,
      onChangeElectricPrice,
      onChangeWaterPrice,
      onChangeArea,
      onChangeDeposit,
      onChangeMaxRoommate,
      onChangeOwner,
      onChangeContact,
      onChangeWifi,
      onChangeGarage,
      onChangeRoomBed,
      onChangeRoomCloset,
      onChangeRoomKetchen,
      onChangeRoomPetsAllowed,
      onChangeRoomRefrigerator,
      onChangeRoomAirConditioner,
      onChangeRoomTivi,
      onChangeRoomWashingMachine,
      onChangeAttention,
      onChangeNotes,
      onChangeCoordinate,
    },
    selectors: {
      inn,
      loading,
      deleteLoading,
      validation,
      showDeleteConfirmModal,
    },
  };
};
