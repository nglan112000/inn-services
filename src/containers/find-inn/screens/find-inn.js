import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/header';
import LargeItem from '../component/large-item';
import SmallItem from '../component/small-item';
import styles from './find-inn.style';

const data = [
  {
    _id: '5dcf90572e7fd677b62bf4d4',
    user_id: '5c398df481bd203a0603a264',
    admin_id: null,
    room_name: 'Phòng cho thuê Nguyễn văn trỗi, Quận Phú Nhuận.Full nội thất',
    room_price: 5500000,
    room_area: 28,
    deposit: 1,
    electric_price: 3800,
    water_price: 100000,
    parking_fee: 0,
    wifi_cost: null,
    room_location: 'HCM',
    room_location_district: 768,
    exact_room_address:
      '145 Nguyễn văn trỗi, Phường 11, Quận Phú Nhuận, Hồ Chí Minh',
    full_address_object: {
      city: {code: 'HCM', text: 'Hồ Chí Minh'},
      district: {
        code: 768,
        text: 'Quận Phú Nhuận',
        cityCode: 'HCM',
      },
      ward: {districtCode: 768, code: 27073, text: 'Phường 11'},
      streetName: 'Nguyễn văn trỗi',
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
  },
  {
    _id: '5dcec8ff2e7fd677b62bb7e0',
    user_id: '5dcec7482e7fd677b62bb62f',
    admin_id: null,
    room_name: 'Nhà nguyên căn Đường số 8, Quận Thủ Đức',
    room_price: 10000000,
    room_area: 116,
    deposit: 2,
    electric_price: 2000,
    water_price: 12000,
    parking_fee: 0,
    wifi_cost: 180000,
    room_location: 'HCM',
    room_location_district: 762,
    exact_room_address:
      '71/15/8/10 Đường số 8, Phường Trường Thọ, Quận Thủ Đức, Hồ Chí Minh',
    full_address_object: {
      city: {code: 'HCM', text: 'Hồ Chí Minh'},
      district: {code: 762, text: 'Quận Thủ Đức', cityCode: 'HCM'},
      ward: {
        districtCode: 762,
        code: 26827,
        text: 'Phường Trường Thọ',
      },
      streetName: 'Đường số 8',
      houseNumber: '71/15/8/10',
    },
    phone_number: '0327343212',
    room_is_shared: false,
    number_room: '1',
    number_vacancies_available_in_room: '10',
    room_gender: 'male',
    notes: 'Nhà sạch thoáng mát giá phải chăng',
    upload_room_images: [
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573832847177_IMG_9124.HEIC',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573832847177_IMG_9125.HEIC',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573832847175_IMG_9775.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573832847177_IMG_9122.HEIC',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573832847177_IMG_9128.HEIC',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573832847177_IMG_9127.HEIC',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573832847177_IMG_9126.HEIC',
    ],
    created_date: 1573832959217,
    updated_date: 1573832959217,
    air_conditioner: false,
    room_bathroom: true,
    parking_situation: true,
    room_wifi: true,
    curfew_situation: true,
    share_home_as_landlord: true,
    room_refrigerator: false,
    room_washing_machine: false,
    security_guard: false,
    room_bed: true,
    room_tivi: false,
    room_pets_allowed: false,
    room_closet: true,
    room_kitchen: true,
    window: true,
    water_heater: false,
    loft: false,
    is_top_room: false,
    room_type: 'House',
    opened_hour: {},
    closed_hour: {},
    pending: 'Enabled',
    disabled: false,
    room_view: 239,
    geocodingApi: {
      location: {lat: 10.8288439, lng: 106.7609984},
      location_type: 'GEOMETRIC_CENTER',
      viewport: {
        northeast: {lat: 10.8301928802915, lng: 106.7623473802915},
        southwest: {lat: 10.8274949197085, lng: 106.7596494197085},
      },
    },
    geoJSON: {type: 'Point', coordinates: [106.7609984, 10.8288439]},
    available_status: {value: 1, label: 'Available'},
    available_status_date: '2019-11-15T15:49:19.217Z',
    processPending: [{status: 'Enabled', date: '2019-11-16T17:03:43.940Z'}],
  },
  {
    _id: '5dce6bee2e7fd677b62b8fa1',
    user_id: '5da73bce62faf0537f359f2c',
    admin_id: null,
    room_name: 'Kí túc xá mới 100%_Đặng Thùy trâm, Quận Bình Thạnh_Kế Bên ĐH',
    room_price: 1500000,
    room_area: 26,
    deposit: 1500000,
    electric_price: 0,
    water_price: 0,
    parking_fee: 0,
    wifi_cost: 0,
    room_location: 'HCM',
    room_location_district: 765,
    exact_room_address:
      '203 Đặng Thùy trâm, Phường 13, Quận Bình Thạnh, Hồ Chí Minh',
    full_address_object: {
      city: {code: 'HCM', text: 'Hồ Chí Minh'},
      district: {
        code: 765,
        text: 'Quận Bình Thạnh',
        cityCode: 'HCM',
      },
      ward: {districtCode: 765, code: 26905, text: 'Phường 13'},
      streetName: 'Đặng Thùy trâm',
      houseNumber: '203',
    },
    phone_number: '0326281507',
    room_is_shared: true,
    number_room: '10',
    number_vacancies_available_in_room: '6',
    room_gender: 'any',
    notes:
      '💥Bạn tìm đâu được phòng trọ ký túc xá giá rẻ ngay trung tâm quận BÌNH THẠNH giáp quận GÒ VẤP, TÂN BÌNH, Q1 đi đâu cũng tiện chỉ có 1,5 tr/tháng?\n\n🌞Địa chỉ: ĐẶNG THÙY TRÂM, P13, BÌNH THẠNH\n\nCơ hội cực hot duy nhất trong năm:\n👉Giảm giá 30% tháng đầu tiên (đến hết ngày 16/11/2019);\n👉Giới thiệu thêm 2 bạn nữa: giảm giá 100%.\n\n🎍Tiện ích, tiện nghi:\n- Khu vực không bao giờ ngập nước và kẹt xe \n- Ở KTX nhưng không gian rất riêng tư \n- Được trang bị đầy đủ: giường tầng, nệm, ra, máy lạnh 24/24, bàn, ghế, tủ, máy giặt, nồi cơm điện, bếp điện từ, bình siêu tốc, tủ lạnh, tủ giày dép...\n- Có bảo vệ và quản lý 24/24, có người dọn vệ sinh 2 lần/tuần, wifi tốc độ cao, có hệ thống PCCC, được đăng ký tạm trú đúng quy định...\n\n👉 Cực kỳ gần:ĐH VĂN LANG CS3, ĐH Mở, ĐH Sài Gòn, ĐH Kinh Tế, ĐH Kiến Trúc, ĐH Sư Phạm CS2, Cao đẳng GTVT\n💥Liên hệ hotline 24/24 bất kể ngày đêm trời mưa trời nắng:',
    upload_room_images: [
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808904642_IMG_20191115_160249.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808919132_IMG_20191115_160303.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808919132_IMG_20191115_160251.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808919131_IMG_20191115_160311.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808919132_IMG_20191115_160256.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808919131_IMG_20191115_160308.jpg',
    ],
    created_date: 1573809134151,
    updated_date: 1573809134151,
    air_conditioner: true,
    room_bathroom: true,
    parking_situation: true,
    room_wifi: true,
    curfew_situation: true,
    share_home_as_landlord: true,
    room_refrigerator: false,
    room_washing_machine: true,
    security_guard: false,
    room_bed: false,
    room_tivi: false,
    room_pets_allowed: true,
    room_closet: false,
    room_kitchen: true,
    window: true,
    water_heater: true,
    loft: false,
    is_top_room: false,
    room_type: 'Dormitory',
    opened_hour: {},
    closed_hour: {},
    pending: 'Enabled',
    disabled: false,
    room_view: 145,
    geocodingApi: {
      bounds: {
        northeast: {lat: 10.8318841, lng: 106.7016272},
        southwest: {lat: 10.8308692, lng: 106.6996924},
      },
      location: {lat: 10.8315533, lng: 106.7009634},
      location_type: 'GEOMETRIC_CENTER',
      viewport: {
        northeast: {lat: 10.8327256302915, lng: 106.7020087802915},
        southwest: {lat: 10.8300276697085, lng: 106.6993108197085},
      },
    },
    geoJSON: {type: 'Point', coordinates: [106.7009634, 10.8315533]},
    available_status: {value: 1, label: 'Available'},
    available_status_date: '2019-11-15T09:12:14.151Z',
    processPending: [{status: 'Enabled', date: '2019-11-16T17:11:15.643Z'}],
  },
  {
    _id: '5dce691d2e7fd677b62b8e85',
    user_id: '5da73bce62faf0537f359f2c',
    admin_id: null,
    room_name: 'Căn hộ_lộng lẫy tại, Phạm Văn bạch, Quận Tân Bình',
    room_price: 3300000,
    room_area: 30,
    deposit: 4000000,
    electric_price: 3900,
    water_price: 100000,
    parking_fee: 50000,
    wifi_cost: 50000,
    room_location: 'HCM',
    room_location_district: 766,
    exact_room_address:
      '90 Phạm Văn bạch, Phường 15, Quận Tân Bình, Hồ Chí Minh',
    full_address_object: {
      city: {code: 'HCM', text: 'Hồ Chí Minh'},
      district: {code: 766, text: 'Quận Tân Bình', cityCode: 'HCM'},
      ward: {districtCode: 766, code: 27007, text: 'Phường 15'},
      streetName: 'Phạm Văn bạch',
      houseNumber: '90',
    },
    phone_number: '0354740811',
    room_is_shared: false,
    number_room: '50',
    number_vacancies_available_in_room: '4',
    room_gender: 'any',
    notes:
      '☘⛲CĂN HỘ MỚI GIÁ SINH VIÊN NHÉ M. N👱...\n😍😍nhân viên phục vụ nhiệt tình, tận tâm😍😍\n 🎋 CUỐI TUẦN SĂN PHÒNG ĐẸP NÀO CẢ NHÀ🎋🙆‍♂️ Bạn sẽ có một giấc ngủ tự do như mình muốn\n\n      🏘 🏡😍Gía Bình Dân mới nhé🤗🏘🏡\n👌căn hộ, không chung chủ giờ giấc tự do 🤟\n👉Được thiết kế kiểu dáng mới rộng rãi, thoáng\n👉GIÁ CẢ HỢP LÝ CHO NHIỀU ĐỐI TƯỢNG\n👉ĐỊA CHỈ; phạm Văn bạch, Phường 15, Tân Bình\n💰💸💸GIÁ TỪ :3tr3_3TR9_4TR_4TR5_5TR💵💰\n👏👏👉 Full Nội Thất Luôn Nhé Cả nhà👈👈👏\n🕹🕹 Nhanh tay lựa kẻo hết mọi người ơi🖲🖲\n☎☎Liên hệ ngay:Mr; Bình để được tư vấn nhé.....',
    upload_room_images: [
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808251583_IMG_20191115_152629_edit.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808251582_IMG_20191115_153157_edit.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808251583_IMG_20191115_153634_edit.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808251583_IMG_20191115_152623_edit.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573808251583_IMG_20191115_153119_edit.jpg',
    ],
    created_date: 1573808413910,
    updated_date: 1573808413910,
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
    room_pets_allowed: true,
    room_closet: true,
    room_kitchen: true,
    window: true,
    water_heater: true,
    loft: true,
    is_top_room: false,
    room_type: 'Apartment',
    opened_hour: {},
    closed_hour: {},
    pending: 'Enabled',
    disabled: false,
    room_view: 288,
    geocodingApi: {
      location: {lat: 10.8197335, lng: 106.6382112},
      location_type: 'ROOFTOP',
      viewport: {
        northeast: {lat: 10.8210824802915, lng: 106.6395601802915},
        southwest: {lat: 10.8183845197085, lng: 106.6368622197085},
      },
    },
    geoJSON: {type: 'Point', coordinates: [106.6382112, 10.8197335]},
    available_status: {value: 1, label: 'Available'},
    available_status_date: '2019-11-15T09:00:13.911Z',
    processPending: [{status: 'Enabled', date: '2019-11-16T17:11:36.843Z'}],
  },
  {
    _id: '5dce509e2e7fd677b62b836a',
    user_id: '5dc65e1e2e7fd677b627348d',
    admin_id: null,
    room_name: 'Phòng cho thuê 26 tháng 3, Quận Bình Tân',
    room_price: 2000000,
    room_area: 30,
    deposit: 2000000,
    electric_price: 3500,
    water_price: 1000000000,
    parking_fee: 0,
    wifi_cost: null,
    room_location: 'HCM',
    room_location_district: 777,
    exact_room_address:
      '119 Đường 26 tháng 3, Phường Bình Hưng Hòa, Quận Bình Tân, Hồ Chí Minh',
    full_address_object: {
      city: {code: 'HCM', text: 'Hồ Chí Minh'},
      district: {code: 777, text: 'Quận Bình Tân', cityCode: 'HCM'},
      ward: {
        districtCode: 777,
        code: 27436,
        text: 'Phường Bình Hưng Hòa',
      },
      streetName: 'Đường 26 tháng 3',
      houseNumber: '119',
    },
    phone_number: '0393023847',
    room_is_shared: false,
    number_room: '4',
    number_vacancies_available_in_room: '3',
    room_gender: 'any',
    notes:
      'HOT HOT HOT TRONG TUẦN!\n\nGiá phòng chỉ: 2,000,000/ tháng.\n\nĐang trống 1 phòng duy nhất, phòng rộng 00m2, có kệ bếp, WC riêng, tủ lạnh,  cửa sổ thoáng mát.\n\nAnh chủ nhà cực kỳ dễ thương, sống có tâm, rất thương người, nên phòng cực kỳ rộng mà anh tính giá rất rẻ, nhằm hỗ trợ cho các bạn sinh viên, gia đình ở quê lên thành phố lập nghiệp. Có thể ở 2 người, 3 người tùy thích.\n\nCơ hội duy nhất chỉ còn 1 phòng\nY/C: Người ở văn minh, lịch sự, tài chính đóng tiền nhà đúng hẹn vì đã cho thuê rẻ.\nVị trí: gần siêu thị Nhật, trường Công Nghiệp Thực Phẩm, cách khu công nghiệp Tân Bình 500m, cập kênh 19/5\n\nĐC: 119, đường 26 tháng 3, Phường Bình Hưng Hòa, Q. Bình Tân . a Huy: 0393023847.',
    upload_room_images: [
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573801835870_FB_IMG_1569589505429.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573801885687_FB_IMG_1569589515338.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573801934962_FB_IMG_1569589493456.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573801967910_FB_IMG_1569589517493.jpg',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573801995649_FB_IMG_1569589502474.jpg',
    ],
    created_date: 1573802239155,
    updated_date: 1573802239155,
    air_conditioner: false,
    room_bathroom: true,
    parking_situation: true,
    room_wifi: true,
    curfew_situation: false,
    share_home_as_landlord: true,
    room_refrigerator: true,
    room_washing_machine: false,
    security_guard: false,
    room_bed: false,
    room_tivi: false,
    room_pets_allowed: false,
    room_closet: false,
    room_kitchen: true,
    window: false,
    water_heater: false,
    loft: false,
    is_top_room: false,
    room_type: 'NotShared',
    opened_hour: {
      fulldateTime: '2019-11-14T22:00:00.000Z',
      formattedTime: '05:00 AM',
    },
    closed_hour: {
      fulldateTime: '2019-11-15T05:00:00.000Z',
      formattedTime: '12:00 PM',
    },
    pending: 'Enabled',
    disabled: false,
    room_view: 307,
    geocodingApi: {
      location: {lat: 10.8027455, lng: 106.6093349},
      location_type: 'RANGE_INTERPOLATED',
      viewport: {
        northeast: {lat: 10.8040944802915, lng: 106.6106838802915},
        southwest: {lat: 10.8013965197085, lng: 106.6079859197085},
      },
    },
    geoJSON: {type: 'Point', coordinates: [106.6093349, 10.8027455]},
    available_status: {value: 1, label: 'Available'},
    available_status_date: '2019-11-15T07:15:42.862Z',
    processPending: [{status: 'Enabled', date: '2019-11-16T17:13:36.675Z'}],
  },
  {
    _id: '5dce44a42e7fd677b62b7e10',
    user_id: '5dc85b362e7fd677b628eb94',
    admin_id: null,
    room_name: 'Phòng cho thuê Hoàng hoa thám, Quận Tân Bình',
    room_price: 4000000,
    room_area: 30,
    deposit: 1,
    electric_price: 3500,
    water_price: 50000,
    parking_fee: null,
    wifi_cost: null,
    room_location: 'HCM',
    room_location_district: 766,
    exact_room_address:
      '15 Hoàng hoa thám, Phường 13, Quận Tân Bình, Hồ Chí Minh',
    full_address_object: {
      city: {code: 'HCM', text: 'Hồ Chí Minh'},
      district: {code: 766, text: 'Quận Tân Bình', cityCode: 'HCM'},
      ward: {districtCode: 766, code: 26974, text: 'Phường 13'},
      streetName: 'Hoàng hoa thám',
      houseNumber: '15',
    },
    phone_number: '0937717323',
    room_is_shared: false,
    number_room: '5',
    number_vacancies_available_in_room: '4',
    room_gender: 'any',
    notes: 'Ura Hệ thống phòng cho thuê cao cấp chuyên nghiệp',
    upload_room_images: [
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573799033596_IMG_5665.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573799033596_IMG_5664.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573799033596_IMG_5667.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573799033597_IMG_5668.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573799033596_IMG_5666.JPG',
    ],
    created_date: 1573799076446,
    updated_date: 1573799076446,
    air_conditioner: true,
    room_bathroom: true,
    parking_situation: true,
    room_wifi: true,
    curfew_situation: true,
    share_home_as_landlord: false,
    room_refrigerator: true,
    room_washing_machine: true,
    security_guard: true,
    room_bed: true,
    room_tivi: true,
    room_pets_allowed: true,
    room_closet: false,
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
    room_view: 181,
    geocodingApi: {
      location: {lat: 10.7978079, lng: 106.6470819},
      location_type: 'ROOFTOP',
      viewport: {
        northeast: {lat: 10.7991568802915, lng: 106.6484308802915},
        southwest: {lat: 10.7964589197085, lng: 106.6457329197085},
      },
    },
    geoJSON: {type: 'Point', coordinates: [106.6470819, 10.7978079]},
    available_status: {value: 2, label: 'Unknown'},
    available_status_date: '2019-12-31T16:34:30.484Z',
    processPending: [{status: 'Enabled', date: '2019-11-16T17:12:53.071Z'}],
    available_status_logs: [
      {
        available_status: {value: 2, label: 'Unknown'},
        available_status_date: '2019-12-31T16:34:30.484Z',
      },
    ],
  },
  {
    _id: '5dce44382e7fd677b62b7dbe',
    user_id: '5dc85b362e7fd677b628eb94',
    admin_id: null,
    room_name: 'Phòng cho thuê Núi thành, Quận Tân Bình',
    room_price: 3500000,
    room_area: 30,
    deposit: 1,
    electric_price: 3500,
    water_price: 50000,
    parking_fee: 0,
    wifi_cost: null,
    room_location: 'HCM',
    room_location_district: 766,
    exact_room_address: '10 Núi thành, Phường 13, Quận Tân Bình, Hồ Chí Minh',
    full_address_object: {
      city: {code: 'HCM', text: 'Hồ Chí Minh'},
      district: {code: 766, text: 'Quận Tân Bình', cityCode: 'HCM'},
      ward: {districtCode: 766, code: 26974, text: 'Phường 13'},
      streetName: 'Núi thành',
      houseNumber: '10',
    },
    phone_number: '0937717323',
    room_is_shared: false,
    number_room: '10',
    number_vacancies_available_in_room: '4',
    room_gender: 'any',
    notes: 'Siêu đẹp liên hệ ngay',
    upload_room_images: [
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573798904656_IMG_5674.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573798904658_IMG_5677.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573798904658_IMG_5676.JPG',
      'https://bayleaf.s3.amazonaws.com/property-images%2F1573798904658_IMG_5675.JPG',
    ],
    created_date: 1573798968785,
    updated_date: 1573798968785,
    air_conditioner: true,
    room_bathroom: false,
    parking_situation: true,
    room_wifi: true,
    curfew_situation: false,
    share_home_as_landlord: true,
    room_refrigerator: true,
    room_washing_machine: true,
    security_guard: false,
    room_bed: true,
    room_tivi: false,
    room_pets_allowed: false,
    room_closet: true,
    room_kitchen: true,
    window: true,
    water_heater: true,
    loft: false,
    is_top_room: false,
    room_type: 'NotShared',
    opened_hour: {
      fulldateTime: '2019-11-14T17:18:03.000Z',
      formattedTime: '12:18 AM',
    },
    closed_hour: {
      fulldateTime: '2019-11-14T17:00:03.000Z',
      formattedTime: '12:00 AM',
    },
    pending: 'Enabled',
    disabled: false,
    room_view: 257,
    geocodingApi: {
      location: {lat: 10.8005549, lng: 106.641979},
      location_type: 'ROOFTOP',
      viewport: {
        northeast: {lat: 10.8019038802915, lng: 106.6433279802915},
        southwest: {lat: 10.7992059197085, lng: 106.6406300197085},
      },
    },
    geoJSON: {type: 'Point', coordinates: [106.641979, 10.8005549]},
    available_status: {value: 1, label: 'Available'},
    available_status_date: '2019-11-15T06:22:48.785Z',
    processPending: [{status: 'Enabled', date: '2019-11-16T17:12:22.346Z'}],
  },
];

const FindInn = ({navigation}) => {
  const [typeOfItem, setTypeOfItem] = useState('large');
  const onChangeView = () => {
    console.log('cahnge:', typeOfItem);
    if (typeOfItem === 'small') {
      setTypeOfItem('large');
    } else {
      setTypeOfItem('small');
    }
  };

  const onViewDetail = () => {
    navigation.push('FindInnDetailFindInnDetail');
  };

  return (
    <View style={styles.container}>
      <Header onPress={() => {}} />
      <View style={styles.main}>
        <View style={styles.filterContainer}>
          <Text style={styles.filter}>1000-2000,dsfasd</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                onChangeView();
              }}
              activeOpacity={0.7}>
              <MaterialIcons
                name="filter-none"
                size={24}
                style={styles.changeView}
              />
            </TouchableOpacity>
          </View>
        </View>
        {typeOfItem === 'large' ? (
          <FlatList
            key={1}
            numColumns={1}
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => onViewDetail()}
                activeOpacity={0.9}>
                <LargeItem
                  images={item.item.upload_room_images}
                  room_name={item.item.room_name}
                  room_price={item.item.room_price}
                  electric_price={item.item.electric_price}
                  water_price={item.item.water_price}
                  exact_room_address={item.item.exact_room_address}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            key={2}
            numColumns={2}
            data={data}
            keyExtractor={(item, index) => index}
            columnWrapperStyle={styles.row}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => onViewDetail()}
                style={styles.smallItemContainer}>
                <SmallItem
                  images={item.item.upload_room_images}
                  room_name={item.item.room_name}
                  room_price={item.item.room_price}
                  electric_price={item.item.electric_price}
                  water_price={item.item.water_price}
                  exact_room_address={item.item.exact_room_address}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default FindInn;
