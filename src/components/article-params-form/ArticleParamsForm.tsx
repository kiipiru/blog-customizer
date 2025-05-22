import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { OptionType } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

interface FormProps {
	fontFamilyOptions: OptionType[];
	fontSizeOptions: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidthArr: OptionType[];
	defaultArticleState: ArticleState;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleState>>;
}

export const ArticleParamsForm = ({
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	setArticleState,
}: FormProps) => {
	const [isOpen, setOpen] = useState(false);
	const toggleOpen = () => {
		setOpen(!isOpen);
	};
	const refForClicks = useRef<HTMLDivElement | null>(null);
	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: refForClicks,
		onChange: setOpen,
	});
	const [fontFamilyOption, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColorOption, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [bgColorOption, setBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidthOption, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const resetForm = (defaultValues: ArticleState): void => {
		setFontFamily(defaultValues.fontFamilyOption);
		setFontSize(defaultValues.fontSizeOption);
		setFontColor(defaultValues.fontColor);
		setBgColor(defaultValues.backgroundColor);
		setContentWidth(defaultValues.contentWidth);
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState((prev) => ({...prev,
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColorOption,
			backgroundColor: bgColorOption,
			contentWidth: contentWidthOption,
			fontSizeOption: fontSizeOption,
		}));
	};
	const handleReset = () => {
		setArticleState({ ...defaultArticleState });
		resetForm(defaultArticleState);
	};
	return (
		<div ref={refForClicks}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					toggleOpen();
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						{' '}
						Задайте параметры{' '}
					</Text>
					<div className={styles.settingsSection}>
						<Select
							title='Шрифт'
							selected={fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(fontFamily) => {
								setFontFamily(fontFamily);
							}}></Select>
						<RadioGroup
							title='Размер шрифта'
							name='Размер шрифта'
							selected={fontSizeOption}
							options={fontSizeOptions}
							onChange={(fontSize) => {
								setFontSize(fontSize);
							}}></RadioGroup>
						<Select
							title='Цвет шрифта'
							selected={fontColorOption}
							options={fontColors}
							onChange={(fontColor) => {
								setFontColor(fontColor);
							}}></Select>
					</div>
					<Separator></Separator>
					<div className={styles.settingsSection}>
						<Select
							title='Цвет фона'
							selected={bgColorOption}
							options={backgroundColors}
							onChange={(bgColor) => {
								setBgColor(bgColor);
							}}></Select>
						<Select
							title='Ширина контента'
							selected={contentWidthOption}
							options={contentWidthArr}
							onChange={(contentWidth) => {
								setContentWidth(contentWidth);
							}}></Select>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								handleReset();
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
