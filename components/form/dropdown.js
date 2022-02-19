import React, { useState } from 'react';
import Select from 'react-select';

const selectStyles = {
  control: (provided) => ({
    ...provided,
    display: 'none'
  }),
  input: (provided, state) => ({
    ...provided,
    display: 'none'
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    display: 'none'
  }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

// styled components

const Menu = (props) => {

  return (
    <div
      className='bg-white font-heading font-normal w-max border border-grey-300 rounded-md shadow-md mt-1 cursor-pointer absolute z-20'
      {...props}
    />
  );
};
const Blanket = (props) => (
  <div
    className='fixed top-0 right-0 bottom-0 left-0 z-10'
    {...props}
  />
);

const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
}) => (
  <div className='relative'>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);

const Button = ({children, iconAfter, onClick, isSelected}) => (
  <button 
    className={`flex w-max items-center transition ease-out duration-300 ${!isSelected ? 'bg-grey-300 hover:bg-grey-400' : 'bg-grey-400'} rounded px-4 py-2 font-heading text-primary font-bold text-sm`}
    onClick={onClick}
  >
    {children}
    <span>{iconAfter}</span>
  </button>
)

const Svg = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...props}
  />
);
const DropdownIndicator = () => (
  <div className='w-2 h-4'>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);
const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);

export default function DropdownMenu(props) {
  const {
    options,
    label,
    selectedLabel,
    value,
    onChange,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const onSelectChange = (value) => {
    setIsOpen(!isOpen)
    onChange(value.value)
  };

  let buttonLabel = label || 'Select'
  let currentOption = options?.find(c => c.value === value)
  if(currentOption) {
    if(selectedLabel) {
      buttonLabel = `${currentOption} ${currentOption}`
    }
  }

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      target={
        <Button
          iconAfter={<ChevronDown />}
          onClick={() => setIsOpen(!isOpen)}
          isSelected={isOpen}
        >
          {buttonLabel}
        </Button>
      }
    >
      <Select
        autoFocus
        backspaceRemovesValue={false}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen
        onChange={onSelectChange}
        options={options}
        placeholder="Search..."
        styles={selectStyles}
        tabSelectsValue={false}
        value={options?.find(c => c.value === value)}
      />
    </Dropdown>
  );
}
