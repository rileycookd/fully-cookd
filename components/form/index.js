import Select from './select'
import DropdownMenu from './dropdown'
import Radio from './radio'
import Checkbox from './checkbox'
import FormProgress from './progress'
import InputField from './input'
import Textarea from './textarea'
import TimezoneSelect from './timezone-select'

export {
  Select,
  DropdownMenu,
  Radio,
  Checkbox,
  FormProgress,
  InputField,
  Textarea,
  TimezoneSelect
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