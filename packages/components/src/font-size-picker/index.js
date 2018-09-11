/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BaseControl from '../base-control';
import Button from '../button';
import ButtonGroup from '../button-group';
import RangeControl from '../range-control';
import Tooltip from '../tooltip';

export default function FontSizePicker( { fontSizes = [], fallbackFontSize, value, onChange, withSlider } ) {
	const onChangeValue = ( event ) => {
		const newValue = event.target.value;
		if ( newValue === '' ) {
			onChange( undefined );
			return;
		}
		onChange( Number( newValue ) );
	};

	return (
		<BaseControl
			label={ __( 'Font Size' ) }
		>
			<div className="components-font-size-picker__buttons">
				<ButtonGroup aria-label={ __( 'Font Size' ) }>
					{ map( fontSizes, ( { name, size, shortName, slug } ) => (
						<Tooltip text={ name || shortName }>
							<Button
								key={ size }
								isLarge
								isPrimary={ value === size }
								aria-pressed={ value === size }
								onClick={ () => onChange( size ) }
								className={ 'is-font-' + slug }
							>
								<span>A</span>
							</Button>
						</Tooltip>
					) ) }
				</ButtonGroup>
				{ ! withSlider &&
					<input
						className="components-range-control__number"
						type="number"
						onChange={ onChangeValue }
						aria-label={ __( 'Custom Size' ) }
						value={ value || '' }
					/>
				}
				<Button
					className="components-color-palette__clear"
					type="button"
					disabled={ value === undefined }
					onClick={ () => onChange( undefined ) }
					isButton
					isSmall
					isDefault
				>
					{ __( 'Reset' ) }
				</Button>
			</div>
			{ withSlider &&
				<RangeControl
					className="components-font-size-picker__custom-input"
					label={ __( 'Custom Size' ) }
					value={ value || '' }
					initialPosition={ fallbackFontSize }
					onChange={ onChange }
					min={ 12 }
					max={ 100 }
					beforeIcon="editor-textcolor"
					afterIcon="editor-textcolor"
				/>
			}
		</BaseControl>
	);
}
