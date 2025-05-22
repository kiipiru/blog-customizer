import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
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
	currentArticleState: ArticleState;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleState>>;
}

export const ArticleParamsForm = ({
	currentArticleState,
	setArticleState,
}: FormProps) => {
	const [isFormOpen, setOpen] = useState(false);
	const toggleOpen = () => {
		setOpen(!isFormOpen);
	};
	const refForClicks = useRef<HTMLDivElement | null>(null);
	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: refForClicks,
		onChange: setOpen,
	});
	const [fontFamilyOption, setFontFamily] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSize] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);
	const [fontColorOption, setFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [bgColorOption, setBgColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	);
	const [contentWidthOption, setContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
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
		setArticleState((prev) => ({
			...prev,
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
				isOpen={isFormOpen}
				onClick={() => {
					toggleOpen();
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
