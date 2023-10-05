import React from 'react'
import parseHTML from 'html-react-parser'
import styles from './styles.module.scss'

const HTMLBlock = (props) => {
  const { data } = props || {}
  const { htmlBlock } = data || {}
  const { contentInlineStyle } = htmlBlock
  return (
    <div className={styles.container}>
      {parseHTML(contentInlineStyle)}
    </div>
  )
}

export default HTMLBlock