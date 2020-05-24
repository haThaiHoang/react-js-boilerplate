// import { MainApi } from './endpoint'
import mockData from '@/utils/mock-api'
/* eslint-disable max-len */
export function getProducts() {
  return mockData({
    data: {
      products: [{
        id: 1,
        avatar: 'https://image.shutterstock.com/image-photo/red-apple-on-white-background-260nw-158989157.jpg',
        name: 'Apple',
        description: 'Ngon'
      }, {
        id: 2,
        avatar: 'https://suttons.s3.amazonaws.com/p/VECAR14605rt_3.jpg',
        name: 'Carrot',
        description: 'Quá Ngon'
      }, {
        id: 3,
        avatar: 'http://elmatadorrestaurant.com/wp-content/uploads/2017/12/MILK.jpg',
        name: 'Milk',
        description: 'Hơi béo'
      }, {
        id: 4,
        avatar: 'https://i.ytimg.com/vi/SX6TXkoEjMo/maxresdefault.jpg',
        name: 'Orange',
        description: 'Chua'
      }, {
        id: 5,
        avatar: 'https://www.healthline.com/hlcmsresource/images/AN_images/orange-juice-732x549-thumbnail.jpg',
        name: 'Orange juice',
        description: 'Quá Tuyệt'
      }, {
        id: 6,
        avatar: 'https://www.brandsvietnam.com/upload/news/480px/2014/cocacola-ava-ID5733_1418099201.jpg',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }, {
        id: 7,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92UhHqSnPKVLNmdziS7o95kgEp62oDRKj0hhrEhU8GByE4ybb&s',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 8,
        avatar: 'https://www.healthline.com/hlcmsresource/images/AN_images/orange-juice-732x549-thumbnail.jpg',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 9,
        avatar: 'https://www.brandsvietnam.com/upload/news/480px/2014/cocacola-ava-ID5733_1418099201.jpg',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }, {
        id: 11,
        avatar: 'https://image.shutterstock.com/image-photo/red-apple-on-white-background-260nw-158989157.jpg',
        name: 'Apple',
        description: 'Ngon'
      }, {
        id: 12,
        avatar: 'https://suttons.s3.amazonaws.com/p/VECAR14605rt_3.jpg',
        name: 'Carrot',
        description: 'Quá Ngon'
      }, {
        id: 13,
        avatar: 'http://elmatadorrestaurant.com/wp-content/uploads/2017/12/MILK.jpg',
        name: 'Milk',
        description: 'Hơi béo'
      }, {
        id: 14,
        avatar: 'https://i.ytimg.com/vi/SX6TXkoEjMo/maxresdefault.jpg',
        name: 'Orange',
        description: 'Chua'
      }, {
        id: 15,
        avatar: 'https://www.healthline.com/hlcmsresource/images/AN_images/orange-juice-732x549-thumbnail.jpg',
        name: 'Orange juice',
        description: 'Quá Tuyệt'
      }, {
        id: 16,
        avatar: 'https://www.brandsvietnam.com/upload/news/480px/2014/cocacola-ava-ID5733_1418099201.jpg',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }, {
        id: 17,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92UhHqSnPKVLNmdziS7o95kgEp62oDRKj0hhrEhU8GByE4ybb&s',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 18,
        avatar: 'https://www.healthline.com/hlcmsresource/images/AN_images/orange-juice-732x549-thumbnail.jpg',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 19,
        avatar: 'https://www.brandsvietnam.com/upload/news/480px/2014/cocacola-ava-ID5733_1418099201.jpg',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }],
      total: 100
    }
  })
}
