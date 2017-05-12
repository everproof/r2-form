import { arrayOf, func, number, string } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'
import { withFormContext } from 'helpers'

const FieldList = ({ component, form, indexes, listAdd, name }) =>
  component({
    add: () =>
      listAdd({
        form,
        name,
      }),
    names: indexes.map(index => `${name}[${index}]`),
  })

FieldList.defaultProps = {
  placeholder: '',
}

FieldList.displayName = 'FieldList'

FieldList.propTypes = {
  component: func.isRequired,
  indexes: arrayOf(number).isRequired,
  listAdd: func.isRequired,
  name: string.isRequired,
}

const mapStateToProps = ({ form: formState }, { form, name }) => {
  const valuesList = formState.getIn([form, ...name.split('.')])

  return {
    indexes: valuesList
      ? valuesList.toArray().map((value, index) => index)
      : [],
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default withFormContext(
  connect(mapStateToProps, mapDispatchToProps)(FieldList),
)
