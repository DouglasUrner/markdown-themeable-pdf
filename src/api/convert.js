'use babel'

import { isEmpty, get } from 'lodash'
import markdownToHTML from './convert/markdownToHTML'
import { readFile } from './filesystem'
import { getConfig } from './atom'

const options = () => {
  return {
    markdownIt: {
      html: getConfig('enableHtmlInMarkdown'),
      linkify: getConfig('enableLinkify'),
      typographer: getConfig('enableTypographer'),
      xhtmlOut: getConfig('enableXHTML'),
      breaks: getConfig('enableBreaks'),
      quotes: getConfig('smartQuotes'),
      enableCodeHighlighting: getConfig('enableCodeHighlighting'),
      codeHighlightingAuto: getConfig('codeHighlightingAuto'),
      enableImSizeMarkup: getConfig('enableImSizeMarkup'),
      enableCheckboxes: getConfig('enableCheckboxes'),
      enableSmartArrows: getConfig('enableSmartArrows'),
      enableTOC: getConfig('enableTocAndAnchor') === 'TOC enabled' || getConfig('enableTocAndAnchor') === 'TOC and Anchors enabled',
      enableAnchor: getConfig('enableTocAndAnchor') === 'Anchors enabled' || getConfig('enableTocAndAnchor') === 'TOC and Anchors enabled',
      tocFirstLevel: getConfig('tocFirstLevel'),
      tocLastLevel: getConfig('tocLastLevel')
      anchorLinkSymbol: getConfig('anchorLinkSymbol')
    }
  }
}

const convert = (filePath, exportFileType, opt = null) => {
  return new Promise(async (resolve, reject) => {
    if (!isEmpty(filePath)) {
      opt = opt || options()
      try {
        const htmlIsFinalFormat = (exportFileType === 'html')
        const markdown = await readFile(filePath)
        const html = await markdownToHTML(markdown, htmlIsFinalFormat, get(opt, 'markdownIt'))
        console.log(html)
        if (htmlIsFinalFormat) {
          resolve(filePath)
        } else {
          resolve(filePath)
        }
      } catch (e) {
        reject(e)
      }
    } else {
      reject('File path to markdown file is unknown')
    }
  })
}

export default convert
