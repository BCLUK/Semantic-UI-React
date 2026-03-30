"use client";

import * as React from 'react';
import { useMergedRefs } from '../../../lib';
import validateTrigger from './validateTrigger';

/**
 * @param {React.ReactNode} trigger
 * @param {React.Ref} triggerRef
 */
function useTrigger(trigger, triggerRef) {
  var _trigger$props;
  var ref = useMergedRefs(trigger == null || (_trigger$props = trigger.props) == null ? void 0 : _trigger$props.ref, triggerRef);
  if (trigger) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      validateTrigger(trigger);
    }
    return [ref, /*#__PURE__*/React.cloneElement(trigger, {
      ref: ref
    })];
  }
  return [ref, null];
}
export default useTrigger;