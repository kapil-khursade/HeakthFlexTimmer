import { StyleSheet } from 'react-native';

const HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeadingText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  timerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actionBtn: {
    width: 30,
    padding: 5,
    borderRadius: 5,
  },
  exportBtn: {
    width: 150,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
  },
  flatListContainer: {
     height: 200, 
     width: "100%"
  },
  dataText: {
    fontSize: 16,
    color: "#FFFFFF"
  },
  dropdownMenuStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },

  dropdownButtonStyle: {
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 0.5, 
    marginBottom: 10
  },

  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: '500',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  tableContainer: {
    borderWidth: 1,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  toggleBtn: {
    padding: 5,
    borderRadius: 5,
  },
  sortContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-end", 
  },
  headerContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
  },
  sortBtnContainer: {
    width: 100, 
    marginStart: 10
  },
  bulkActionBtnContainer: {
    flexDirection: "row", 
    alignItems: "center",  
    width: 100, 
    marginStart: 10
  }
});

export default HomeScreenStyle;
