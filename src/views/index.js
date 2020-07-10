import * as React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Stores } from '../stores'
import { GroupScreen, DoctorScreen, ShopSearchScreen, GroupListScreen, ShopDetailScreen, ShoppingCartScreen, HospitalScreen } from './shop'
import { CollectionScreen, CommentScreen, FansScreen, InterrogationScreen, ChoosePostScreen, ChatScreen, SelectCardScreen } from './message'
import {
  SettingScreen, PersonalInfoScreen, SafeScreen, AboutScreen, ModifyNameScreen, ModifyPwdScreen,
  RealNameScreen, ModifyPhoneScreen, FootprintScreen
} from './mine'
export const stacks = [

  /**
   *  商城
   */
  {
    name: 'group',
    component: GroupScreen,
    options: { title: '拼团专区' }
  },
  {
    name: 'doctor',
    component: DoctorScreen,
    options: { title: '医生' }
  },
  {
    name: 'shopSearch',
    component: ShopSearchScreen,
    options: { headerShown: false }
  },
  {
    name: 'groupList',
    component: GroupListScreen,
    options: { title: '拼团列表' }
  },
  {
    name: 'shopDetail',
    component: ShopDetailScreen,
    options: ({ route }) => {
      return {
        title: '项目详情',
        headerRight: () => <TouchableOpacity onPress={() => console.log('????')}><Text>分享</Text></TouchableOpacity>
      }
    }
  },
  {
    name: 'hospital',
    component: HospitalScreen,
    options: ({ route }) => {
      return {
        title: '医院详情',
        headerRight: () => <TouchableOpacity onPress={() => console.log('????')}><Text>icon</Text></TouchableOpacity>
      }
    }
  },
  {
    name: 'shoppingCart',
    component: ShoppingCartScreen,
    options: (nav) => {
      console.log(nav)
      const { route, navigation } = nav
      const { params = {} } = route
      const { onRightPress, title = '管理' } = params
      return {
        title: '购物车',
        headerRight: () =>
          <TouchableOpacity onPress={() => {
            if (title === '完成') {
              onRightPress && onRightPress()
            }
            Stores.cartStore.setMange(title === '完成')
            navigation.setParams({ title: title === '管理' ? '完成' : '管理' })
          }}
          >
            <Text> {title}</Text>
          </TouchableOpacity>
      }
    }
  },

  /**
   *  消息
   */

  {
    name: 'praiseAndCollection',
    component: CollectionScreen,
    options: { title: '赞与收藏' }
  },
  {
    name: 'comments',
    component: CommentScreen,
    options: { title: '评论与@' }
  },
  {
    name: 'fans',
    component: FansScreen,
    options: { title: '我的粉丝' }
  },

  {
    name: 'interrogation',
    component: InterrogationScreen,
    options: { title: '我的变美问诊卡' }
  },
  {
    name: 'choosePost',
    component: ChoosePostScreen,
    options: { title: '选择日记/帖子' }
  },

  {
    name: 'chat',
    component: ChatScreen,
    options: { title: '医院名称医院名称' }
  },

  {
    name: 'selectCard',
    component: SelectCardScreen,
    options: { title: '从已关注的人中选择' }
  },




  {
    name: 'setting',
    component: SettingScreen,
    options: { title: '设置' }
  },
  {
    name: 'personal',
    component: PersonalInfoScreen,
    options: (nav) => {
      const { route, navigation } = nav
      const { params = {} } = route
      const { onRightPress, title = '管理' } = params
      return {
        title: '修改个人资料',
        headerRight: () =>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginRight: 10 }}
          >
            <Text> 保存</Text>
          </TouchableOpacity>
      }
    }
  },
  {
    name: 'modifyName',
    component: ModifyNameScreen,
    options: (nav) => {
      const { route, navigation } = nav
      const { params = {} } = route
      const { onRightPress } = params
      return {
        title: '修改昵称',
        headerRight: () =>
          <TouchableOpacity
            onPress={() => { onRightPress && onRightPress() }}
            activeOpacity={0.8}
            style={{ marginRight: 10 }}
          >
            <Text> 保存</Text>
          </TouchableOpacity>
      }
    }
  },
  {
    name: 'safe',
    component: SafeScreen,
    options: { title: '账户与安全' }
  },
  {
    name: 'about',
    component: AboutScreen,
    options: { title: '关于医美' }
  },
  {
    name: 'modifyPwd',
    component: ModifyPwdScreen,
    options: { title: '修改密码' }
  },
  {
    name: 'realName',
    component: RealNameScreen,
    options: { title: '实名认证' }
  },
  {
    name: 'modifyPhone',
    component: ModifyPhoneScreen,
    options: { title: '修改手机号' }
  },
  {
    name: 'footprint',
    component: FootprintScreen,
    options: { title: '足迹' }
  }
]
