import { CSSProperties } from 'react';
import { useState } from 'react';
import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../constants/articleProps';
import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentArticleState={currentArticleState}
				setCurrentArticleState={setCurrentArticleState}
			/>

			<Article />
		</main>
	);
};
