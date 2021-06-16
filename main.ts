
enum vocabularyList{
    VOICE_YES = 1,
    VOICE_NO = 2
    
}

namespace mASR{

    let asrEventId = 3500
    let lastvoc = 0
     //% block="ASR sensor IIC port hear %vocabulary"
    //% subcategory=Sensor group="IIC Port"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    export function  ASR(vocabulary:vocabularyList,handler:() => void ){
        control.onEvent(asrEventId,vocabulary,handler)
        control.inBackground(function () {
            const voc = pins.i2cReadNumber(0x0B, 1)
                if (voc != lastvoc) {
                    lastvoc = voc
                    control.raiseEvent(asrEventId, lastvoc);
                }
                basic.pause(50);
        })

    }
}

