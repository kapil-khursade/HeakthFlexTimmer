import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

const convertJsonToCsv = (jsonArray) => {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
        return "";
    }

    // Extract column headers
    const headers = Object.keys(jsonArray[0]);

    // Convert each JSON object to a CSV row
    const rows = jsonArray.map(obj =>
        headers.map(header => JSON.stringify(obj[header] ?? "")).join(",")
    );

    // Combine headers and rows
    return [headers.join(","), ...rows].join("\n");
};

const saveCsvFile = async (csvData) => {
    try {
        const path = `${RNFS.DownloadDirectoryPath}/timers.csv`;  // Save to Downloads folder

        await RNFS.writeFile(path, csvData, 'utf8');
        
        Alert.alert("Success", `CSV file saved at: ${path}`);
        console.log("File saved at:", path);
    } catch (error) {
        console.error("Failed to save CSV file:", error);
    }
};


export default async () => {
    try {
        const storedTimers = await AsyncStorage.getItem('timers');
        
        if (storedTimers !== null) {
            const jsonData = JSON.parse(storedTimers);  // Convert string to JSON
            const csvData = convertJsonToCsv(jsonData); // Convert JSON to CSV
            
            await saveCsvFile(csvData);  // Save to file
        } else {
            Alert.alert("No Data", "No timers found");
        }
    } catch (error) {
        console.error("Failed to load timers:", error);
    }
};
