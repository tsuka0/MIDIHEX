self.onmessage = (event) => {
    const { type, arrayBuffer } = event.data;

    if (type === 'process') {
        const byteArray = new Uint8Array(arrayBuffer);
        const totalBytes = byteArray.length;
        let hexString = '';
        const chunkSize = 100000; // 一度に処理するバイト数

        for (let i = 0; i < totalBytes; i += chunkSize) {
            const chunk = byteArray.slice(i, i + chunkSize);
            hexString += Array.from(chunk)
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('').toUpperCase();

            // 進捗を報告
            const progress = Math.min(((i + chunkSize) / totalBytes) * 100, 100).toFixed(2);
            self.postMessage({ type: 'progress', data: progress });
        }

        // 結果を返す
        self.postMessage({ type: 'result', data: hexString });
    }
};
