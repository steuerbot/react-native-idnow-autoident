import * as React from 'react';

import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { startAutoIdent } from 'react-native-idnow-autoident';
import { useCallback, useState } from 'react';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  const [id, setId] = useState('');

  const start = useCallback(async () => {
    const r = await startAutoIdent({ id });
    setResult(r);
  }, [id]);

  return (
    <View style={styles.container}>
      <TextInput value={id} onChangeText={setId} style={styles.textInput} />
      <Button title="Start AutoIdent" onPress={start} />
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
