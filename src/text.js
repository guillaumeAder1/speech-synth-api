let ttsRecorder = new SpeechSynthesisRecorder({
    text: "The revolution will not be televised",
    utternanceOptions: {
        voice: "english-us espeak",
        lang: "en-US",
        pitch: .75,
        rate: 1
    }
});

// ArrayBuffer
ttsRecorder.start()
    // `tts` : `SpeechSynthesisRecorder` instance, `data` : audio as `dataType` or method call result
    .then(tts => tts.arrayBuffer())
    .then(({ tts, data }) => {
        // do stuff with `ArrayBuffer`, `AudioBuffer`, `Blob`,
        // `MediaSource`, `MediaStream`, `ReadableStream`
        // `data` : `ArrayBuffer`
        tts.audioNode.src = URL.createObjectURL(new Blob([data], { type: tts.mimeType }));
        tts.audioNode.title = tts.utterance.text;
        tts.audioNode.onloadedmetadata = () => {
            console.log(tts.audioNode.duration);
            tts.audioNode.play();
        }
    })
// AudioBuffer     
ttsRecorder.start()
    .then(tts => tts.audioBuffer())
    .then(({ tts, data }) => {
        // `data` : `AudioBuffer`
        let source = tts.audioContext.createBufferSource();
        source.buffer = data;
        source.connect(tts.audioContext.destination);
        source.start()
    })
// Blob
ttsRecorder.start()
    .then(tts => tts.blob())
    .then(({ tts, data }) => {
        // `data` : `Blob`
        tts.audioNode.src = URL.createObjectURL(blob);
        tts.audioNode.title = tts.utterance.text;
        tts.audioNode.onloadedmetadata = () => {
            console.log(tts.audioNode.duration);
            tts.audioNode.play();
        }
    })
// ReadableStream
ttsRecorder.start()
    .then(tts => tts.readableStream())
    .then(({ tts, data }) => {
        // `data` : `ReadableStream`
        console.log(tts, data);
        data.getReader().read().then(({ value, done }) => {
            tts.audioNode.src = URL.createObjectURL(value[0]);
            tts.audioNode.title = tts.utterance.text;
            tts.audioNode.onloadedmetadata = () => {
                console.log(tts.audioNode.duration);
                tts.audioNode.play();
            }
        })
    })
// MediaSource
ttsRecorder.start()
    .then(tts => tts.mediaSource())
    .then(({ tts, data }) => {
        console.log(tts, data);
        // `data` : `MediaSource`
        tts.audioNode.srcObj = data;
        tts.audioNode.title = tts.utterance.text;
        tts.audioNode.onloadedmetadata = () => {
            console.log(tts.audioNode.duration);
            tts.audioNode.play();
        }
    })
// MediaStream
let ttsRecorder = new SpeechSynthesisRecorder({
    text: "The revolution will not be televised",
    utternanceOptions: {
        voice: "english-us espeak",
        lang: "en-US",
        pitch: .75,
        rate: 1
    },
    dataType: "mediaStream"
});
ttsRecorder.start()
    .then(({ tts, data }) => {
        // `data` : `MediaStream`
        // do stuff with active `MediaStream`
    })
    .catch(err => console.log(err))