/// <reference path="typings.d.ts" />
const BUFFER_SIZE = 4096;

function main() {
    document
        .getElementById("boyaku")
        .addEventListener("click", ev => {

        });
}

function createAudioContext() {
    let audioContext = new AudioContext();
    let audioData = [];
    let bufferArrayLength = audioContext.sampleRate / BUFFER_SIZE * beforeSecond;
}

async function hogehoge() {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    let context = new AudioContext();

    var processor = context.createScriptProcessor(BUFFER_SIZE, 1, 1);
    var source = (<any>context).createMediaStreamSource(stream);
    source.connect(processor);
    processor.addEventListener('audioprocess', ev => {
        // 音声データを取得
        var input = e.inputBuffer.getChannelData(0);

        var bufferData = new Float32Array(bufferSize);
        // 音声データをバッファに書き込む
        for (var i = 0; i < bufferSize; i++) {
            bufferData[i] = input[i];
        }

        // 音声録音開始前時間分の音声データを毎回プッシュをしては、シフトして前回のデータを削除
        audioData.push(bufferData);
        audioData.shift();
 
        // マイクから閾値以上の音量が入っている間、音声データを保存
        // record_flagは音声の音量をみる処理を書いて変更します（今回はここの説明なし）
        if (record_flag) {
            recentSavedVoice.push(bufferData);
        }
    });
    processor.connect(context.destination);
}

function hoge() {
    // 音声バッファ時間(音声録音開始前時間)
    // この値が音声録音開始イベント前の音声録音時間
    var beforeSecond = 0.2;
    // ここに録音用音声データを保存
    var recentReceivedVoice = null;
    // 音声録音中フラグ
    var record_flag = false;

    //サンプリングレート、バッファサイズ等
    var audioContext = new AudioContext();
    var sampleRate = audioContext.sampleRate;
    var bufferSize = 4096;
    var audioData = [];
    var bufferArrayLength = sampleRate / bufferSize * beforeSecond;
    // 初期化用の空のデータ用意
    var nosound = new Float32Array(bufferSize);
 
    // 音声録音開始前時間分のバッファ準備
    function initAudioData() {
        audioData = [];
        for (var i = 0; i < bufferArrayLength; i++) {
            audioData.push(nosound);
        }
    }
 
    // マイクから音声を検知したとき
    // onRecognized()を呼び出す処理は別途書く必要あり
    function onRecognized() {
        //音声録音開始前時間分の音声データを保存
        recentSavedVoice = audioData;
        // オーディオデータを新規作成
        initAudioData();
    }
 
    //毎音声処理
    function onAudioProcess(e) {
        // 音声データを取得
        var input = e.inputBuffer.getChannelData(0);

        var bufferData = new Float32Array(bufferSize);
        // 音声データをバッファに書き込む
        for (var i = 0; i < bufferSize; i++) {
            bufferData[i] = input[i];
        }
 
        // 音声録音開始前時間分の音声データを毎回プッシュをしては、シフトして前回のデータを削除
        audioData.push(bufferData);
        audioData.shift();
 
        // マイクから閾値以上の音量が入っている間、音声データを保存
        // record_flagは音声の音量をみる処理を書いて変更します（今回はここの説明なし）
        if (record_flag) {
            recentSavedVoice.push(bufferData);
        }
    }
 
    // 音声処理開始
    function initialize() {
        navigator.getUserMedia(
            // audio:trueで音声取得を有効にする
            { audio: true },
            function(stream) {
                // 音声処理ノード
                // var javascriptnode = audioContext.createJavaScriptNode(bufferSize, 1, 1);  // 入力チャンネル数は1にしている
                var javascriptnode = audioContext.createScriptProcessor(bufferSize, 1, 1);  // メソッド名がcreateJavaScriptNodeから変更された
                var mediastreamsource = audioContext.createMediaStreamSource(stream);
                mediastreamsource.connect(javascriptnode);
                javascriptnode.onaudioprocess = onAudioProcess;
                javascriptnode.connect(audioContext.destination);
            }, function(e) {
                console.log(e);
            });
    }
 
    // オーディオバッファ初期化
    initAudioData();
    // 音声処理開始
    initialize();
}

try {
    main();
} catch (e) {
    console.error(e);
}
