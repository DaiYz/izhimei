import { useTheme } from '@react-navigation/native'
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet, View } from 'react-native'
import * as React from 'react'
import Avatar from '../avatar'
import { tools } from '../../utils'
export default function List (props) {
  const { colors } = useTheme()
  const { avatar, name, message, renderLabel = () => null, renderContent, onPress, style, otherInfo, renderOtherInfo, renderBody, containerStyle } = props
  const Container = renderBody ? View : TouchableOpacity
  return (
    <>
      <Container
        disabled={onPress === undefined} activeOpacity={0.8} style={[styles.outStyle, { borderColor: colors.border, backgroundColor: colors.card }, containerStyle]}
        onPress={onPress}
      >
        <View style={[styles.container, style]}>
          <Avatar
            source={{ uri: avatar }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <View style={styles.info}>
            <View style={styles.content}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4, marginRight: 60 }}>
                <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>{name}</Text>
                {otherInfo ? <Text style={{ fontSize: 12, color: colors.lightText }}>{otherInfo}</Text> : renderOtherInfo ? renderOtherInfo() : null}
              </View>
              {
                renderContent ? renderContent() : <Text numberOfLines={1} style={{ color: colors.lightText }}>{message}</Text>
              }
            </View>
            {renderLabel()}
          </View>
        </View>
      </Container>
      {
        renderBody && renderBody()
      }
    </>
  )
}

const styles = StyleSheet.create({
  outStyle: {
    borderTopWidth: tools.minLineHeight()
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  info: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10
  },
  content: {
    flex: 1,
    marginRight: 40,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  }

})
