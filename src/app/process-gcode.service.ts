// import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver';
import { LineReader } from 'line-reader-browser';

// @Injectable({
//   providedIn: 'root'
// })
export class ProcessGcodeService {
  // private _item: string = '';

  constructor(file: File) {
    console.time('Task Done');
    document.body.style.cursor = 'wait';

    console.info(`Try to parse '${file.name}' - ${this.returnFileSize(file.size)}`);

    if (/\.gcode$/i.test(file.name) === false) {
      console.error('Invalid file extension');
      return;
    }

    const lr = new LineReader(file, 4 * 1024);

    const content = new Array();

    console.time('Loading file to memory');

    lr.forEachLine((line: string, i: any) => {
      content.push(line + '\n');
    }).then(() => {
      content.push('\n;Processed by SCRIPT');

      console.timeEnd('Loading file to memory');

      const idxLayers = new Array();
      const idxTypes = new Array();

      console.time('Find layers and types comments');

      /**
       * Create indexes (content array index) of lines with
       * layer and type comment
      */
      content.forEach((element, index) => {
        const elementStr = element.toString();
        if (elementStr.startsWith(';LAYER:')) {
          idxLayers.push(index);
        } else if (elementStr.startsWith(';TYPE:')) {
          idxTypes.push(index);
        }
      });

      const TOTAL_LAYERS = idxLayers.length; // total layers from array size

      if (!TOTAL_LAYERS) {
        throw new Error('No layers');
      }

      console.timeEnd('Find layers and types comments');

      const layersList = new Array(); // list of layers with properties: layer nr, height, index

      console.time('Process layers');

      // get layer details
      idxLayers.forEach((element, index) => {
        /**
         * Sample GCODE
         * ;LAYER:35
         * ;Z:10.100
         * ;HEIGHT:0.280
         */
        const regexHeight: RegExp = /(;HEIGHT:)(\d+\.\d+)/g;
        let heightValue: RegExpExecArray | string = regexHeight.exec(content[element + 2].toString()); // get layer height from comment (2nd line after layer number)

        if (!heightValue || heightValue.length !== 3) {
          console.error('error find height: ' + element);
          heightValue = '-';
        } else {
          heightValue = heightValue[2].replace(/^0+|0+$/g, ''); // strip leading zeros
        }

        layersList.push({ layer: index + 1, height: heightValue, index: element });
      });

      // delete idxLayers; // free up memory

      layersList.forEach((element) => {
        const m117 = `M117 ${element.layer}/${TOTAL_LAYERS}(${element.height})  `;

        // add gcode text before comment
        content[element.index] = m117 + content[element.index];
      });

      console.timeEnd('Process layers');
      console.time('Process types');

      // get type details and add gcode text before comment
      idxTypes.forEach((element) => {
        /**
         * Sample GCODE
         * ;TYPE:WALL-INNER
         * ;WIDTH:0.400
         */
        const regexType: RegExp = /TYPE:(.*)/g;
        let typeValue: RegExpExecArray | string = regexType.exec(content[element].toString());

        if (!typeValue || typeValue.length !== 2) {
          console.error('error find type: ' + element);
          typeValue = '';
        } else {
          typeValue = typeValue[1];
        }

        const matchedLayers = layersList.filter((elm) => elm.index < element);
        const matchedLayer = matchedLayers[matchedLayers.length - 1]; // select last item (correct layer)

        if (matchedLayer) {
          const m117 = `M117 ${matchedLayer.layer}/${TOTAL_LAYERS}(${matchedLayer.height}) ${typeValue}  `;

          content[element] = m117 + content[element];
        }
      });

      console.timeEnd('Process types');
    }).then(() => {
      console.time('Save file');

      const filename = `${file.name.replace(/\.[^/.]+$/, '')}-changed.gcode`;

      const saveFile = new File(content, filename, { type: 'text/plain;charset=utf-8' });
      saveAs(saveFile);

      document.body.style.cursor = 'default';

      console.timeEnd('Save file');
      console.timeEnd('Task Done');
    }).catch((error: any) => {
      console.error(error);
      document.body.style.cursor = 'default';
    });
  }

  returnFileSize(num: number) {
    if (num < 1024) {
      return num + 'bytes';
    } else if (num >= 1024 && num < 1048576) {
      return (num / 1024).toFixed(1) + 'KB';
    } else if (num >= 1048576) {
      return (num / 1048576).toFixed(1) + 'MB';
    }
  }

  processFile(file: File) {

  }

}
