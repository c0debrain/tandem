import './index.scss';
import React from 'react';
import UnitInputComponent from 'common/components/inputs/unit-input';
import createStyleReference from './create-style-reference';

class TransformPaneComponent extends React.Component {
  render() {
    var entity = this.props.app.focus;
    if (!entity) return null;

    return <div className='m-transform-pane'>

      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <label>x</label>
            <UnitInputComponent entity={entity} reference={createStyleReference(entity, 'left')} />
          </div>
          <div className='col-sm-6'>
            <label>y</label>
            <UnitInputComponent entity={entity} reference={createStyleReference(entity, 'top')} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <label>w</label>
            <UnitInputComponent reference={createStyleReference(entity, 'width')} />
          </div>
          <div className='col-sm-6'>
            <label>h</label>
            <UnitInputComponent reference={createStyleReference(entity, 'height')} />
          </div>
        </div>

        <div className='row hidden'>
          <div className='col-sm-3'>
            <label>rx</label>
            <input type='text'></input>
          </div>
          <div className='col-sm-3'>
            <label>ry</label>
            <input type='text'></input>
          </div>
          <div className='col-sm-3'>
            <label>rz</label>
            <input type='text'></input>
          </div>
          <div className='col-sm-3'>
          </div>
        </div>
      </div>

    </div>;
  }
}
export default TransformPaneComponent;