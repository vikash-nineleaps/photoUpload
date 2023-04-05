import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import {StyleSheet} from 'react-native';

async function chooseFile() {
  // console.log(DocumentPicker);
  try {
    const file = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    const {0: file1} = file;
    console.log(file1.uri);
    const path = await normalizePath(file1.uri);
    console.log(path);
    const result = await RNFetchBlob.fs.readFile(path, 'base64');
    console.log(result.length);
  } catch (err) {
    if (!DocumentPicker.isCancel(err)) {
      throw err;
    }
  }
}
async function normalizePath(path) {
  try {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file:';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
      }

      path = decodeURI(path);
      return path;
    }
  } catch (e) {
    console.log(e);
  }
}
const FileUpload = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={chooseFile}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FileUpload;
