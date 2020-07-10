import * as React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Image from 'react-native-fast-image'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'
const { width } = Dimensions.get('window')
export default (props) => {
  const { colors } = useTheme()
  const { data = {}, index } = props
  const { title = '', projects = [] } = data
  return (
    <View style={[styles.container, { backgroundColor: colors.shop.bg }, tools.elevationShadowStyle(10, colors.shadow)]}>
      <TouchableOpacity activeOpacity={0.8} style={[styles.infoContainer, index === 0 && { backgroundColor: colors.warning }, index === 1 && { backgroundColor: colors.lightWarning }, index === 2 && { backgroundColor: colors.deepGray }]}>
        <Image
          source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2898349460,268201268&fm=26&gp=0.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={styles.name}>{data.name}</Text>
              <Text>{title}</Text>
            </View>
            <Text style={{ marginTop: 4, fontSize: 12 }}>{data.num}案例</Text>
          </View>
          <Text style={{ fontSize: 12 }}>{data.hospital}</Text>
        </View>
      </TouchableOpacity>
      {
        index <= 2 && <DoctorProjects data={projects} />
      }
    </View>
  )
}

function DoctorProjects (props) {
  const { colors } = useTheme()
  const { data = [] } = props
  console.log(data)
  return (
    <View style={{
      padding: 16
    }}
    >
      <ScrollView
        horizontal
      >
        {
          data.slice().map((item, index) =>
            <View key={index} style={styles.project}>
              <Image
                style={{ width: width / 5.6, height: width / 5.6, borderRadius: 6 }}
                source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
              />
              <Text style={{ color: colors.text, lineHeight: 16, marginTop: 10 }} numberOfLines={2}>{item.title}</Text>
              <Text style={{ marginTop: 14, color: colors.tip }}>￥<Text style={{ fontSize: 18 }}>{item.price}</Text></Text>
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    overflow: 'hidden'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  info: {
    justifyContent: 'space-between',
    marginLeft: 20,
    height: 60
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6
  },
  project: {
    width: width / 5.6,
    marginRight: 16
  }
})
