import Select from './select'
import DropdownMenu from './dropdown'
import Radio from './radio'
import Checkbox from './checkbox'
import FormProgress from './progress'
import InputField from './input'
import Textarea from './textarea'
import TimezoneSelect from './timezone-select'
import FormPageContainer from './form-page-container'
import TimePicker from './time-picker'
import InputRadio from './input-radio'
import RadioOption from './radio-option'

export {
  Select,
  DropdownMenu,
  Radio,
  Checkbox,
  FormProgress,
  InputField,
  Textarea,
  TimezoneSelect,
  FormPageContainer,
  TimePicker,
  InputRadio,
  RadioOption
}

export const Form = ({className, children, register, name, ...props}) => {
  return (
    <form
      className={className}
      noValidate
      name={name}
      {...props}
    >
      {children}

    </form>
  )
}