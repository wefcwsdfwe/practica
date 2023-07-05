import React, { Component } from 'react';
import styles from './button.module.css';

class Button extends Component {
  render() {
    // reference as a js object
    return <button className={styles.button}>Error Button</button>;
  }
}