import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SettingList, Button, Avatar } from '../../../../components'
import { useTheme } from '@react-navigation/native'
import SYImagePicker from 'react-native-syan-image-picker'
import ActionSheet from 'react-native-easy-action-sheet'
import { useHeaderHeight } from '@react-navigation/stack'
import Picker from 'react-native-picker'
const { width } = Dimensions.get('window')
import { tools, navigate } from '../../../../utils'
const actionSheetRefOne = React.createRef()
const actionSheetRefTwo = React.createRef()
const LIST = [
  {
    name: '昵称',
    key: 'name',
    onPress: () => navigate('modifyName')
  },
  {
    name: '性别',
    key: 'name',
    onPress: () => actionSheetRefTwo.current?.show()
  },
  {
    name: '年龄',
    key: 'name',
    onPress: () => Picker.show()
  },
  {
    name: '地区',
    key: 'name'
  },
  {
    name: '简介',
    key: 'name'
  }
]

const data = [
  '0~15岁',
  '16~20岁',
  '21~25岁',
  '26~30岁'
]

const handleLaunchCamera = async () => {
  SYImagePicker.openCamera({ isCrop: true, showCropCircle: true, showCropFrame: false }, (err, photos) => {
    console.log(err, photos)
    if (!err) {
      console.log(photos)
    }
  })
}

const handleOpenImagePicker = () => {
  SYImagePicker.showImagePicker({
    imageCount: 1,
    isRecordSelected: true,
    isCrop: true,
    showCropCircle: true,
    quality: 90,
    compress: true,
    enableBase64: false,
    circleCropRadius: width * 0.5 - 20
  }, (err, photos) => {
    console.log('开启', err, photos)
    if (!err) {
      console.log(photos)
    } else {
      console.log(err)
    }
  })
}

function show () {
  actionSheetRef.current?.show()
}

function onSelectMethods (index) {
  if (index === 0) {
    handleOpenImagePicker()
  } else if (index === 1) {
    handleLaunchCamera()
  }
}

export default () => {
  const HeaderHeight = useHeaderHeight()
  const { colors } = useTheme()
  React.useEffect(() => {
    Picker.init({
      pickerTitleText: '',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerRowHeight: 40,
      pickerBg: [255, 255, 255, 1],
      pickerData: data,
      selectedValue: ['21~25岁'],
      onPickerConfirm: data => {
        console.log(data)
      },
      onPickerCancel: data => {
        console.log(data)
      },
      onPickerSelect: data => {
        console.log(data)
      }
    })
  }, [])
  return (
    <>
      <ScrollView>
        <TouchableOpacity activeOpacity={0.8} onPress={() => show()} style={[styles.avatar, { backgroundColor: colors.card }]}>
          <Avatar style={{ width: 46, height: 46, borderRadius: 23 }} source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }} />
          <Text>icon</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 18 }}>
          {
            LIST.map((item, index) =>
              <SettingList onPress={() => item.onPress && item.onPress()} title={item.name} isLast={index === LIST.length - 1} key={index} />
            )
          }
        </View>
        <ActionSheet
          androidHeaderHeight={HeaderHeight}
          ref={actionSheetRefOne}
          options={['传照片', '拍照', '取消']}
          cancelButtonIndex={2}
          onPress={(index) => onSelectMethods(index)}
        />
        <ActionSheet
          androidHeaderHeight={HeaderHeight}
          ref={actionSheetRefTwo}
          options={['男', '女', '取消']}
          cancelButtonIndex={2}
          onPress={(index) => onSelectMethods(index)}
        />
      </ScrollView>
    </>
  )
}

Picker.show()

const styles = StyleSheet.create({
  avatar: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
