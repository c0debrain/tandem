import { DisplayEntityComputer } from 'common/entities';
import { translateStyleToIntegers } from 'common/utils/html/css/translate-style';
import BoundingRect from 'common/geom/bounding-rect';

import {
  translateStyle,
  translateLength as translateCSSLength
} from 'common/utils/html/css';

import {
  calculateZoom
} from 'common/utils/html';

class ReactEntityComputer extends DisplayEntityComputer {

  setPositionFromAbsolutePoint(point) {

    // absolute positions are always in pixels - always round
    // to the nearest one
    var newStyle = translateStyle({
      left: point.left,
      top: point.top
    }, this.entity.getStyle(), this.getDisplayElement());

    this.entity.setStyle(newStyle);
  }

  getDisplayElement() {
    return this.displayObject.refs.element;
  }

  setBounds(bounds) {

    // NO zoom here - point is NOT fixed, but relative
    var absStyle = this.getStyle();
    var entStyle = this.entity.getStyle();

    var props = { ...bounds };
    for (var k in bounds) {
      if (entStyle[k] == void 0) continue;

      // TODO - want to use translateStyle here instead
      props[k] = translateCSSLength(
        absStyle[k],
        entStyle[k],
        bounds[k]
      );
    }

    this.entity.setStyle(props);
  }

  toJSON() {
    return null;
  }

  getBoundingRect() {

    var refs = this.displayObject.refs;

    if (!refs.element) {
      throw new Error('trying to calculate display information on entity that is not mounted');
      return { };
    }

    var entity = this.entity;

    // eeeesh - this is yucky, but we *need* to offset the position
    // of the preview canvas so that we can get the correct position
    // of this element. This is the *simplest* solution I can think of.
    // TODO - this *will not work* when we start adding multiple canvases
    var pcrect = document.getElementById('preview-canvas').getBoundingClientRect();
    var rect = refs.element.getBoundingClientRect();

    return BoundingRect.create({
      left: rect.left - pcrect.left,
      top : rect.top  - pcrect.top,
      right: rect.right - pcrect.left,
      bottom: rect.bottom - pcrect.top
    });
  }

  getStyle() {

    var refs = this.displayObject.refs;

    if (!refs.element) {
      console.warn('trying to calculate display information on entity that is not mounted');
      return { };
    }

    var entity = this.entity;

    var rect = this.getBoundingRect();
    var cs   = window.getComputedStyle(refs.element);

    var w = rect.right  - rect.left;
    var h = rect.bottom - rect.top;

    var resizable = cs.display !== 'inline';
    var style = entity.getStyle();

    // left & top positions are not computed properly in Chrome
    // if an element is zoomed out. Need to translate the style stored
    // on the entity, compute that with the given element, then return the style
    var { left, top } = translateStyleToIntegers({
      left: style.left || rect.left,
      top : style.top  || rect.top
    }, refs.element);

    return {
      resizable : resizable,
      left      : left,
      top       : top,
      width     : w,
      height    : h
    };
  }
}

export default ReactEntityComputer;
