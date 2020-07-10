import * as React from 'react'
import { View, StyleSheet, Dimensions, StatusBar, Text, TextInput, ScrollView } from 'react-native'
import { Button } from '../../../components'
import ListItem from './ListItem'

const Part = [
  '眼睛', '鼻子', '面部', '脸型', '嘴唇', '牙齿', '胸部', '体型', '皮肤', '其他'
]

const History = ['没做过', '做过微整', '做过整形手术111222', '其他']

const Reason = ['改善容貌', '抗衰老', '产后修复', '失败修复', '疾病治疗', '外伤修复']

const Methods = ['注射', '光电', '手术', '埋线', '微创', '无创']

const Patience = ['不敏感', '敏感', '非常敏感']

const Styles = ['自然', '混血', '欧美', '甜美', '性感', '高冷', '高贵', '帅气']

const Cycle = ['即刻', '3天以内', '7天以内', '半个月', '1个月', '3个月']

const Special = ['疤痕体质', '稀有血型', '心脏病', '高血压', '易敏感', '有传染病', '性病/艾滋病']

const Budget = ['1万以内', '3万以内', '5万以内', '10万以内', '15万以内', '无上限']

const Numbers = ['1~2次', '3~5次', '5次以上', '定期消费']

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 14, backgroundColor: '#fff' }}>
          <ListItem
            data={Part}
            title='希望改善的部位'
          />
          <View style={{ backgroundColor: '#f3f3f3', marginTop: 14, borderRadius: 6, padding: 4 }}>
            <TextInput
              editable={false}
              maxLength={200}
              placeholder='个性化诉求说明'
              style={{ height: 80 }}
              multiline
            />
            <Text style={{ color: '#aaa', alignSelf: 'flex-end', fontSize: 13, marginTop: 10, marginRight: 6 }}>0/200</Text>
          </View>

          <ListItem
            data={History}
            title='医美史'
          />
          <View style={{ backgroundColor: '#f3f3f3', marginTop: 14, borderRadius: 6, padding: 4 }}>
            <TextInput
              editable={false}
              maxLength={200}
              placeholder='个性化诉求说明'
              style={{ height: 80 }}
              multiline
            />
            <Text style={{ color: '#aaa', alignSelf: 'flex-end', fontSize: 13, marginTop: 10, marginRight: 6 }}>0/200</Text>
          </View>

          <ListItem
            data={Reason}
            title='做医美的原因'
          />
          <ListItem
            data={Methods}
            title='您能接受的治疗手段'
          />
          <ListItem
            data={Patience}
            title='您对疼痛的忍受度'
          />
          <ListItem
            data={Styles}
            title='您对审美风格'
          />
          <ListItem
            data={Cycle}
            title='您能接受的恢复周期'
          />
          <ListItem
            data={Special}
            title='特殊情况说明'
          />
          <ListItem
            data={Budget}
            title='预算范围'
          />
          <ListItem
            data={Numbers}
            title='医美消费次数'
          />
        </ScrollView>
      </View>
      <View style={{ paddingVertical: 48, paddingHorizontal: 20 }}>
        <Button
          style={{height: 38, marginHorizontal: 10, borderRadius: 19}}
          title='保存'
        />
      </View>

    </View>
  )
}

function Album (props) {
  return (
    <View />
  )
}
