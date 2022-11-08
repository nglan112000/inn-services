import React, {useState, useEffect, useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {
  BasePicker,
  Button,
  CityPicker,
  DistrictPicker,
} from '../../../components';
import {getCity} from '../../../utils/utils';
import {translate} from '../../../constants/translate';
import {fadeDownIn, fadeDownOut} from '../../../assets/animation';
import styles from './filter.style';
import {gender as genders, jobs} from '../../../constants/constants';

const Filter = ({styleContainer, callBack, isShow}) => {
  const animationRef = useRef(null);
  const [isActive, setIsActive] = useState(isShow);
  const [city, setCity] = useState('79');
  const [district, setDistrict] = useState();
  const [gender, setGender] = useState();
  const [job, setJob] = useState();

  useEffect(() => {
    if (!city) {
      return;
    }

    setDistrict(null);
  }, [city]);

  const onSetDistrict = useCallback(
    value => {
      setDistrict(value());
    },
    [setDistrict],
  );

  const onSetCity = useCallback(
    value => {
      setCity(value());
    },
    [setCity],
  );

  const onChangeGender = useCallback(value => setGender(value), [setGender]);

  const onChangeJob = useCallback(value => setJob(value), [setJob]);

  const onApplyPress = useCallback(() => {
    const selectCity = getCity(city);
    const selectDistrict = selectCity?.Districts.find(
      item => item.Id === district,
    );

    callBack({
      district: selectDistrict,
      city: selectCity,
      gender,
      job,
    });
  }, [callBack, city, district, gender, job]);

  useEffect(() => {
    if (isShow && !isActive) {
      setIsActive(isShow);
      return;
    }
    if (animationRef) {
      animationRef.current?.animate(fadeDownOut);
      setTimeout(() => {
        setIsActive(isShow);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  if (!isActive) {
    return null;
  }

  return (
    <Animatable.View
      ref={animationRef}
      animation={fadeDownIn}
      duration={350}
      style={StyleSheet.flatten([styles.container, styleContainer])}>
      <CityPicker
        value={city}
        setValue={onSetCity}
        containerStyle={[styles.picker, styles.marginBottom]}
      />
      <DistrictPicker
        value={district}
        setValue={onSetDistrict}
        containerStyle={[styles.picker, styles.marginBottom]}
        cityId={city}
      />
      <BasePicker
        containerStyle={styles.picker}
        title="Giới tính"
        value={gender}
        setValue={onChangeGender}
        items={genders}
      />
      <BasePicker
        title="Nghề nghiệp"
        value={job}
        setValue={onChangeJob}
        items={jobs}
        containerStyle={styles.picker}
      />
      <Button
        title={translate.apply}
        containerStyle={styles.buttonApply}
        onPress={onApplyPress}
      />
    </Animatable.View>
  );
};

export default Filter;
