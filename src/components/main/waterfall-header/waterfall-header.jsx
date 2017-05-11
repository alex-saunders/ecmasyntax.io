import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import checkboxStyles from '@material/switch/dist/mdc.switch.css';
import s from './waterfall-header.scss';

class WaterfallHeader extends React.Component {

  render() {
    const style = {
      maxHeight: this.props.scrolled ? '0px' : '51px',
    }
    return (
      <div className={s.header} style={style}>
        <div className={s['header-contentWrapper']}>
          <span>
            Available Offline
          </span>
          <div className={checkboxStyles['mdc-switch']}>
            <input type="checkbox" id="basic-switch" className={checkboxStyles['mdc-switch__native-control']} />
            <div className={checkboxStyles['mdc-switch__background']}>
              <div className={checkboxStyles['mdc-switch__knob']}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default withStyles(s, checkboxStyles)(WaterfallHeader);
