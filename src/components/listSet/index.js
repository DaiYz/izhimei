import { useTheme } from '@react-navigation/native'
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet, View, TextInput } from 'react-native'
import * as React from 'react'
import { tools } from '../../utils'

export default function (props) {
  const { colors } = useTheme()
  const { title = '', renderLabel, content, isLast = false, onPress = () => {}, contentStyle, type = 'normal', placeholder, onChangeText = () => {}, renderOther, ...otherProps } = props
  return (
    <>
      {
        type === 'normal'
          ? <TouchableOpacity activeOpacity={0.8} style={[styles.container, { backgroundColor: colors.card }]} onPress={onPress}>
            <View style={[styles.info, { borderColor: colors.border, borderBottomWidth: isLast ? 0 : tools.minLineHeight() }]}>
              <Text>{title}</Text>
              {
                content
                  ? <Text style={contentStyle}>{content}</Text>
                  : <View style={styles.right}>
                    {renderLabel ? renderLabel() : null}
                    <Text>icon</Text>
                    </View>
              }
            </View>
            </TouchableOpacity>
          : <View style={[styles.container, { backgroundColor: colors.card }]}>
            <View style={[styles.info, { borderColor: colors.border, borderBottomWidth: isLast ? 0 : tools.minLineHeight() }]}>
              <Text numberOfLines={1} style={{ width: 100 }}>{title}</Text>
              <TextInput
                placeholder={placeholder}
                style={{ padding: 0, flex: 1 }}
                underlineColorAndroid='transparent'
                onChangeText={(e) => onChangeText(e)}
                {...otherProps}
              />
              {
                renderOther ? renderOther() : null
              }
            </View>
            </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height: 44
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
