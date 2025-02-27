import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

const convertJsonToCsv = (jsonArray) => {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
        return "";
    }

    const headers = Object.keys(jsonArray[0]);

    const rows = jsonArray.map(obj =>
        headers.map(header => JSON.stringify(obj[header] ?? "")).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
};

const saveCsvFile = async (csvData) => {
    try {
        const path = `${RNFS.DownloadDirectoryPath}/timers.csv`; 

        await RNFS.writeFile(path, csvData, 'utf8');
        
        Alert.alert("Success", `CSV file saved at: ${path}`);
        console.log("File saved at:", path);
    } catch (error) {
        Alert.alert("Failed to save CSV file:", error.toString());
    }
};


export default async () => {
    try {
        const storedTimers = await AsyncStorage.getItem('timers');
        
        if (storedTimers !== null) {
            const jsonData = JSON.parse(storedTimers); 
            const csvData = convertJsonToCsv(jsonData);
            
            await saveCsvFile(csvData); 
        } else {
            Alert.alert("No Data", "No timers found");
        }
    } catch (error) {
        console.error("Failed to load timers:", error);
    }
};
