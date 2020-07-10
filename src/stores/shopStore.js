import { observable, action, computed } from 'mobx'
import { shop } from '../assets/images'
class ShopStore {
  @observable shopBanner: Array = [
    shop.banner.banner1,
    shop.banner.banner1,
    shop.banner.banner1
  ]
  @observable shopNav: Array = []
  @observable shopList: Array = [
    {
      id: new Date().getTime() + 1,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 2,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 3,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 4,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 5,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    }
  ]
  @observable groupList: Array = [
    {
      id: new Date().getTime() + 1,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 2,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 3,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 4,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    },
    {
      id: new Date().getTime() + 5,
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      huabei: true,
      discount: true,
      price: 1980.00,
      cover: shop.banner.banner1
    }
  ]
  @observable doctorList: Array = [
    {
      id: new Date().getTime() + 1,
      name: '张三',
      num: 123,
      hospital: '法外狂徒医院',
      title: '医师',
      avatar: '',
      projects: [
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        }
      ]
    },
    {
      id: new Date().getTime() + 2,
      name: '张三',
      num: 123,
      hospital: '法外狂徒医院',
      title: '医师',
      avatar: '',
      projects: [
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        }
      ]
    },
    {
      id: new Date().getTime() + 3,
      name: '张三',
      num: 123,
      hospital: '法外狂徒医院',
      title: '医师',
      avatar: '',
      projects: [
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        },
        {
          cover: '',
          title: '项目名称项目名称项目名称项目名称',
          price: 1990
        }
      ]
    },
    {
      id: new Date().getTime() + 4,
      name: '张三',
      num: 123,
      hospital: '法外狂徒医院',
      title: '医师',
      avatar: '',
      projects: []
    },
    {
      id: new Date().getTime() + 5,
      name: '张三',
      num: 123,
      hospital: '法外狂徒医院',
      title: '医师',
      avatar: '',
      projects: []
    }
  ]
  @observable hotSearch: Array = [
    '水光针',
    '水光针',
    '水光针',
    '水光针',
    '水光针水光针水光针'
  ]
  @observable resentSearch: Array = []
  @observable regularType: Array = [
    '水光针',
    '水光针',
    '水光针',
    '水光针',
    '水光针',
    '水光针',
    '水光针',
    '水光针',
    '水光针',
    '水光针水光针水光针'
  ]
}


export default new ShopStore()
