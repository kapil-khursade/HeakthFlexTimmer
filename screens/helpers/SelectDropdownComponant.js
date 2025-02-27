import { View, Text} from 'react-native';
import HomeScreenStyle from '../../styleSheets/ScreenStyle';
import SelectDropdown from 'react-native-select-dropdown';

const SelectDropdownComponant = ({name, dataArr, setdata, data, themeStyles}) => {
  return (
    <SelectDropdown
    data={dataArr}
    onSelect={(selectedItem, index) => {
      setdata(selectedItem)
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={{...themeStyles.border,...HomeScreenStyle.dropdownButtonStyle}}>
          <Text style={{...themeStyles.text,...HomeScreenStyle.dropdownButtonTxtStyle}}>
           {data && selectedItem || `Select ${name}` }
          </Text>
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...HomeScreenStyle.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={HomeScreenStyle.dropdownItemTxtStyle}>{item}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={HomeScreenStyle.dropdownMenuStyle}
  />
  )
}

export default SelectDropdownComponant