import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  Picker
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

const imageTypes = [
  'hass',
  'hmidriff',
  'pgif',
  '4k',
  'hentai',
  'holo',
  'hneko',
  'neko',
  'hkitsune',
  'kemonomimi',
  'anal',
  'hanal',
  'gonewild',
  'kanna',
  'ass',
  'pussy',
  'thigh',
  'hthigh',
  'gah',
  'coffee',
  'food'
]

const App = () => {
  const [type, setType] = React.useState('food')
  const [image, setImage] = React.useState(undefined)
  const refrash = async () => {
    const res = await fetch(
      `https://nekobot.xyz/api/image${
        typeof type !== 'undefined' ? `?type=${type}` : ''
      }`
    )
    setImage(JSON.parse(await res.text()))
  }
  React.useEffect(
    () => {
      refrash()
    },
    [type]
  )
  return (
    <View style={styles.root}>
      {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
      {typeof image !== 'undefined' ? (
        <View>
          <View style={styles.blank} />
          <Image
            style={styles.image}
            source={{ uri: image.message }}
            resizeMode='contain'
          />
          <View style={styles.blank}>
            <RNPickerSelect
              placeholder={{
                label: 'Select Type...',
                value: null,
                color: '#9EA0A4'
              }}
              onValueChange={(value) => setType(value)}
              style={pickerSelectStyles}
              items={imageTypes.map((x) => {
                return { label: x, value: x }
              })}
              onDonePress={() => {
                refrash()
              }}
            />
          </View>
        </View>
      ) : (
        <Text>Wait for a moment please...</Text>
      )}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  image: {
    flex: 2,
    height: 1024,
    width: 1024,
    alignSelf: 'center'
  },
  blank: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black'
  }
})
