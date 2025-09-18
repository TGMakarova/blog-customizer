import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useState, useRef, SyntheticEvent } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import clsx from 'clsx';

import { defaultArticleState } from 'src/constants/articleProps';
import { useCloseOnOutsideClickOrEsc } from 'src/ui/select/hooks/UseCloseOnOutsideClickOrEsc';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

	const sideBarRef = useRef<HTMLDivElement>(null);

	const [newFontFamilyOption, setNewFontFamilyOption] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);
	const [newFontColor, setNewFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [newBackgroundColor, setNewBackgroundColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	);
	const [newContentWidth, setNewContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	);
	const [newFontSizeoptions, setNewFontSizeoptions] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);

	useCloseOnOutsideClickOrEsc({
		isOpenSideBar,
		sideBarRef,
		onClose: () => setIsOpenSideBar(!isOpenSideBar),
	});

	const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState({
			...currentArticleState,
			fontFamilyOption: newFontFamilyOption,
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSizeoptions,
		});
	};

	const handleResetForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState({
			...defaultArticleState,
		});
	};

	return (
		<>
			<div ref={sideBarRef}>
				<ArrowButton
					isOpen={isOpenSideBar}
					onClick={() => {
						setIsOpenSideBar(!isOpenSideBar);
					}}
				/>

				<aside
					className={clsx(
						styles.container,
						isOpenSideBar && styles.container_open
					)}>
					<form
						onSubmit={handleSubmitForm}
						onReset={handleResetForm}
						className={styles.form}>
						<h2 className={styles.title}>Задайте параметры</h2>

						<Select
							selected={newFontFamilyOption}
							options={fontFamilyOptions}
							placeholder={newFontFamilyOption.value}
							onChange={setNewFontFamilyOption}
							title='Шрифт'
						/>

						<RadioGroup
							selected={newFontSizeoptions}
							options={fontSizeOptions}
							name=''
							onChange={setNewFontSizeoptions}
							title='Размер шрифта'
						/>

						<Select
							selected={newFontColor}
							options={fontColors}
							placeholder={newFontColor.value}
							onChange={setNewFontColor}
							title='Цвет шрифта'
						/>

						<Separator />

						<Select
							selected={newBackgroundColor}
							options={backgroundColors}
							placeholder={newBackgroundColor.value}
							onChange={setNewBackgroundColor}
							title='Цвет фона'
						/>

						<Select
							selected={newContentWidth}
							options={contentWidthArr}
							placeholder={newContentWidth.value}
							onChange={setNewContentWidth}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
