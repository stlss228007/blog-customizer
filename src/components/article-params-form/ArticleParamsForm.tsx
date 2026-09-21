import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

import type { FormEvent } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  });

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleFontFamilyChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
  };

  const handleFontSizeChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, fontSizeOption: option }));
  };

  const handleFontColorChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, fontColor: option }));
  };

  const handleBackgroundColorChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, backgroundColor: option }));
  };

  const handleContentWidthChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, contentWidth: option }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <div className={styles.fields}>
            <Select
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={handleFontFamilyChange}
              title="Шрифт"
            />
            <Separator />
            <RadioGroup
              name="fontSize"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={handleFontSizeChange}
              title="Размер шрифта"
            />
            <Separator />
            <Select
              selected={formState.fontColor}
              options={fontColors}
              onChange={handleFontColorChange}
              title="Цвет шрифта"
            />
            <Separator />
            <Select
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={handleBackgroundColorChange}
              title="Цвет фона"
            />
            <Separator />
            <RadioGroup
              name="contentWidth"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={handleContentWidthChange}
              title="Ширина контента"
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
