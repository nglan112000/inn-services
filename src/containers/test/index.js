import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../components';
import firestore from '@react-native-firebase/firestore';
import {clientIndex} from '../../config/algolia';

import logistics from './logistics.json';
import {showMessageSuccess} from '../../utils/utils';

export default function Test() {
  const insertData = async () => {
    const data = [{
      _id: '5dcf90572e7fd677b62bf4d4',
      user_id: '5c398df481bd203a0603a264',
      admin_id: null,
      room_name: 'Phòng cho thuê Nguyễn Văn Linh, Quận Hải Châu.Full nội thất',
      room_price: 5500000,
      room_area: 28,
      deposit: 1,
      electric_price: 3800,
      water_price: 100000,
      parking_fee: 0,
      wifi_cost: null,
      room_location: '48',
      room_location_district: 492,
      exact_room_address:
        '145 Nguyễn Văn Linh, Phường Hoà Cường, Quận Phú Nhuận, Hồ Chí Minh',
      full_address_object: {
        city: {code: '48', text: 'Thành phố Đà Nẵng'},
        district: {
          code: 492,
          text: 'Quận Hải Châu',
          cityCode: '48',
        },
        ward: {districtCode: 492, code: 27073, text: 'Phường Hoà Cường'},
        streetName: 'Nguyễn Văn Linh',
        houseNumber: '145',
      },
      phone_number: '0938938757',
      room_is_shared: false,
      number_room: '1',
      number_vacancies_available_in_room: '2',
      room_gender: 'any',
      notes:
        'Cho Thuê Phòng Đường Nguyễn Văn Trỗi. Sát Q1. Gần Sân khấu kịch Phú Nhuận, sân bay Tân Sơn Nhất. Khu vực an ninh, dân trí cao.\n- Diện tích phòng 28m2\n- Phòng Toilet riêng, bếp riêng, Tủ quần áo, Máy lạnh, Tủ Lạnh, Giường nệm, Ban công, Cửa sổ, Máy Nước Nóng lạnh. Sân nội bộ yên tĩnh và an ninh\n- Trang bị Camera an ninh 24/24. Wifi tốc độ cao. Khóa Từ Vân Tay \n- Giờ giấc tự do. Không chung chủ. Chỗ để xe rộng rãi. (Free Wifi. Máy Giặc. Chỗ để xe)\nGiá 5tr5 tháng\nLh xem phòng Call : 0938938757',
      upload_room_images: [
        'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195457.jpg',
        'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195501.jpg',
        'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947968_IMG_20191114_195557.jpg',
        'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195503.jpg',
        'https://bayleaf.s3.amazonaws.com/property-images%2F1573883947970_IMG_20191114_195459.jpg',
      ],
      created_date: 1573883991132,
      updated_date: 1573883991132,
      air_conditioner: true,
      room_bathroom: true,
      parking_situation: true,
      room_wifi: true,
      curfew_situation: true,
      share_home_as_landlord: true,
      room_refrigerator: true,
      room_washing_machine: true,
      security_guard: true,
      room_bed: true,
      room_tivi: true,
      room_pets_allowed: false,
      room_closet: true,
      room_kitchen: true,
      window: true,
      water_heater: true,
      loft: false,
      is_top_room: false,
      room_type: 'NotShared',
      opened_hour: {},
      closed_hour: {},
      pending: 'Enabled',
      disabled: false,
      room_view: 60,
      geocodingApi: {
        bounds: {
          northeast: {lat: 10.7947492, lng: 106.6767839},
          southwest: {lat: 10.7945924, lng: 106.6766273},
        },
        location: {lat: 10.794677, lng: 106.6766836},
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {lat: 10.7960197802915, lng: 106.6780545802915},
          southwest: {lat: 10.7933218197085, lng: 106.6753566197085},
        },
      },
      geoJSON: {type: 'Point', coordinates: [106.6766836, 10.794677]},
      available_status: {value: 1, label: 'Available'},
      available_status_date: '2019-11-16T05:59:51.132Z',
      processPending: [{status: 'Enabled', date: '2019-11-16T17:05:12.895Z'}],
    }];
    const collection = 'Inns';
    const algoliaIndex = clientIndex;

    const results = await Promise.all(data.map(item => firestore().collection(collection).add(item)));
    console.log(results.length);
    const algData = [];
    for (const result of results) {
      algData.push({id: result.id,...(await result.get()).data()});
    }
    console.log(algData)

    algoliaIndex.saveObjects(algData.map(item => {
      console.log('===================', item.id, '==============')
      return {
        objectID: item.id,
        ...item
      }
    }))
  }


  // const onPush = useCallback(async () => {
  //   try {
  //     const result = await firestore().collection('Inns').get();
  //     result.docs.forEach(async doc => {
  //       await firestore().collection('Inns').doc(doc.id).update({
  //         type: 1,
  //       });
  //       clientIndex.partialUpdateObject({
  //         objectID: doc.id,
  //         type: 1,
  //       });
  //     });
  //     showMessageSuccess('success');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <Button title="upload" onPress={insertData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4d4d4',
    flex: 1,
  },
  c4: {
    backgroundColor: '#C4C4C4',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  flex1: {
    // flex: 1,
    height: '50%',
  },
});
