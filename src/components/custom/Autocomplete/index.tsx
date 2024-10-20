import classNames from 'classnames';
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { TInputTypes } from '../../../type/input-type';
import Validation from '../../bootstrap/forms/Validation';
import { IList } from '../../../type/interfaces/IList';

interface IListOption {
	children: string;
	value?: string | number;
	disabled?: boolean;
	isSelected?: boolean;
	ariaLabelledby?: string | null;
	size?: string;
	onClick?(...args: unknown[]): unknown;
}
const ListOption = ({ children, value, onClick, isSelected, ariaLabelledby }: IListOption) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleOnClick = () => {
		if (onClick) {
			onClick(value);
		}
	};

	return (
		<li
			value={value}
			aria-labelledby={ariaLabelledby || children}
			onClick={handleOnClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={classNames('ps-3 cursor-default bg-lightGrayFacit', {
				'text-black': isSelected || isHovered,
				'bg-autocompleteOptionsHoverBg': isSelected || isHovered,
				'text-brand-two': !isSelected && !isHovered,
			})}
			style={{ padding: '5px 2px 5px 0px' }}>
			<span style={{ pointerEvents: 'none', fontSize: '1.2rem' }} className='fw-normal'>
				{children}
			</span>
		</li>
	);
};

export interface IInputProps extends HTMLAttributes<HTMLInputElement>, Partial<InputMask> {
	type?: TInputTypes | string;
	id?: string;
	name?: string;
	size?: 'lg' | 'sm' | null;
	className?: string;
	required?: boolean;
	placeholder?: string;
	title?: string;
	list?: IList[];
	autoComplete?: string;
	disabled?: boolean;
	multiple?: boolean;
	minCharacters?: number;
	noOptionsMessage?: string;
	ariaDescribedby?: string;
	ariaLabelledby?: string;
	ariaLabel?: string;
	value: string;
	isTouched?: boolean;
	isValid?: boolean;
	invalidFeedback?: string;
	validFeedback?: string;
	isValidMessage?: boolean;
	isTooltipFeedback?: boolean;
	onBlur?(...args: unknown[]): unknown;
	onChange?(...args: unknown[]): unknown;
	onFocus?(...args: unknown[]): unknown;
	onInput?(...args: unknown[]): unknown;
	onInvalid?(...args: unknown[]): unknown;
	onSelect?(...args: unknown[]): unknown;
}
const Autocomplete = forwardRef<HTMLInputElement, IInputProps>(
	(
		{
			type,
			id,
			name,
			className,
			required = false,
			placeholder,
			autoComplete,
			ariaDescribedby,
			ariaLabelledby,
			ariaLabel,
			list,
			title,
			size,
			disabled = false,
			multiple = false,
			minCharacters = 0,
			noOptionsMessage = '',
			value,
			isValid = false,
			isTouched = false,
			invalidFeedback,
			validFeedback,
			isValidMessage = true,
			isTooltipFeedback = false,
			onBlur,
			onChange,
			onFocus,
			onInput,
			onInvalid,
			onSelect,
		},
		ref,
	) => {
		/**
		 * Refs
		 */
		const inputRef = useRef<HTMLInputElement>(null);
		const optionsRef = useRef<HTMLUListElement>(null);

		/**
		 * States
		 */
		const [isOpen, setIsOpen] = useState<boolean>(false);
		const [isFocused, setIsFocused] = useState(false);
		const [previousValue, setPreviousValue] = useState<string>('');

		/**
		 * Functions
		 */
		const filteredData = list?.filter((item) => {
			return (
				typeof item.text === 'string' &&
				typeof value === 'string' &&
				item.text.toLowerCase().includes(value.toLowerCase())
			);
		});

		const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
			setIsOpen(value.length >= minCharacters);
			setIsFocused(true);
			if (onFocus) {
				onFocus(event);
			}
		};

		const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			if (onBlur) {
				onBlur(event);
			}
		};

		const handleInputChange = (newValue: string) => {
			if (onChange) {
				onChange(newValue);
			}
			if (newValue.length >= minCharacters) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		const handleSelectOption = (selectedValue: string) => {
			if (selectedValue && onChange) {
				onChange(selectedValue);
				setPreviousValue(selectedValue);
			}
			setIsOpen(false);
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				!inputRef.current?.contains(event.target as Node) &&
				!optionsRef.current?.contains(event.target as Node)
			) {
				setIsOpen(false);
				setPreviousValue('');
			}
		};

		/**
		 * UseEffects
		 */
		useEffect(() => {
			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [isOpen]);

		useEffect(() => {
			if (inputRef.current && optionsRef.current) {
				const inputRect = inputRef.current.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const availableHeightBelow = viewportHeight - inputRect.bottom;
				optionsRef.current.style.maxHeight = `${availableHeightBelow - 10}px`; // Ajuste de 10px para margem
			}
		}, [isOpen, value]);

		const LIST = list && isOpen && (
			<div className='w-100 position-relative'>
				<ul
					id={`${id}-list`}
					ref={optionsRef}
					className={`position-absolute d-${
						isOpen ? 'block' : 'none'
					} list-unstyled overflow-auto bg-lightGrayFacit w-100 z-3 rounded rounded-1 border border-1 
					border-autocompleteOptionsBorderColor pt-0 text-nowrap fw-normal align-items-center`}
					style={{ maxHeight: '25em', boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.3)', backgroundColor: "white"}}>
					{filteredData?.length ? (
						filteredData?.map((item) => (
							<ListOption
								key={item.value}
								value={item.text}
								onClick={handleSelectOption}
								isSelected={item.text === previousValue}>
								{(item.text as string) || (item.label as string)}
							</ListOption>
						))
					) : (
						<div
							className='p-2 rounded rounded-1 border'
							style={{ boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.3)' }}>
							<span
								style={{ pointerEvents: 'none', fontSize: '1.2rem', padding: '5px 2px 5px 0px' }}
								className='fw-normal text-brand-two'>
								{noOptionsMessage}
							</span>
						</div>
					)}
				</ul>
			</div>
		);

		const VALIDATION = isValidMessage && (
			<Validation
				isTouched={isTouched}
				invalidFeedback={invalidFeedback}
				validFeedback={validFeedback}
				isTooltip={isTooltipFeedback}
			/>
		);

		return (
			<>
				<input
					type='text'
					autoComplete='off'
					value={value}
					onChange={(e) => handleInputChange(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					ref={inputRef}
					id={id}
					name={name}
					className={classNames(
						`${type === 'input' ? 'form-control' : 'form-select'}`,
						{
							[`form-select-${size}`]: size,
							'is-invalid': !isValid && isTouched && invalidFeedback,
							'is-valid': !isValid && isTouched && !invalidFeedback,
							'input-disabled': disabled,
							'input-focused': isFocused,
						},
						{
							'form-range': type === 'range',
							'form-control-color': type === 'color',

							[`form-control-${size}`]: size,
							'is-invalid': !isValid && isTouched && invalidFeedback,
							'is-valid': !isValid && isTouched && !invalidFeedback,
							'input-disabled': disabled,
							'input-focused': isFocused,
						},
						'input-placeholder',
						'form-fields-border',
						className,
					)}
					required={required}
					placeholder={placeholder}
					title={title}
					list={`${id}-list`}
					disabled={disabled}
					multiple={multiple}
					aria-label={ariaLabel}
					aria-describedby={ariaDescribedby}
					aria-labelledby={ariaLabelledby}
					onInvalid={onInvalid}
				/>
				{LIST}
				{VALIDATION}
			</>
		);
	},
);

export default Autocomplete;
