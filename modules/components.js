import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import { setComponentState as setComponentStateExt } from '../redux/actions.js';
import { componentSelector } from '../redux/selectors.js';

/*
 * GenGenericInput creates a fully wired-up stateful input field component
 *
 * @param component_name: "category.component" representing the location in the store
 *  where the input's state will be contained
 */
export function GenGenericInput(component_fullname){
  const [category_name, component_name] = component_fullname.split(".");

  function _GenericInput({component_state, setComponentState}, ...props) {
    if (component_state == null) {
      let default_input_state = {
        ref: React.createRef(),
        text: "",
        errorMessage: "",
        errorStyle: null,
        errorProps: null,
      };
      setComponentState(category_name, component_name, default_input_state);
      component_state = default_input_state
    }

    function changeText(text){
      setComponentState(category_name, component_name, {...component_state, text: text});
    }
    console.log(props);
    return (
      <Input {...props}
        onChangeText={changeText}
        value={component_state.text}
        ref={component_state.ref}
      />
    );
  }
  _GenericInput.propTypes = {
    component_state: PropTypes.object,
    setComponentState: PropTypes.func.isRequired,
  }

  return connect(
    state => ({
      component_state: componentSelector(state)[category_name][component_name]
    }),
    ({ setComponentState: setComponentStateExt }),
    null,
    { forwardRef: true },
  )(_GenericInput);
}
